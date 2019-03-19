import { PATHS } from '../utils/const';
import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { CertificateType } from '../interfaces';
import { util } from './util.module';

/**
 * @name CertificateTypeModule
 *
 * @param provider {Provider}
 *
 * @description Type of certificate
 */
export class CertificateTypeModule {
  private client: Client;

  constructor(provider: Provider) {
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description Register certificates type available from a certificate issuer on MAP.
   * @param privateKey {string | Buffer} - certificate issuer private key
   * @param type {CertificateType}
   *
   * @return Promise<CertificateType>
   */
  create(privateKey: string | Buffer, type: CertificateType): Promise<CertificateType> {
    const {issuer, description} = type;
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.CERTIFICATE_TYPES(issuer), {issuer, description, publicKey: issuer}, {
      ...util.getAuthHeaders(token)
    });
  }

  /**
   * @name get
   * @description Get details for specific certificate type.
   * @param id {string} - certificate type unique id
   *
   * @return Promise<CertificateType>
   */
  get(id: string): Promise<CertificateType> {
    return this.client.get(PATHS.CERTIFICATE_TYPE(id));
  }

  /**
   * @name list
   * @description List certificate available from a certificate issuer.
   * @param issuer {string} - certificate issuer public key
   *
   * @return Promise<CertificateType[]>
   */
  list(issuer: string): Promise<CertificateType[]> {
    return this.client.get(PATHS.CERTIFICATE_TYPES(issuer));
  }

  /**
   * @name remove
   * @description Deregister a certificate. Future certificate registrations of this type are not possible,
   * but issued certificates of this type remain valid until specific expiration.
   *
   * @param privateKey {string | Buffer} - certificate issuer private key
   * @param publicKey {string} - certificate issuer public key
   * @param id {string} - certificate type unique id
   *
   * @return Promise<void>
   */
  remove(privateKey: string | Buffer, publicKey: string, id: string): Promise<void> {
    const token = util.getJwtToken(privateKey);
    return this.client.delete(PATHS.DELETE_CERTIFICATE_TYPE(publicKey, id), {...util.getAuthHeaders(token)});
  }
}
