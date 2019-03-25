# Some example of usage

## Execute direct contract calls

You can also call function from the smart contract using the `Identity.instance` property.

```javascript
const IdentitySDK = require('@investorid/identity-sdk');
const Ethers = require('ethers');

const provider = Ethers.getDefaultProvider('ropsten');

const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', provider);

(async () => {
  const claims = await identity.instance.getClaimIdsByType(1);
  
  console.log(claims);
  // Will return the unparsed response from the blockchain.
});
```

All functions from the [ERC734](https://github.com/ethereum/eips/issues/734) and [ERC735](https://github.com/ethereum/EIPs/issues/735) standards will be callable, as well as all custom functions implemented in the [T-REX standard](https://github.com/TokenySolutions/T-REX).

## Get keys of an Identity

```javascript
const IdentitySDK = require('@nakasar/identity-sdk');

const Ethers = require('ethers');

const provider = Ethers.getDefaultProvider('ropsten');

const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', provider);

(async () => {
  const keys = await identity.getKeysByPurpose(IdentitySDK.utils.enums.KeyPurpose.CLAIM);
  
  console.log(keys);
  
  console.log(await identity.getKeyPurpose(keys[0].key));
})();
```

## Deploy an identity

```javascript
const IdentitySDK = require('@nakasar/identity-sdk');

const Ethers = require('ethers');

const provider = Ethers.getDefaultProvider('ropsten');

const PRIVATE_KEY = 'tokeny_private_key';
const wallet = new Ethers.Wallet(PRIVATE_KEY, provider);

(async () => {
  // Deploy a new Identity, will await transaction confirmation.
  const identity = await IdentitySDK.Identity.deployNew(wallet);
})();
```

## Get details of a claim with an Claim Issuer

```javascript
const IdentitySDK = require('@nakasar/identity-sdk');

const Ethers = require('ethers');

const provider = Ethers.getDefaultProvider('ropsten');

(async () => {
    IdentitySDK.config({ allowUnsecuredProviders: true });

    const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', provider);

    const claims = await identity.getClaimsByType(IdentitySDK.utils.enums.ClaimType.KYC);

    const claim = new IdentitySDK.Claim(claims[0]);

    await claim.populate(); // Will fetch public data of the claim from the claim URI.

    console.log(claim);
    
    /*
    Claim {
      data: '0x65773261724950755a302f626e5a744e327961676676376139462f6a3672744a4e3761666a52414c6871493d',
      id: '0x3c6532cc1f4d1a44de8f58d4bde617bef8e744168bf92d783a0e1b66e7c6a44a',
      issuer: '0x8c78fF753c63ea0e8CA1FcA9997A132bC3e6a8F1',
      scheme: 1,
      type: 1,
      uri: 'http://localhost:8080/claims/b701e350-2a08-11e9-ac7e-517ddf10b60e',
      issuanceDate: 2019-02-06T12:14:12.996Z,
      emissionDate: 2019-02-06T12:15:02.039Z,
      status: 'PENDING',
      publicData: { result: 'clear' } }
     */
})();
```
