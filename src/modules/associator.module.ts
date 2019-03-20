import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { Associator, Certificate, WalletRequest } from '../interfaces';
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
   * @param associator {Associator}
   *
   * @return Promise<Associator>
   */
  create(associator: Associator): Promise<Associator> {
    const {name, publicKey} = associator;
    return this.client.post(PATHS.ASSOCIATORS, {name, publicKey});
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
   * @param publicKey {string} - associator public key
   * @param status {number} - request status
   *
   * @return Promise<WalletRequest[]>
   */
  getRequests(publicKey: string, status: number): Promise<WalletRequest[]> {
    return this.client.get(PATHS.ASSOCIATOR_REQUESTS(publicKey));
  }

  /**
   * @name getRequest
   * @description get request by id.
   * @param publicKey {string} - associator public key
   * @param id {string} - request id
   *
   * @return Promise<WalletRequest>
   */
  getRequest(publicKey: string, id: string): Promise<WalletRequest> {
    return this.client.get(PATHS.ASSOCIATOR_REQUEST(publicKey, id));
  }

  /**
   * @name updateRequest
   * @description update request
   * @param privateKey {string | Buffer} - associator private key
   * @param publicKey {string} - associator public key
   * @param id {string} - request id
   * @param certificates {Certificate[]} - array of certificates
   *
   * @return Promise<WalletRequest>
   */
  updateRequest(privateKey: string | Buffer, publicKey: string, id: string, certificates: Certificate[]): Promise<any> {
    const token = util.getJwtToken(privateKey);
    return this.client.put(PATHS.ASSOCIATOR_REQUEST(publicKey, id), {certificates}, {...util.getAuthHeaders(token)});
  }
}
