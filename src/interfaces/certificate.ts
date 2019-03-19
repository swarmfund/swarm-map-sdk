export interface Certificate {
  uid?: string;
  issuer: string;
  expiration: number;
  subject: string;
  type: string;
}
