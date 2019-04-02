import { Provider } from '../utils/provider';
import { Client } from '../utils/client';
import { WalletConnectionRequest } from '../interfaces';
import { PATHS } from '../utils/const';
import { util } from './util.module';

export class InvestorModule {
  private client: Client;

  constructor(provider: Provider) {
    this.client = new Client(provider);
  }

  /**
   * @name createRequest
   * @description create new wallet connection request. This call will create request
   * for reissuing certificates to investor wallet.
   *
   * @param privateKey {string | Buffer} - investor private key
   * @param associatorId {string} - associator MAP id
   * @param request {string} - encrypted data with associator public key
   *
   * @return Promise<WalletConnectionRequest>
   */
  createRequest(privateKey: string, associatorId: string, request: string): Promise<WalletConnectionRequest> {
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.ASSOCIATOR_REQUESTS(associatorId), {request} as WalletConnectionRequest, {
      ...util.getAuthHeaders(token)
    });
  }

}
