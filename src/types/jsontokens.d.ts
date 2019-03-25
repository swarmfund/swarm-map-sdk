declare module 'jsontokens' {
  export class TokenSigner {
    constructor(alg: string, privateKey: string | Buffer);
    sign<T>(payload: T): string;
  }
}
