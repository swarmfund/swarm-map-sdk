import { Provider } from '../src/utils/provider';
import { SwarmMapSDK } from '../src/core';
import { Request } from '../src/interfaces';

const provider = new Provider('sandbox', '<x-map-api-key>');
const swarm = new SwarmMapSDK(provider);

// INVESTOR KEY PAIR
const investorPrivateKey = '1de8bed61b877a551f4191d9afb2d25ad0ffdfefd65c42cd106ae3f27071ebe8';
const investorPublicKey = '04e0949df94cc012be1cdefbe630b200f99ad735040081080d5b91ce6500ac27342854398355cbdba9c4ef7e35b81ab0e69a20cf0817e8fad147b43731970b3d34';

// WALLET KEY PAIR
const walletPrivateKey = '68dd13344cce7753af515114b5c9c6fde2b1eda6995cc2bcd80384c4d29d76cd';
const walletAddress = '0x09D7d247eb203f73c7E6974F9115a8F4bb595E18';

const request: Request = {
  data: {
    certificates: ['8c689164-5765-4af7-9b50-9fa9140c6f70', 'b75c0fdd-5eaa-4015-8b10-4b85da99dc57'],
    investor: investorPublicKey,
    wallet: {
      address: walletAddress,
      network: 'Ethereum'
    }
  },
  signatures: {
    investor: '',
    wallet: ''
  }
};

const msgHash = swarm.util.hash(request.data);
request.signatures.investor = swarm.util.sign(investorPrivateKey, msgHash);
request.signatures.wallet = swarm.util.sign(walletPrivateKey, msgHash);

// Associator KEY PAIR
const accociatorPublicKey = '048fa4c4903f43ed47104bc00d0e766f32b98eca50ee4ce6f6b129f59b04ead638be025be37f1de740f5939f0ed2615e4caaa2bec9599482965ad90c7bf2628f60';
const associatorPrivateKey = '20baa5798390d61d45c48308406a34333e67ef1a7b9beaee258f4eaed630c642';

swarm.util.encryptWalletRequest(accociatorPublicKey, request).then(async (enc) => {
  console.log(enc);

  const data = await swarm.util.decryptWalletRequest(associatorPrivateKey as string, enc);
  console.log(data);
}).catch(error => {
  console.log(error);
});
