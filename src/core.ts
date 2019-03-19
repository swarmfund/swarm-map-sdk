import { Provider } from './utils/provider';
import {
  AssetModule,
  AssociatorModule,
  CertificateIssuerModule,
  CertificateModule,
  CertificateTypeModule,
  InvestorModule,
  TokenIssuerModule,
  util,
  UtilModule
} from './modules';

export class SwarmMapSDK {
  certificateIssuer: CertificateIssuerModule;
  certificateType: CertificateTypeModule;
  certificate: CertificateModule;
  tokenIssuer: TokenIssuerModule;
  asset: AssetModule;
  associator: AssociatorModule;
  investor: InvestorModule;
  util: UtilModule;

  constructor(provider: Provider) {
    this.certificateIssuer = new CertificateIssuerModule(provider);
    this.certificateType = new CertificateTypeModule(provider);
    this.certificate = new CertificateModule(provider);
    this.tokenIssuer = new TokenIssuerModule(provider);
    this.asset = new AssetModule(provider);
    this.associator = new AssociatorModule(provider);
    this.investor = new InvestorModule(provider);
    this.util = util;
  }
}
