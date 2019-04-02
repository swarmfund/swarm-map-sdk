import { CertificateIssuer } from '../interfaces';
import { PATHS } from '../utils/const';
import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { util } from './util.module';

/**
 * @name CertificateIssuerModule
 *
 * @param provider {Provider}
 *
 * @description Certificate issuer Certificate issuers are entities that issue various types of trusted certificates.
 * A certificate is proof that a certificate issuer has verified the authenticity of a claim.
 * Certificate issuers must register themselves on MAP, update a list of supported claims and the required data
 * a subject must provide in order to obtain a certificate.
 * A typical certificate would be a KYC certificate issued to a prospective investor verifying their claim
 * that they are who they say they are. Claims, as certificate types, are identified by a unique id.
 */
export class CertificateIssuerModule {
  private client: Client;

  constructor(provider: Provider) {
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description Registers a new certificate issuer.
   * @param issuer {CertificateIssuer}
   * @param privateKey {string}
   * @return Promise<CertificateIssuer>
   */
  create(issuer: CertificateIssuer, privateKey: string): Promise<CertificateIssuer> {
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.CERTIFICATE_ISSUER, issuer, {...util.getAuthHeaders(token)});
  }

  /**
   * @name get
   * @description Retrieve certificate issuer object.
   * @param id {string} - The MAP api address of Certificate Issuer
   * @return Promise<CertificateIssuer>
   */
  get(id: string): Promise<CertificateIssuer> {
    return this.client.get(PATHS.CERTIFICATE_ISSUER + `/${id}`);
  }
}
