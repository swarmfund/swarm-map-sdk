# Swarm Market Access Protocol SDK

The official Swarm Market Access Protocol for JavaScript, currently available for Node.js backends.

Market Access Protocol (MAP) is Swarm’s investor compliance ecosystem, built and maintained by a decentralized network of nodes. MAP solves existing inefficiencies and difficulties encountered by token issuers, investors, exchanges, and certificate issuers.

# Installation

For use on Node.js backends, you can install the SDK by running the following NPM command:

```
npm install @swarmfund/swarm-map-sdk --save
```

or if using yarn

```
yarn add @swarmfund/swarm-map-sdk
```

# Documentation

For using the SDK and Swarm Market Access Protocol API please consult the [MAP Developer Docs](https://marketaccessprotocol.docs.apiary.io/#) and [examples](https://github.com/swarmfund/swarm-map-sdk/tree/master/examples).

Request an API key by emailing developers@swarm.fund

# Usages

Initialize SDK:
```js
import {SwarmMapSDK, Provider } from '@swarmfund/swarm-map-sdk';

const provider = new Provider('staging', '<apiKey>');
const swarm = new SwarmMapSDK(provider);
```

Register Certificate Issuer:
```js
import {SwarmMapSDK, Provider } from '@swarmfund/swarm-map-sdk';

const provider = new Provider('staging', '<apiKey>');
const swarm = new SwarmMapSDK(provider);

swarm.certificateIssuer.create({
  name: 'Certificate Issuer 1', 
  publicKey: '048d103bae2e08188f525c9c027a8bc24f60048d8e7461f32e5fe081a9d9a9b5c0261c9ee3551810105912d16b8952287d5ad157e5fd842331bc4d2efe53c0b47c'
}).then(issuer => {
  // ...
}).catch(console.error)

```
