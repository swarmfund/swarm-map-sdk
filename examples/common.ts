import { Provider } from '../src/utils/provider';
import { SwarmMapSDK } from '../src/core';

const provider = new Provider('sandbox', '<x-map-api-key>');
const swarm = new SwarmMapSDK(provider);

export { swarm };
