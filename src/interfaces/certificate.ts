export interface Certificate {
  uid?: string;
  issuer: string;
  expiration: number;
  subject: string;
  type: string;
}

export interface FindCertificate {
  uid?: string;
  issuer?: string;
  subject?: string;
  type?: string;
}
