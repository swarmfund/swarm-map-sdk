import { swarm } from './common';

async function certificateIssuerExample() {
  // Generate key pair
  const {privateKey, publicKey} = swarm.util.generateKeyPair();

  console.log('private: ', privateKey);
  console.log('public: ', publicKey);

  // Create certificate issuer
  const create = await swarm.certificateIssuer.create({name: 'Certificate Issuer', publicKey}, privateKey);

  console.log('create certificate issuer \n', create);
  console.log('\n');

  // Get created certificate issuer
  const issuer = await swarm.certificateIssuer.get(create.id as string);

  console.log('get certificate issuer \n', issuer);
  console.log('\n');

  // Create certificate type
  const createCertificateType = await swarm.certificateType.create(privateKey, {description: 'KYC 1'});

  console.log('create certificate type \n', createCertificateType);
  console.log('\n');

  // Get certificate type
  const getCertificateType = await swarm.certificateType.get(createCertificateType.uid as string);

  console.log('get certificate type \n', getCertificateType);
  console.log('\n');

  // Get certificate type list
  const getCertificateTypes = await swarm.certificateType.list(issuer.id as string);

  console.log('certificate type list \n', getCertificateTypes);
  console.log('\n');

  // // Remove certificate type list
  // const removeCertificateTypes = await swarm.certificateType.remove(privateKey, getCertificateType.uid as string);
  // console.log('remove certificate type \n', getCertificateType.uid, removeCertificateTypes);
  // console.log('\n');

}

certificateIssuerExample().catch(console.error);
