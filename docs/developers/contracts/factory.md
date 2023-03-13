---
sidebar_position: 4
title: Factory
---

# Factory
## Abstract
The ONCHAINID Factory is a decentralized application that allows users to securely create, store, and manage unique 
digital identities on any EVM blockchain. It provides an easy and secure way to link wallets and tokens to on-chain 
identities, as well as the ability to register token factories, which can issue additional identities for tokens. 
The Factory is designed to maintain data privacy, security, and scalability, making it ideal for a wide range of use 
cases. The Factory is powered by smart contracts and is designed to ensure the secure management of digital identities. 

## Proxification of contracts
The ONCHAINID Factory is not deploying the direct implementation contracts, instead it is using a modified version 
of the [`ERC-1822`](https://eips.ethereum.org/EIPS/eip-1822) Upgradeable proxy standard, the modification done to the proxy compared to the `ERC-1822` is that 
the 
Proxy contracts used on ONCHAINID are all linked to a shared `ImplementationAuthority` smart contract, that allows a 
synchronous upgrade of all ONCHAINID proxies in one single upgrade call.

:::note

The smart contract implementation as well as the `ImplementationAuthority` contract **MUST** be deployed before 
deploying proxies, otherwise the proxy deployment will fail

:::




## Use of CREATE2 opcode
The deployments made from the Factory are using the CREATE2 opcode from EVM, which allow the deployment of contracts 
in a 
deterministic way, thus creating a predictable contract address.

:::info

The same user should have the same ONCHAINID address on any EVM compatible blockchain, which brings interesting 
properties, including the cross-chain portability of claims, as the claim signature is a signature of `keccak256(abi.
encode(identityHolder_address, topic, data))` with a claim key contained in the `ClaimIssuer` contract, as long as 
the data, topic and ONCHAINID addresses are the same on both chains, the claim signature remains valid and can be 
added to the ONCHAINID.

:::

:::danger

It is very important to protect users from usurpation of identity, as the use of CREATE2 opcode allows to deploy an 
Identity with the same address on multiple blockchains, and use the claims issued for the primary identity, it is 
necessary to add checks to prevent any misuse of the function. CREATE2 is using a `salt` parameter to determine the 
address of the smart contract deployed. To protect users from Identity theft, the `salt` generation has to be 
protected. The basic implementation of the Factory protects the Identity Creation functions with an owner scope, 
which keeps the door open to more complex mechanisms, as the owner role can be given to an external smart contract 
used for the generation of `salt` and roles management. **The implementation of such smart contract can be done in 
multiple ways, but it should always protect the users from identity theft!**

:::



## How to deploy the factory
The deployment of a new ONCHAINID Factory has to be done in different steps, each step is described below and it is 
very important to respect these steps, otherwise the Factory will not be able to work properly. 

### Deployment of library contracts
The Library contract is an implementation of ONCHAINID, which is deployed separately, with the constructor parameter 
`_isLibrary` set on `TRUE` at deployment. The initial management key for the deployment of the library contract 
doesn't matter, as the actions are protected from interactions on the library contract, with a modifier 
`delegatedOnly` which prevents any direct calls to the implementation contract.

:::info

The Library contract is the one that needs to be redeployed at each new version of ONCHAINID to upgrade the proxies. 

:::

### Deployment of the implementation authority
The Implementation Authority contract is used as a central point of reference for all proxies that are deployed. 
This contract is implementing the [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) library from OpenZeppelin which is used to protect the most critical 
function of the whole ONCHAINID ecosystem, the `updateImplementation` function, which allows the smart contract 
owner to update the address of the Library smart contract used by all proxies pointing to the same 
`ImplementationAuthority` contract, i.e. all proxies deployed by the same ONCHAINID Factory. 

:::danger

The `updateImplementation` could be considered as a backdoor on ONCHAINID contracts as it allows to upgrade the 
contract code to any new address, the new address could implement anything, including functions to steal funds of 
users if they are storing funds on their ONCHAINID or if the ONCHAINID has some allowance on tokens held on external 
wallets. This is the reason why the owner address should be protected with a top-level security, e.g. using multisig 
smart contracts, MPC wallets, HSMs, or even a DAO to manage the upgradeability of ONCHAINID smart contracts. 

:::

The address of the Library contract, previously deployed, has to be given to the `ImplementationAuthority` contract, 
at deployment, as it is a parameter required by the `ImplementationAuthority` constructor. 

### Deployment of the OID factory
Once the `ImplementationAuthority` is properly deployed and setup, the Factory can be deployed as well. 
The Factory implements the `Ownable` library from OpenZeppelin to protect the ONCHAINID deployment functions as well 
as the functions for whitelisting Token Factory addresses. The Token Factory addresses will be able to call the 
function to create ONCHAINIDs for tokens. 
As mentioned above, in the `CREATE2` topic, the deployment of new identity proxies has to be protected to avoid 
usurpation of identity, the owner role is used for that and can be given to an external contract implementing logic 
to prevent the misuse of these critical functions, e.g. by using oracles to check that the `salt` is not used on 
other blockchains yet, by formatting the `salt` in a way that only the same user can deploy on different blockchains 
(by using a cryptographic signature or checking the `msg.sender` address), or any other method. The implementation 
of such contract can be done in a lot of different ways. 

To deploy the Factory, the address of the `ImplementationAuthority` contract, previously deployed and set has to be 
given to the constructor of the Factory contract.

## How to use the factory

### Deployment of new ONCHAINID proxies
To deploy a new ONCHAINID proxy, the function `createIdentity` needs to be called. The parameters of this function 
are the wallet address of the ONCHAINID owner (that will be set as the first MANAGEMENT key of the ONCHAINID) and the 
salt used 
for the deployment and allowing `CREATE2` to generate 
a deterministic smart contract address, that address can be the same on all blockchains as long as the address of 
the factory contract and the salt are identical. To make a successful ONCHAINID deployment some conditions need to 
be respected, the salt cannot already be used, as you cannot deploy 2 times with the same salt (in the same way that 
you cannot deploy 2 times with the same nonce in a classic transaction) and the wallet cannot be linked to an 
ONCHAINID already. Multiples wallets can be linked to an ONCHAINID but a wallet cannot be shared by multiple 
ONCHAINIDs. To ensure the security of ONCHAINIDs and prevent identity theft cross-chain (deployment of an ONCHAINID 
with the same salt from a different person) the `createIdentity` function is protected from external calls with an 
`onlyOwner` modifier, which allows only the address set as owner to call the function. This address can obviously be 
an external smart contract, managing roles and accessibility to the function in any way that would fit the 
requirements coming from the factory deployer. The function `createIdentity` when called successfully emits an event 
`Deployed` and an event `WalletLinked` with the first wallet that is linked to the ONCHAINID. 

:::tip

An easy way to implement that external contract could consist in simply using the address of the ONCHAINID 
deployer as part 
of the salt, therefore identity theft would not be possible as the resulting ONCHAINID would be managed by the same 
wallet on all chains by design. 

:::

:::note

Keep in mind that keys could be lost or compromised and make sure that a recovery is possible in case of lost key.

:::

:::warning

It is very important to keep in mind the potentiality of identity theft cross-chain if the external contract 
managing access to the `createIdentity` function is not implemented correctly. 

:::

### Linking new wallets to an ONCHAINID
When a new ONCHAINID is deployed, the first wallet, used at deployment as the primary MANAGEMENT key, is "linked" to 
the ONCHAINID, what it means is that the factory contract keeps into its storage, in a mapping, the correspondence 
table between wallets and ONCHAINIDs and vice versa. This allows external contracts to query the factory to know 
which ONCHAINID is linked to a wallet trying to interact with the latter and to then verify the eligibility of that 
ONCHAINID to access their services. Having a link between wallets and ONCHAINIDs is necessary as each ONCHAINID is a 
separate smart contract and without that link it would be impossible (at least onchain, because offchain you can 
track events) to find the corresponding ONCHAINID to a wallet that you are interacting with. 
The function `linkWallet` is used for that. To link a new wallet to your ONCHAINID you need to call the function 
`linkWallet` with a wallet that is already linked to your ONCHAINID and the parameter of the function being the new 
wallet you want to link.

:::tip

The linked wallets on the factory contract can be seen as a central correspondence table between wallets and
ONCHAINIDs and can be used as such in any application using ONCHAINIDs.

:::

The function `getIdentity` can be used to fetch the identity address linked to any wallet while the function 
`getWallets` can be used to fetch the array of wallets linked to an ONCHAINID. 

:::note 

It is not necessary to link the wallets on the factory if a similar link is made on another smart contract, e.g. on 
the Identity Registry of ERC-3643 a similar link exists and is used for managing the list of token holders.

:::

