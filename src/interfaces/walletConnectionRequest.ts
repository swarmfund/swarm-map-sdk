export interface WalletConnectionRequest {
  uid: string;
  associator: string;
  request: string;
  status: number;
}

export interface Wallet {
  network: string;
  address: string;
}

export interface WalletRequestSignatures {
  investor: any;
  wallet: any;
}

export interface WalletRequestData {
  investor: string;
  wallet: Wallet;
  certificates: string[];
}

export interface Request {
  data: WalletRequestData;
  signatures: WalletRequestSignatures;
}
