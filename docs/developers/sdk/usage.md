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

> 💡 To deploy identities without using proxies or implementation authorities, please use the smart contract bytecodes and ABIs provided in the `@onchain-id/solidity` package. You'll also need a blockchain library, such as `ethers`.

```typescript
import ONCHAINID from "@onchain-id/solidity";
import { ethers } from 'ethers';

(async () => {
	const provider = ethers.getDefaultProvider('kovan');
	const signer = new ethers.Wallet('private key', provider);
	
	const identityFactory = new ethers.ContractFactory(
		ONCHAINID.contracts.Identity.abi,
		ONCHAINID.contracts.Identity.bytecode,
		signer
	);
	const identity = await identityFactory.deploy(
		await signer.getAddress(),
		false,
	);
	// waiting for the contract to be deployed
	await identity.deployed();
})()
```

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


### Get management keys of an Identity

```typescript
import { Identity, IdentitySDK } from "@onchain-id/identity-sdk";
import { ethers } from 'ethers';

(async () => {
	const address = '0x..........' /* address of the identity you want to instanciate */ 
	const provider = ethers.getDefaultProvider('kovan');

	const identity = await Identity.at(address, provider);

	const keys = await identity.getKeysByPurpose(
		IdentitySDK.utils.enums.KeyPurpose.MANAGEMENT
	);
	const hashedAddress = IdentitySDK.utils.encodeAndHash(["address"], ['0x...your wallet address']);
	for (const key of keys) {
		if (key.key === hashedAddress) {
			console.log("The identity has been instantiates we verified the wallet used is a manager of the identity");
		}
	}
})()
```

## Claims

### Add a claim to an identity

Remember that to add a claim to an identity, the signer of the transaction must have a CLAIM or MANAGEMENT key over the identity.

```typescript
import { Identity, IdentitySDK } from "@onchain-id/identity-sdk";
import { ethers } from 'ethers';

(async () => {
	const address = '0x..........' /* address of the identity you want to instanciate */
    const provider = ethers.getDefaultProvider('kovan');
    const signer = new ethers.Wallet('private key', provider);

	const identity = await Identity.at(address, signer);

	// prepare the claim
	const claim = new IdentitySDK.Claim({
		address: '/* identity address */',
		data: '/* data of the claim */',
		issuer: '/* issuer address */',
		emissionDate: Date.now(),
		scheme: '/* scheme of the claim */',
		topic: '/* topic of the claim */',
	});

	// sign the claim
	const customSigner = new IdentitySDK.SignerModule({
		publicKey: await signer.getAddress(),
		signMessage: signer.signMessage.bind(this.signer)
	});
	await claim.sign(customSigner);

	// emit the claim
	const tx = await identity.addClaim(claim.topic, claim.scheme, claim.issuer, claim.signature, claim.data, claim.uri, { signer });
	await tx.wait();
})();
```

### Get claims of an Identity

This method returns only claims that are stored on the ONCHAINID contract. Claims returned might not be valid anymore,
so you may need to verify their validity against the Claim Issuer that issued these claims
(usually by calling `.isClaimValid()` on the Claim Issuer contract).

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');

const provider = ethers.getDefaultProvider('kovan');

(async () => {
    const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', provider);
    
    const claims = await identity.getClaimsByTopic(109741294);
    
    console.log(claims);
})();
```
