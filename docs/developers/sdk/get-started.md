---
sidebar_position: 2
---

# Getting started

## Installation

You can install the identity SDK as a dependency with the command `npm install @onchain-id/identity-sdk`

you can then require the dependency in your application with
```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');
```

Or if you are using ES6

```javascript
import { IdentitySDK } from '@onchain-id/identity-sdk'
```

## Loading an Identity

The unique identifier of an Identity is its address. To load its data from the BlockChain, you need to instantiate a connection with a BlockChain provider.
In this documentation, the test network `ropsten` will be used. Replace this with `homestead` to target the main network; see the [BlockChain Providers](./provider) for more information regarding the different types of network.

```javascript
const ethers = require('ethers');

const provider = ethers.getDefaultProvider('ropsten');

// instantiate an Identity from its address on a specific network.
const identity = await IdentitySDK.Identity.at('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', { provider });
```

## Use the inbuilt SDK methods to retrieve data

Once the identity is loaded from an address, you can call the methods from the Identity object. Here is a basic example of the method to retrieve all claims of an identity by type.

This example assumes you are using a version of NodeJs that supports async await

```javascript
(async () => {
  const claims = await identity.getClaimsByType(1);
  
  console.log(claims);
  // Will return the parsed claims of the identity.
})();
```
