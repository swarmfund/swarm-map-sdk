import { CertificateIssuer } from '../interfaces';
import { PATHS } from '../utils/const';
import { Client } from '../utils/client';
import { Provider } from '../utils/provider';

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
   * @return Promise<CertificateIssuer>
   */
  create(issuer: CertificateIssuer): Promise<CertificateIssuer> {
    return this.client.post(PATHS.CERTIFICATE_ISSUER, issuer);
  }

  /**
   * @name get
   * @description Retrieve certificate issuer object.
   * @param publicKey {string} - The public key of Certificate Issuer
   * @return Promise<CertificateIssuer>
   */
  get(publicKey: string): Promise<CertificateIssuer> {
    return this.client.get(PATHS.CERTIFICATE_ISSUER + `/${publicKey}`);
  }
}
