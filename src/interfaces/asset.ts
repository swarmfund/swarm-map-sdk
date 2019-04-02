import { Kya } from './kya';

export interface Asset {
  uid?: string;
  issuer: string;
  name: string;
  address: string;
  network: string;
  created: number;
  description: string;
  symbol: string;
  decimals: number;
  supply: number;
  kya: Kya;
}
