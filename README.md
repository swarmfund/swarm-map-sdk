# Swarm Market Access Protocol SDK

The official Swarm Market Access Protocol for JavaScript, currently available for Node.js backends.

Market Access Protocol (MAP) is Swarm’s investor compliance ecosystem, built and maintained by a decentralized network of nodes. MAP solves existing inefficiencies and difficulties encountered by token issuers, investors, exchanges, and certificate issuers.

# Installation

For use on Node.js backends, you can install the SDK by running the following NPM command:

```
npm install swarm-map-sdk --save
```

or if using yarn

```
yarn add swarm-map-sdk
```

# Documentation

For using the SDK and Swarm Market Access Protocol API please consult the [MAP Developer Docs](https://marketaccessprotocol.docs.apiary.io/#) and [examples](https://github.com/swarmfund/swarm-map-sdk/tree/master/examples).

# Usages

Initialize SDK:
```js
import {SwarmMapSDK, Provider } from 'swarm-map-sdk';

const provider = new Provider('staging', '<apiKey>');
const swarm = new SwarmMapSDK(provider);
```

Register Certificate Issuer:
```js
import {SwarmMapSDK, Provider } from 'swarm-map-sdk';

const provider = new Provider('staging', '<apiKey>');
const swarm = new SwarmMapSDK(provider);

swarm.certificateIssuer.create({
  name: 'Certificate Issuer 1', 
  publicKey: '0x3E2c2B8a66C9d4A6Fd51740571cbA5bB1388892D'
}).then(issuer => {
  // ...
}).catch(console.error)

```
