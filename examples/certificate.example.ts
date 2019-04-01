import { swarm } from './common';

async function certificateExample() {
  // Generate key pair
  const certificateIssuerKeyPair = {
    privateKey:  'bb0c58fb75bc0a90f5fda009f6a504cef264fde21bdf036d35c6fb504e0f54c1',
    publicKey:  '0455ac7e89b3cd8e442400865f2b5c577591bd80e1337218ecda7ce0f69476a4ccc6fdf00c97a3c468ec94e1a72d526481f71a59aa2d238b161be3003fab721d35'
  };

  const investor = swarm.util.generateKeyPair();

  // Create Certificate
  const createCertificate = await swarm.certificate.create(certificateIssuerKeyPair.privateKey, {
    expiration: new Date().getTime() + 1000000000000,
    issuer: swarm.util.encodeMapId(certificateIssuerKeyPair.privateKey),
    subject: swarm.util.encodeMapId(investor.privateKey),
    type: 'c09c8d9b-07c9-4f4c-b61e-e6ce4bc198df'
  });
  console.log('create certificate \n', createCertificate);

  // Get Certificate by unique id
  const getCertificate = await swarm.certificate.get(createCertificate.uid as string);
  console.log('\n get certificate \n', getCertificate);

  // Find Certificates by constraints
  const find = await swarm.certificate.find({
    issuer: 'map1sctumvc2fg6fvac5tzlypw5dsk8dwyj3q6p3kk', // // optional
    uid: 'b4c2b805-34e5-4d2b-b76c-7525073e4ffd', // optional
    subject: 'map1xf5f37hpwd27y20cpjhpm9vlz4wymmfngyw9m5', // optional
    type: 'c09c8d9b-07c9-4f4c-b61e-e6ce4bc198df' // optional
  });
  console.log('\n find results \n', find);
}

certificateExample().catch(console.error);
