import { Options } from '../utils/provider';
import moment from 'moment';
import { ec as EC } from 'elliptic';
import eccrypto, { Ecies } from 'eccrypto';
import crypto from 'crypto';

import CONF from '../utils/conf';
import { Headers } from '../utils/client';
import { Request } from '../interfaces';
import Signature = EC.Signature;
import RIPEMD160 from 'ripemd160';
import bech32 from 'bech32';

// @ts-ignore
const jsontokens = require('jsontokens');

export class UtilModule {
  options: Options = CONF;

  /**
   * @name getAuthHeaders
   * @param privateKey {string | Buffer}
   * @param address {string} - MAP api unique address
   *
   * @return string - token is separated by `.` second part of string
   * represent payload as message and third one is signature
   *
   * structure: [header {alg: string (default: ES256K), typ: string (default: JWT)}].[payload].[signature]
   * example: eyJ0eXAiOiJOiJFUzI1NksifQ.eyJpc3MiOiIwNNTExMTQ4fQ.3xuaiZoRpuIjKOqLhsSnoc1w
   */
  getJwtToken(privateKey: string | Buffer, address?: string): string {
    const {authExpirationTime, authExpirationTimeUnit} = this.options;
    const ec = new EC('secp256k1');

    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    const publicKey: string = keyPair.getPublic('hex');

    const payload: {iss?: string, publicKey?: string, exp?: number} = {};
    if (address) {
      payload.iss = address;
    } else {
      payload.publicKey = publicKey;
    }

    payload.exp = moment().add(authExpirationTime, authExpirationTimeUnit).unix();

    return new jsontokens.TokenSigner('ES256K', privateKey).sign(payload);
  }

  /**
   * @name recoverPublicKey
   * @param privateKey {string}
   *
   * @return publicKey {string}
   */
  recoverPublicKey(privateKey: string) {
    const ec = new EC('secp256k1');
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    return keyPair.getPublic('hex');
  }

  /**
   * @name getAddress
   * @param publicKey {Buffer}
   *
   * @return {Buffer}
   */
  getAddress(publicKey: Buffer): Buffer {
    const ec = new EC('secp256k1');
    let buffer;

    if (publicKey.length == 33) {
      buffer = publicKey;
    } else if (publicKey.length == 65) {
      const hexPublicKey = ec.keyFromPublic(publicKey as Buffer).getPublic(true, 'hex');
      buffer = Buffer.from(hexPublicKey as string, 'hex');
    } else {
      throw new Error('Wrong public key size');
    }

    const s = crypto.createHash('sha256').update(buffer).digest();
    return new RIPEMD160().update(s).digest();
  }

  /**
   * @name encodeMapId
   * @param privateKey {string}
   * @param hrp {string} - default is 'map'
   *
   * @return MapId {string}
   */
  encodeMapId(privateKey: string, hrp: string = 'map'): string {
    const publicKey = this.recoverPublicKey(privateKey);
    const address = this.getAddress(Buffer.from(publicKey, 'hex'));

    return bech32.encode(hrp, bech32.toWords(address));
  }

  /**
   * @name generateKeyPair
   *
   * @return Object {privateKey: string, publicKey: string}
   */
  generateKeyPair(): { privateKey: string, publicKey: string } {
    const ec = new EC('secp256k1');
    const keys = ec.genKeyPair();

    const publicKey = keys.getPublic('hex');
    const privateKey = keys.getPrivate('hex') as string;

    return {publicKey, privateKey};
  }

  /**
   * @name getAuthHeaders
   * @param token {string} - jwt like string
   *
   * @return Headers
   */
  getAuthHeaders(token: string): Headers {
    return {
      'x-map-signature': token,
      'x-map-key-type': 'secp256k1'
    };
  }

  /**
   * @name hash
   * @param data {T} - data to hash
   * @param alg {string} - hashing algorithm
   *
   * @return Buffer
   */
  hash<T>(data: T, alg: string = 'sha256'): Buffer {
    const hash = crypto.createHash(alg);
    hash.update(JSON.stringify(data));
    return hash.digest();
  }

  /**
   * @typedef Signature {Object}
   * @property r {BN}
   * @property s {BN}
   * @property recoveryParam {number}
   */

  /**
   * @name sign
   * @param privateKey {string}
   * @param msgHash {Buffer}
   * @param curve {string} - by default we support secp256k1
   *
   * @return Signature
   */
  sign(privateKey: string, msgHash: Buffer, curve: string = 'secp256k1'): Signature {
    const ec = new EC(curve);
    const key = ec.keyFromPrivate(privateKey);

    return key.sign(msgHash);
  }

  /**
   * @name encryptWalletRequest
   * @description Encrypt message for given recepient's public key.
   *
   * @param publicKey {string} - Recipient's public key (65 bytes)
   * @param request {string} - The message being encrypted
   * @param options - You may also specify initialization vector (16 bytes)
   * and ephemeral private key (32 bytes) to get deterministic results.
   *
   * @return {Promise.<Ecies>} - A promise that resolves with the ECIES
   * structure on successful encryption and rejects on failure.
   */
  async encryptWalletRequest(publicKey: string, request: Request, options?: Options): Promise<string> {
    const message = JSON.stringify(request);
    const encrypt = await eccrypto.encrypt(Buffer.from(publicKey, 'hex'), Buffer.from(message));

    return Buffer.from(JSON.stringify(encrypt)).toString('base64');
  }

  /**
   * @name decryptWalletRequest
   * @description Decrypt message using given private key.
   *
   * @param privateKey {string} - A 32-byte private key of recepient of the mesage
   * @param {string} base64enc - ECIES structure (result of ECIES encryption) base64 encoded
   *
   * @return {Promise.<Buffer>} - A promise that resolves with the plaintext on successful decryption and rejects on failure.
   */
  async decryptWalletRequest(privateKey: string, base64enc: string): Promise<any> {
    const decodeBase64 = Buffer.from(base64enc, 'base64').toString('ascii');
    const parse: any = JSON.parse(decodeBase64);

    const encrypted: Ecies = {
      iv: Buffer.from(parse.iv.data),
      ephemPublicKey: Buffer.from(parse.ephemPublicKey.data),
      ciphertext: Buffer.from(parse.ciphertext.data),
      mac: Buffer.from(parse.mac.data)
    };

    const decrypt: Buffer = await eccrypto.decrypt(Buffer.from(privateKey, 'hex'), encrypted);
    return JSON.parse(Buffer.from(decrypt).toString('ascii'));
  }
}

const util = new UtilModule();
export { util };
