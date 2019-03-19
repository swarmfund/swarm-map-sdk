import { Options } from '../utils/provider';
import moment from 'moment';
import { ec as EC } from 'elliptic';
import CONF from '../utils/conf';

// jsontokens lib doesn't have @types definition
// @ts-ignore
const jsontokens = require('jsontokens');

export class UtilModule {
  options: Options = CONF;

  getJwtToken(privateKey: string | Buffer): string {
    const {authExpirationTime, authExpirationTimeUnit} = this.options;
    const ec = new EC('secp256k1');

    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    const publicKey: string = keyPair.getPublic('hex');

    const payload = {
      iss: publicKey,
      exp: moment().add(authExpirationTime, authExpirationTimeUnit).unix()
    };

    return new jsontokens.TokenSigner('ES256K', privateKey).sign(payload);
  }

  getAuthHeaders(token: string) {
    return {
      'x-map-signature': token,
      'x-map-key-type': 'secp256k1'
    };
  }
}

const util = new UtilModule();
export { util };
