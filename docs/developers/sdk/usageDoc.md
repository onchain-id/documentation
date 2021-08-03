---
sidebar_position: 4
---

# Working with identities

## Generic operations

### Deploy an identity

The `Identity#deployNew()` method triggers a deploy transaction and return the deploying Identity, you can then wait `identity.deployed()` for the contract to be deployed. The key from the signer used to deploy the Identity will be added as a MANAGEMENT Key of the Identity, hence giving him a full access over the contract.

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');

const provider = ethers.getDefaultProvider('kovan');

const DEPLOY_PRIVATE_KEY = 'deploy_private_key';
const deployWallet = new IdentitySDK.Providers.Wallet(DEPLOY_PRIVATE_KEY, provider);

const MANAGEMENT_KEY = '0x...management key';

(async () => {
  // Deploy a new Identity
  const identity = await IdentitySDK.Identity.deployNew({
    implementationAuthority: IdentitySDK.constants.implementationAuthorities.kovan, // Or provide your own address.
    managementKey: MANAGEMENT_KEY,
  }, {
    signer: deployWallet,
  }).then(identity => identity.deployed());
})();
```

> 💡 To deploy identities without using proxies or implementation authorities, please use the smart contract bytecodes and ABIs provided in the `@onchain-id/solidity` package.

### Load an Identity

Use the `Identity#at()` method to instantiate an Identity from an existing address. This operation supports resolving ENS.

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');
const provider = ethers.getDefaultProvider('kovan');

const identity = await IdentitySDK.Identity.at('identity.tokeny.xyz', { provider });
```

### Loading an ONCHAINID Contract

You may need to execute functions or read data from ONCHAINID Contracts that are not exposed by the Identity SDK. The `.instantiateAtAddress()` method returns a Ethers Contract instance loaded with the full ONCHAINID abi.

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');

const provider = new IdentitySDK.Providers.JsonRpcProvider();

(async () => {
  const identity = new IdentitySDK.Identity(); // Create the Identity Object

  console.log(identity.instantiateAtAddress('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', { provider })); // Get the instance of the Identity

  console.log(await identity.instance.getClaimIdsByTopic(1)); // Call directly a function from the Contract.
})();
```

## Managing keys

Keys are addresses (or signing keys) designed as being able to perform operation on or from the Identity. For instance, a wallet registered as a MANAGEMENT Key should be able to manage other keys on the Identity.

In the current implementation, keys are stored as HASH of the key itself. To generate a proper hash for a wallet, use the provided helper method. This is a hidden call to a keccak256 hash of an abi encoded (as defined by Ethereum standard. On a smart contract, the same hash would generated with `keccak256(abi.encode(walletAddress))`.

```javascript
const hash = IdentitySDK.utils.encodeAndHash(['address'], [walletAddress]);
```

### Add a purpose to a key or add a new key

A key is added with a specific purpose. This call will register the key if it doesn't exist yet on the identity contract with the given purpose, or add the purpose to the key if it already exists on the contract. You must also specify the type of the key (ECDSA).

Both key purposes and types have enums you can get from `IdentitySDK.utils.enums`.

```javascript
const identity = await Identity.at('<address>', { provider });

const addKeyTransaction = await identity.addKey(IdentitySDK.utils.encodeAndHash(['address'], [walletAddress]), IdentitySDK.utils.enums.KeyPurpose.MANAGEMENT, IdentitySDK.utils.enums.KeyType.ECDSA, { signer });
```

The `signer` must be a MANAGEMENT key on the Identity to perform the operation.
