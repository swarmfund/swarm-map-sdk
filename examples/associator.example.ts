import { swarm } from './common';
import { STATUS } from '../src/interfaces';

async function associatorExample() {
  // Generate key pair
  const {privateKey, publicKey} = swarm.util.generateKeyPair();

  console.log('privateKey: ', privateKey);
  console.log('publicKey: ', publicKey);

  // Create Associator
  const create = await swarm.associator.create(privateKey, {
    name: 'Associator 1',
    publicKey
  });
  console.log('create associator \n', create);

  // Get Associator
  const getAssociator = await swarm.associator.get(create.id as string);
  console.log('\n get associator \n', getAssociator);

  // Get Associator Requests
  const getRequests = await swarm.associator.getRequests(getAssociator.id as string, STATUS.PENDING);
  console.log('\n get request list \n', getRequests);

  // Get Associator Request
  const getRequest = await swarm.associator.getRequest(getAssociator.id as string, getRequests[0].uid);
  console.log('\n get request \n', getRequest);

  // Update Associator Request
  const updateRequest = await swarm.associator.updateRequest(privateKey, getRequests[0].uid, STATUS.CANCELED);
  console.log('\n update request \n', updateRequest);

  // Reissue certificates
  const issueCertificates = await swarm.associator.issueCertificates(privateKey, [
    {
      expiration: 0,
      issuer: '',
      subject: '',
      type: ''
    }
  ]);
  console.log('\n issueCertificates \n', issueCertificates);

}

associatorExample().catch(console.error);
