import { Provider } from '../src/utils/provider';
import { SwarmMapSDK } from '../src/core';

const provider = new Provider('localhost', 'AUgfB7AXpnZH3RxmNQeNaYEtJnCUSa94FxTYvsNqKRdQ');
const swarm = new SwarmMapSDK(provider);

export { swarm };
