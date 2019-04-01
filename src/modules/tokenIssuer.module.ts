import { PATHS } from '../utils/const';
import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { AssociatorConnection, TokenIssuer } from '../interfaces';
import { util } from './util.module';

/**
 * @name TokenIssuerModule
 *
 * @param provider {Provider}
 *
 * @description Token issuers are entities who control token operations.
 * In the context of MAP, they are primarily responsible for token registration and registering associators for tokens.
 * Token issuers need to register themselves on MAP so that other parties may verify their actions.
 */
export class TokenIssuerModule {
  private client: Client;

  constructor(provider: Provider) {
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description Registers the token issuer.
   * @param privateKey {string}
   * @param tokenIssuer {TokenIssuer}
   *
   * @return Promise<TokenIssuer>
   */
  create(privateKey: string, tokenIssuer: TokenIssuer): Promise<TokenIssuer> {
    const {name, publicKey} = tokenIssuer;
    const token = util.getJwtToken(privateKey);

    return this.client.post(PATHS.TOKEN_ISSUERS, {name, publicKey}, {...util.getAuthHeaders(token)});
  }

  /**
   * @name get
   * @description Get information about a token issuer.
   * @param id {String}
   *
   * @return Promise<TokenIssuer>
   */
  get(id: string): Promise<TokenIssuer> {
    return this.client.get(PATHS.TOKEN_ISSUER(id));
  }

  /**
   * @name registerAssociator
   * @description Register associator that can issue certificate for asset wallets.
   * @param privateKey {string | Buffer} - token issuer private key
   * @param assetUid {string} - asset unique id on MAP blockchain.
   * @param associatorId {string} - associator MAP id
   *
   * @return Promise<void>
   */
  registerAssociator(privateKey: string, assetUid: string, associatorId: string): Promise<AssociatorConnection> {
    const id = util.encodeMapId(privateKey);
    const token = util.getJwtToken(privateKey, id);
    const connection = {} as AssociatorConnection;

    return this.client.post(PATHS.ASSET_ASSOCIATOR(id, assetUid, associatorId), connection, {
      ...util.getAuthHeaders(token)
    });
  }

  /**
   * @name unregisterAssociator
   * @description Unregistering associator for asset.
   * @param privateKey {string} - token issuer private key
   * @param assetUid {string} - asset unique id on MAP blockchain.
   * @param associatorId {string} - associator MAP id
   *
   * @return Promise<void>
   */
  unregisterAssociator(privateKey: string, assetUid: string, associatorId: string): Promise<void> {
    const id = util.encodeMapId(privateKey);
    const token = util.getJwtToken(privateKey, id);

    return this.client.delete(PATHS.ASSET_ASSOCIATOR(id, assetUid, associatorId), {
      ...util.getAuthHeaders(token)
    });
  }
}
