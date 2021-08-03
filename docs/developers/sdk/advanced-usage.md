---
sidebar_position: 5
title: Advanced usage
---

# Deploy an implementation and an implementation authority

If you don't want to rely on public implementation authorities, and don't want to deploy full identities, you may want to deploy your
own implementation and/or your own implementation authority.

You will need the contract package at `@onchain-id/solidity` with the bytecode and the ABIs of the contracts.

## Deploy an implementation

```javascript
const ethers = require('ethers');
const OnchainID = require('@onchain-id/solidity');

(async () => {
  const provider = ethers.getDefaultProvider('kovan');
  const signer = new ethers.Wallet('<private key>', provider);

  const implementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    signer
  ).deploy(
    signer.address,
    true,
  );

  await implementation.deployed();

  console.log(implementation.address);
})();
```

## Deploy an implementation authority

Using you own authority brings more confidence about when to update your ONCHAINID to a new version.

```javascript
const ethers = require('ethers');
const OnchainID = require('@onchain-id/solidity');

(async () => {
  const provider = ethers.getDefaultProvider('kovan');
  const signer = new ethers.Wallet('<private key>', provider);

  const implementationAddress = '<implementation address>';

  const implementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    signer
  ).deploy(implementationAddress);

  await implementationAuthority.deployed();

  console.log(implementationAuthority.address);
})();
```
