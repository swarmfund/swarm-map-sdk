declare module 'eccrypto' {
  /**
   * Input/output structure for ECIES operations.
   * @typedef {Object} Ecies
   * @property {Buffer} iv - Initialization vector (16 bytes)
   * @property {Buffer} ephemPublicKey - Ephemeral public key (65 bytes)
   * @property {Buffer} ciphertext - The result of encryption (variable size)
   * @property {Buffer} mac - Message authentication code (32 bytes)
   */
  export interface Ecies {
    iv: Buffer;
    ephemPublicKey: Buffer;
    ciphertext: Buffer;
    mac: Buffer;
  }

  export interface Options {
    iv?: Buffer;
    ephemPrivateKey?: Buffer;
  }

  /**
   * Encrypt message for given recepient's public key.
   * @param {Buffer} publicKeyTo - Recipient's public key (65 bytes)
   * @param {Buffer} msg - The message being encrypted
   * @param {?{?iv: Buffer, ?ephemPrivateKey: Buffer}} opts - You may also
   * specify initialization vector (16 bytes) and ephemeral private key
   * (32 bytes) to get deterministic results.
   * @return {Promise.<Ecies>} - A promise that resolves with the ECIES
   * structure on successful encryption and rejects on failure.
   */
  export function encrypt(publicKeyTo: Buffer, msg: Buffer, opts?: Options): Promise<Ecies>;
  export function decrypt(privateKey: Buffer, encrypted: Ecies): Promise<Buffer>;
}
