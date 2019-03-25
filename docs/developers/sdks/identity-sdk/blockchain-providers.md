# BlockChain Provider

It is recommended that you connect with a BlockChain Provider to retrieve information directly from the BlockChaim.
If you don't intend to validate data with the BlockChain but to only use an Identity Provider, you can pass this step.

The SDK is using [Ethers](https://github.com/ethers-io/ethers.js) to connect with Ethereum network.
Thus, any provider supported by Ethers can be used with the SDK.
This means any standard web3 provider should by supported.

## Connect to a default provider

```javascript
// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"

let provider = ethers.getDefaultProvider('ropsten');
let provider = ethers.getDefaultProvider('homestead');
```

## Connect to JSON RPC

```javascript
// When using the JSON-RPC API, the network will be automatically detected


// Default: http://localhost:8545
let httpProvider = new ethers.providers.JsonRpcProvider();
```

## Connect to any Web3 Provider

```javascript
// When using a Web3 provider, the network will be automatically detected

// e.g. HTTP provider
let currentProvider = new web3.providers.HttpProvider('http://localhost:8545');

let web3Provider = new ethers.providers.Web3Provider(currentProvider);
```

## Connect to MetaMask (for in-browser usage)

```javascript
// The network will be automatically detected; if the network is
// changed in MetaMask, it causes a page refresh.

let provider = new ethers.providers.Web3Provider(web3.currentProvider);
```

---

> Please refer to the [Ethers Providers Documentation](https://docs.ethers.io/ethers.js/html/api-providers.html) for more information.
