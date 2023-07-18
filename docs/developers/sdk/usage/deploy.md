---
sidebar_position: 1
---

# Deployment

## Using the Gateway (recommended)

A `Gateway` contract was developed to allow users to deploy their own identities using a managed Factory contract.
This makes easier to deploy identities using the same address across multiple chains as long as the factory is
deployed on the desired network.

There are three differents ways and associated methods to deploy an ONCHAINID using a `Gateway`:
- `deployUsingGatewayForWallet` deploys an identity for a given wallet address as a management key and as the salt. If
  the signer intends to deploy an identity for their own wallet, this is probably the method to use.
- `deployUsingGatewayWithSaltAndManagementKeys` deploys an identity for a given wallet using a custom salt and
  a list of keys to add to the identity. The identity owner won't be added as a management key, but key hashes listed
  as management keys keys will. This is useful if the signer wants to deploy an identity for a wallet for other keys
  than the wallet (for instance if it was lost) of with more than one management key.
- `deployUsingGatewayWithSalt` deploys an identity for a given wallet as a management key using a custom salt.

These methods triggers a creation of a contract, therefore they do not return the deployed identity but instead the
transaction to be awaited. The created identity address can be retrieved in the events associated with the transaction
(albeit it can be pre-computed using the CREATE2 method).

Except the `deployUsingGatewayForWallet` that has no specific protection, the methods requires a signature from an
signer approved and trusted by the Gateway to deploy an identity using a custom salt and/or with a list of management
keys.

Authorized signers can sign the deployment:

```javascript
const expiry = BigNumber.from(new Date().getTime()).div(1000).add(2 * 24 * 60 * 60);
const digest =
  ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ['string', 'address', 'string', 'uint256'],
      ['Authorize ONCHAINID deployment', '0x... identity owner', 'saltToUse', expiry],
    ),
  );
const signature = await deploySigner.signMessage(
  ethers.utils.arrayify(
    digest,
  ),
);
```

Or with management keys:
```javascript
const expiry = BigNumber.from(new Date().getTime()).div(1000).add(2 * 24 * 60 * 60);
const digest =
  ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ['string', 'address', 'string', 'bytes32[]', 'uint256'],
      [
        'Authorize ONCHAINID deployment',
        '0x.... identity owner',
        'saltToUse',
        [
          ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], ['0x... address of management key'])),
        ],
        expiry,
      ],
    ),
  );
const signature = await deploySigner.signMessage(
  ethers.utils.arrayify(
    digest,
  ),
);
```

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');
const provider = ethers.getDefaultProvider('kovan');
const signer = new ethers.Wallet('private key', provider);

const tx = await IdentitySDK.Identity.deployUsingGatewayForWallet({
  gateway: gateway.address,
  identityOwner: '0x...',
}, { signer });
```

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');
const provider = ethers.getDefaultProvider('kovan');
const signer = new ethers.Wallet('private key', provider);

const tx = await IdentitySDK.Identity.deployUsingGatewayWithSalt({
  gateway: gateway.address,
  identityOwner: '0x...',
  salt: 'saltToUse',
  managementKeys: [
    IdentitySDK.utils.encodeAndHash(['address'], ['0x... address of management key']),
  ], 
  signature: signature,
  signatureExpiry: expiry,
}, { signer });
```

```javascript
const { IdentitySDK } = require('@onchain-id/identity-sdk');
const provider = ethers.getDefaultProvider('kovan');
const signer = new ethers.Wallet('private key', provider);

const tx = await IdentitySDK.Identity.deployUsingGatewayWithSaltAndManagementKeys({
  gateway: gateway.address,
  identityOwner: '0x...',
  salt: 'saltToUse',
  signature: signature,
  signatureExpiry: expiry,
}, { signer });
```

## Proxy

The `Identity#deployNew()` method triggers a deploy transaction and return the deploying Identity, you can then wait
`identity.deployed()` for the contract to be deployed. The key from the signer used to deploy the Identity will be
added as a MANAGEMENT Key of the Identity, hence giving them full access over the contract.

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

## Standalone

To deploy identities without using proxies or implementation authorities, please use the smart contract bytecodes
and ABIs provided in the `@onchain-id/solidity` package. You'll also need a blockchain library, such as `ethers`.

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