import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { Associator, Certificate, WalletConnectionRequest } from '../interfaces';
import { PATHS } from '../utils/const';
import { util } from './util.module';

/**
 * @name AssociatorModule
 *
 * @param provider {Provider}
 *
 * @description Associators enable investors to inherit qualifications from their
 * master wallet to any other associated wallets. Associators reissue previously obtained
 * certificates to other wallets that are cryptographically proven to belong to a single identity.
 * Other than maintaining investor privacy, this process allows for the reusability of qualifications.
 */
export class AssociatorModule {
  private client: Client;
  private provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description register new associator for asset.
   * @param privateKey {string} - associator private key
   * @param associator {Associator}
   *
   * @return Promise<Associator>
   */
  create(privateKey: string, associator: Associator): Promise<Associator> {
    const {name, publicKey} = associator;
    const token = util.getJwtToken(privateKey);

    return this.client.post(PATHS.ASSOCIATORS, {name, publicKey}, {...util.getAuthHeaders(token)});
  }

  /**
   * @name get
   * @description get associator data.
   * @param publicKey {string} - associator public key
   *
   * @return Promise<Associator>
   */
  get(publicKey: string): Promise<Associator> {
    return this.client.get(PATHS.ASSOCIATOR(publicKey));
  }

  /**
   * @name getRequests
   * @description get all associator requests.
   * @param id {string} - associator public key
   * @param status {string} - request status
   *
   * @return Promise<WalletConnectionRequest[]>
   */
  getRequests(id: string, status: string): Promise<WalletConnectionRequest[]> {
    return this.client.get(PATHS.ASSOCIATOR_REQUESTS(id), undefined, {status});
  }

  /**
   * @name getRequest
   * @description get request by id.
   * @param id {string} - associator MAP id
   * @param requestUid {string} - request unique id
   *
   * @return Promise<WalletConnectionRequest>
   */
  getRequest(id: string, requestUid: string): Promise<WalletConnectionRequest> {
    return this.client.get(PATHS.ASSOCIATOR_REQUEST(id, requestUid));
  }

  /**
   * @name updateRequest
   * @description update request
   *
   * @param privateKey {string} - associator MAP id
   * @param requestUid {string} - request unique id
   * @param status {string}
   *
   * @return Promise<WalletConnectionRequest>
   */
  updateRequest(privateKey: string, requestUid: string, status: string): Promise<any> {
    const id = util.encodeMapId(privateKey);
    const token = util.getJwtToken(privateKey, id);

    return this.client.put(PATHS.ASSOCIATOR_REQUEST(id, requestUid), {status}, {...util.getAuthHeaders(token)});
  }

  /**
   * @name issueCertificates
   * @description reissue certificates
   *
   * @param privateKey {string} - associator private key
   * @param certificates {Certificate[]} - array of certificates
   *
   * @return Promise<Certificates[]>
   */
  issueCertificates(privateKey: string, certificates: Certificate[]): Promise<any> {
    const id = util.encodeMapId(privateKey);
    const token = util.getJwtToken(privateKey, id);

    return this.client.post(PATHS.ASSOCIATOR_CERTIFICATES(id), {certificates}, {...util.getAuthHeaders(token)});
  }
}
