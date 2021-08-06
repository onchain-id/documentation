---
sidebar_position: 3
---

# Blockchain provider

It is recommended that you connect with a Blockchain Provider to retrieve information directly from the Blockchain. If you don't intend to validate data with the Blockchain but only to use an Identity Provider, you can skip this step.

The SDK uses [Ethers](https://github.com/ethers-io/ethers.js) to connect with the Ethereum network. Thus, any provider supported by Ethers can be used with the SDK. This means any standard web3 provider should be supported.

Almost all methods of the SDK, when they imply reading or writing data to the Blockchain, accept a last optional argument where the provider or signer can be provided for the method. If it is not specified, the provider or signed used when instanciating the Identity with `Identity.at(<address>, { provider })` will be used:

```javascript
const ethers = require('ethers');
const identity = await IdentitySDK.Identity.at('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', { provider });

await identity.addKey('0x..', 1, 3, { signer: someSigner, overrides: { gasPrice: ethers.parseUnits('2.0', 'gwei') } });
```

## Connect to a default provider

You can use any standard network name

- "homestead"
- "rinkeby"
- "ropsten"
- "kovan"

```javascript
let provider = ethers.getDefaultProvider('ropsten');
let provider = ethers.getDefaultProvider('homestead');
```

## Connect to JSON RPC

When using the JSON-RPC API, the network will be automatically detected. The default is `http://localhost:8545`

```javascript
let httpProvider = new ethers.providers.JsonRpcProvider();
```

## Connect to any Web3 Provider

When using a Web3 provider, the network will be automatically detected.

```javascript
let currentProvider = new web3.providers.HttpProvider('http://localhost:8545');

let web3Provider = new ethers.providers.Web3Provider(currentProvider);
```

## Connect to MetaMask (for in-browser usage)

The network will be automatically detected; if the network is changed in MetaMask, it causes a page refresh.

```javascript
let provider = new ethers.providers.Web3Provider(web3.currentProvider);
```

> Please refer to the [Ethers Providers Documentation](https://docs.ethers.io/ethers.js/html/api-providers.html) for more information.
