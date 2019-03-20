import { Provider } from '../utils/provider';
import { Client } from '../utils/client';
import { WalletRequest } from '../interfaces';
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
   * @param associator {string} - associator public key
   * @param request {string} - encrypted data with associator public key
   *
   * @return Promise<WalletRequest>
   */
  createRequest(privateKey: string | Buffer, associator: string, request: string): Promise<WalletRequest> {
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.ASSOCIATOR_REQUESTS(associator), {request} as WalletRequest, {
      ...util.getAuthHeaders(token)
    });
  }

}
