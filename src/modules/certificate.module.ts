import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { Certificate } from '../interfaces';
import { PATHS } from '../utils/const';
import { util } from './util.module';

/**
 * @name CertificateModule
 *
 * @param provider {Provider}
 *
 * @description A certificate is a document that contains proof that a certain claim has been verified.
 * It can be thought of as a verified claim.
 * Certificates are associated with investors’ wallets after processing or verifying the data stated in a claim.
 * Certificates on MAP do not contain any personal information.
 */
export class CertificateModule {
  private client: Client;

  constructor(provider: Provider) {
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description Register certificates available from a certificate issuer on MAP.
   * @param privateKey {string | Buffer} - certificate issuer private key
   * @param certificate {Certificate} - certificate Object
   *
   * @return Promise<Certificate>
   */
  create(privateKey: string | Buffer, certificate: Certificate): Promise<Certificate> {
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.CERTIFICATES(certificate.issuer), certificate, {...util.getAuthHeaders(token)});
  }

  /**
   * @name create
   * @description Get details about a specific certificate.
   * @param id {string} - certificate unique id
   *
   * @return Promise<Certificate>
   */
  get(id: string): Promise<Certificate> {
    return this.client.get(PATHS.CERTIFICATE(id));
  }

}

