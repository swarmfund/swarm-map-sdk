import { Kya } from './kya';

export interface Asset {
  issuer: string;
  name: string;
  address: string;
  description: string;
  symbol: string;
  decimals: number;
  supply: number;
  kya: Kya;
}
