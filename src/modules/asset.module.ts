import { PATHS } from '../utils/const';
import { Client } from '../utils/client';
import { Provider } from '../utils/provider';
import { Asset, Kya } from '../interfaces';
import { util } from './util.module';

/**
 * @name AssetModule
 *
 * @param provider {Provider}
 *
 * @description Token issuer can crate assets on MAP blockchain , update KYA (Know Your Asset) document.
 */
export class AssetModule {
  private client: Client;
  private provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
    this.client = new Client(provider);
  }

  /**
   * @name create
   * @description Adds a new asset to the MAP blockchain.
   * @param privateKey {string} - token issuer private key
   * @param asset {Asset} - description of new token on MAP blockchain
   *
   * @return Promise<Asset>
   */
  create(privateKey: string, asset: Asset): Promise<Asset> {
    const token = util.getJwtToken(privateKey);
    return this.client.post(PATHS.ASSETS(asset.issuer), asset, {...util.getAuthHeaders(token)});
  }

  /**
   * @name get
   * @description Get asset by id.
   * @param issuer {string} - token issuer public key
   * @param id {string} - asset unique id on MAP blockchain
   *
   * @return Promise<Asset>
   */
  get(issuer: string, id: string): Promise<Asset> {
    return this.client.get(PATHS.ASSET(issuer, id));
  }

  /**
   * @name updateKya
   * @description Update KYA document.
   * @param privateKey {string} - token issuer private key
   * @param issuer {string} - token issuer public key
   * @param id {string} - asset unique id on MAP blockchain
   * @param kya {Kya} - document should provide url and hash (IPFS) of document
   *
   * @return Promise<Kya>
   */
  updateKya(privateKey: string, issuer: string, id: string, kya: Kya): Promise<Kya> {
    const token = util.getJwtToken(privateKey);
    return this.client.put(PATHS.KYA(issuer, id), kya, {...util.getAuthHeaders(token)});
  }
}
