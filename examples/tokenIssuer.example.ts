import { swarm } from './common';

async function tokenIssuerExample() {
  // Generate key pair
  const {privateKey, publicKey} = swarm.util.generateKeyPair();

  // Create token issuer
  const create = await swarm.tokenIssuer.create(privateKey, {name: 'Token Issuer', publicKey});
  console.log('create token issuer \n', create);

  // Get token issuer
  const getTokenIssuer = await swarm.tokenIssuer.get(create.id as string);
  console.log('\n get token issuer \n', getTokenIssuer);

  // Register asset
  const registerAsset = await swarm.asset.create(privateKey, {
    address: '0x99be8bb152F430dC91daCcba3747281F0BeDBda2',
    decimals: 18,
    description: 'Some description of Token',
    issuer: getTokenIssuer.id as string,
    kya: {
      hash: 'QmWSCLbAeYr1MPNgXL6YfgiR4fsCKWZJzvuWQnjCQN1XPe',
      url: 'http://swarm.found'
    },
    name: 'Token 1',
    supply: 50000000,
    symbol: 'T1',
    created: 123456789,
    network: 'Ethereum'
  });
  console.log('\n register asset \n', registerAsset);

  // Get Asset
  const getAsset = await swarm.asset.get(getTokenIssuer.id as string, registerAsset.uid as string);
  console.log('\n get asset \n', getAsset);

  // Update Asset Kya
  const updateKya = await swarm.asset.updateKya(privateKey, registerAsset.uid as string, {
    hash: 'QmWSCLbAeYr1MPNgXL6YfgiR4fsCKWZJzvuWQnjCQNae812',
    url: 'http://google.com'
  });
  console.log('\n update asset KYA\n', updateKya);

  // Register asset associator
  const registerAssociator = await swarm.tokenIssuer.registerAssociator(privateKey, getAsset.uid as string, 'map1exttpnh0amm89e3qtzrx08f5dkp06t6cwvmdys');
  console.log('\n register asset associator\n', registerAssociator);

  // Unregister asset associator
  const unregisterAssetAssociator = await swarm.tokenIssuer.unregisterAssociator(privateKey, getAsset.uid as string, 'map1exttpnh0amm89e3qtzrx08f5dkp06t6cwvmdys');
  console.log('\n unregister asset associator\n', unregisterAssetAssociator);
}

tokenIssuerExample().catch(console.error);
