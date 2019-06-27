# Get Started

## Installation

Install with `npm install @investorid/identity-sdk` (IMPORTANT : the SDK is not yet publicly available so the command here is not yet activated, it will come very soon)

Then require with:
```javascript
const IdentitySDK = require('@investorid/identity-sdk');
```

## Load an Identity

The unique identifier of an Identity is its address.
To load its data from the BlockChain, you need to instantiate a connection with a BlockChain provider.
In this documentation, the test network `ropsten` will be used. Replace by `homestead` to target main network (see the [BlockChain Providers](blockchain-providers.md) for more information on different type of network).

```javascript
const ethers = require('ethers');

const provider = ethers.getDefaultProvider('ropsten');

// instantiate an Identity from its address on a specific network.
const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', provider);
```

## Use SDK methods to retrieve data

Once the identity is loaded from an address, you can call the methods from the Identity object.
Here is a basic one that retrieves all claims of an identity by type.

```javascript
(async () => {
  const claims = await identity.getClaimsByType(1);
  
  console.log(claims);
  // Will return the parsed claims of the identity.
})();
``` 
