---
sidebar_position: 5
title: Contract repository
---

The source code of the interfaces, requirements and implementation for ONCHAINID can be found in the
[https://github.com/onchain-id/solidity](https://github.com/onchain-id/solidity) repository.

The contracts are also compiled and published as
the [@onchain-id/solidity](https://www.npmjs.com/package/@onchain-id/solidity) on NPM and Github Registry.

# Get started

- Clone the repository
  ```bash
  git clone git@github.com:onchain-id/solidity.git
  ```
- Install tooling with
  ```bash
  npm install
  ```

# Setup

> :::note  
> Make sure you ran `npm install` before running any of the commands below.  
> :::

By default, almost all commands will run against a local ephemeral network started by Hardhat.
This means running deploy scripts won't persist. It is instead possible to configure Hardhat to target an
existing network (like testnets) or to start a persistent node. Refer to
the [hardhat documentation](https://hardhat.org/hardhat-network/docs/overview) for more details.

To start a local network managed by Hardhat (using the tooling provided, this comes bundled with debugging utilities):

```bash
npx hardhat node
```

To use an existing network (for instance a testnet), update the `hardat.config.ts` file:

```typescript title=hardhat.config.ts
const config: HardhatUserConfig = {
    //...
    networks: {
        myNetwork: {
            url: "https://my-rpc.onchainid.xyz",
            accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
        },
    },
};
```

The accounts property can contain the private keys to use for the network. Each script has its own order, but in
general, the first one will be the address used to deploy contracts.

Instead of declaring private keys, you may also leave it empty and use the node as a signer (e.g. Geth Clef).

# Scripts and tasks

The repository contains a number of scripts and tasks to help with development and testing. But these scripts can also
be used to deploy contracts and interact with them.

## Deploy scripts

There are scripts to:

- Deploy a standalone identity contract.
- Deploy a factory suite (factory, implementation authority, library contracts).
- Deploy a claim issuer contract.

### Deploy a standalone identity

```bash
npx hardhat run scripts/deploy-identity.ts --network <myNetwork/localhost>
```

### Deploy a factory suite

```bash
npx hardhat run scripts/deploy-factory.ts --network <myNetwork/localhost>
```

### Deploy a claim issuer

```bash
npx hardhat run scripts/deploy-claim-issuer.ts --network <myNetwork/localhost>
```

## Interaction tasks

There are tasks to:

- Modify keys on an identity.
- Add and remove claims on an identity.
- Revoke a claim on a Claim Issuer.
- Deploy an identity as a proxy using a factory.

### Add a purpose to a key on an identity

```bash
npx hardhat add-key --identity <identity address> --from <identity MANAGEMENT key> --key <key> --type <key type> --purpose <purpose> --network <myNetwork/localhost>
```

- `identity address` is the address of the identity contract.
- `identity MANAGEMENT key` is the address of a MANAGEMENT key on the identity (will emit the transaction and pay gas).
- `key` is the key to add (ethereum address).
- `key type` is the type of the key to add (use standard-defined type or custom one, should probably be ECDSA = 1).
- `purpose` is the purpose of the key to add (integer) (MANAGEMENT = 1, CLAIM = 2, EXECUTE = 3).

### Remove a purpose from a key on an identity

```bash
npx hardhat remove-key --identity <identity address> --from <identity MANAGEMENT key> --key <key> --type <key type> --purpose <purpose> --network <myNetwork/localhost>
```

- `identity address` is the address of the identity contract.
- `identity MANAGEMENT key` is the address of a MANAGEMENT key on the identity (will emit the transaction and pay gas).
- `key` is the key to add (ethereum address).
- `key type` is the type of the key to remove (use standard-defined type or custom one, should probably be ECDSA = 1).
- `purpose` is the purpose of the key to remove (integer) (MANAGEMENT = 1, CLAIM = 2, EXECUTE = 3).

### Add a claim on an identity

```bash
npx hardhat add-claim --identity <identity address> --from <identity CLAIM key> --claim <claim as JSON> --network <myNetwork/localhost>
```

- `identity address` is the address of the identity contract.
- `identity CLAIM key` is the address of a CLAIM (OR MANAGEMENT) key on the identity (will emit the transaction and pay gas).
- `claim` is the claim to add as a JSON string.
  - `claim.topic` is the claim topic (use standard-defined topic or custom one).
  - `claim.scheme` is the claim scheme (use standard-defined scheme or custom one).
  - `claim.issuer` is the address of the claim issuer.
  - `claim.data` is the data of the claim.
  - `claim.signature` is the signature of the claim.
  - `claim.uri` is the URI of the claim.

```bash
npx hardhat add-claim --identity 0x... --from 0x... --claim '{"type": "1876049747", "scheme": "1", "issuer": "0x...", "data": "0x...", "signature": "0x...", "uri": "https://..."}' --network <myNetwork/localhost>
```

### Remove a claim from an identity

```bash
npx hardhat remove-claim --identity <identity address> --from <identity CLAIM key> --claim <claim ID> --network <myNetwork/localhost>
```

- `identity address` is the address of the identity contract.
- `identity CLAIM key` is the address of a CLAIM (OR MANAGEMENT) key on the identity (will emit the transaction and pay gas).
- `claim ID` is the ID of the claim to remove (keccak256 hash of issuer address and topic abi-encoded).

### Revoke a claim on a Claim Issuer

```bash
npx hardhat revoke --issuer <claim issuer address> --from <claim issuer management key> --signature <claim signature> --network <myNetwork/localhost>
```

- `claim issuer address` is the address of the claim issuer contract.
- `claim issuer management key` is the address of a claim issuer management key (will emit the transaction and pay gas).
- `claim signature` is the signature of the claim to revoke.

### Deploy an identity as a proxy

```bash
npx hardhat deploy-proxy --factory <factoryAddress> --from <deployer account> --key <ethereum address of identity owner> --network <myNetwork/localhost>
```

- `factoryAddress` is the address of the factory contract (obtained by deploying a factory).
- `deployer account` is the address of the account that will emit the transaction and pay gas.
- `ethereum address of identity owner` is the address of the identity owner (ethereum address), will be set as a MANAGEMENT key on the
  identity.
- Optional: `--salt [salt]` to specify a salt for the proxy deployment, otherwise, the `key` will be used as the salt. 
