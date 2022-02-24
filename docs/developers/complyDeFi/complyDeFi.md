---
sidebar_position: 1
title: ComplyDeFi
---

# Introduction
The goal of [ComplyDeFi](https://github.com/onchain-id/ComplyDefi) is to provide a simple contract to transform a permissionless DeFi protocol into a
permissioned DeFi protocol. To do so, ComplyDeFi is leveraging the power of the ONCHAINID protocol, an open source & decentralized system providing identity smart contracts based on the implementation of ERC734 and ERC735. ComplyDeFi provides a very simple modifier that has to be added on the functions that require permissioning to ensure the caller of this function is eligible following the rules that the owner of the DeFi contract required.

# Code
ComplyDeFi is an open source set of smart contracts, it is available for anyone to use or modify, you can also 
contribute to the evolution of the protocol by adding comments or Pull Requests directly on the github repository 
available here:  
https://github.com/onchain-id/ComplyDefi

# How does it work?
ComplyDeFi uses several concepts to work properly, these concepts are defined hereunder :

## ONCHAINID Factory
First of all, the primary need of ComplyDeFi is to know who is managing the wallets interacting with the protocol,
or at least know that the user behind this wallet has an ONCHAINID and is eligible following the claim requirements.
For that purpose, the ComplyDeFi contract needs to have access to the ONCHAINID address corresponding to any wallet trying to interact with it. The function used to do that is `getIdentity` that is available on the ONCHAINID Factory.
The link to the ONCHAINID Factory is therefore a critical point on any ComplyDeFi contract, that's why it is
mandatory to give the address of the Factory contract in the constructor of any contract inheriting from ComplyDeFi.
If the address was not set properly, it is still possible to fix it with the `setFactory` function available on the
ComplyDeFi interface, this function can be called only by the contract owner obviously, as it is a critical function.

## Claim Issuers
The Claim Issuers are defined on the ONCHAINID protocol, basically Claim issuers are ONCHAINID contracts that are designed to emit claims for other ONCHAINIDs, they have the power to revoke a claim that they issued previously to remove the eligibility of an ONCHAINID. Claim Issuers can be any trusted third party that the protocol owner needs to verify the eligibility of its users, e.g. KYC providers, AML services, ...

## Claim Requirements
The owner of the ComplyDeFi protocol has the possibility to customize the claim requirements for granting access to the DeFi protocol by designating trusted issuers and required claims.

## OnlyComply modifier
The `onlyComply` modifier is used to add the permissioning layer on top of an existing function from the permissionless DeFi smart contracts. The contract simply needs to inherit from ComplyDeFi, see the code example below, in this code the well known gooseDeFi protocol is turned into a permissioned DeFi protocol thanks to ComplyDeFi by adding a permission layer on the `deposit` function that is used to stake funds on the contract. In this case, the deposit of funds will be allowed only if the wallet that is used for the deposit is linked to a valid ONCHAINID, deployed by the ONCHAINID Factory, and containing the valid claims, required by the protocol and issued by trusted third parties approved by the DeFi protocol owner.

```solidity
import "gooseFinance/MasterChef.sol";
import "ComplyDeFi.sol";

contract GooseComply is MasterChef, ComplyDeFi {

    constructor (
        address _factory,
        address _id,
        EggToken _egg,
        address _devaddr,
        address _feeAddress,
        uint256 _eggPerBlock,
        uint256 _startBlock)
    ComplyDeFi(_factory, _id)
    MasterChef(_egg, _devaddr, _feeAddress, _eggPerBlock, _startBlock) {

    }

    function deposit(uint256 _pid, uint256 _amount) public override onlyComply {
        super.deposit(_pid, _amount);
    }
}
```
# ComplyDeFi Events
## TrustedIssuerAdded
This event is emitted when a new trusted issuer is added by the Owner of the DeFi protocol, this event returns the address of the new claim issuer and the set of claim topics for which the claim issuer is trusted. 

```solidity
event TrustedIssuerAdded(address issuer, uint[] claimTopics);
```
## TrustedIssuerUpdated
This event is emitted when an existing trusted claim issuer is updated, which happens when the set of claim topics for which the issuer is trusted is updated. This event returns the address of the claim issuer and the set of claim topics for which the claim issuer is trusted. 
```solidity
event TrustedIssuerUpdated(address issuer, uint[] claimTopics);
```

## TrustedIssuerRemoved
This event is emitted when trust is revoked for a claim issuer. This event returns the address of the claim issuer that is removed from the list of trusted issuers 
```solidity
event TrustedIssuerRemoved(address issuer);
```

## ClaimRequired
This event is emitted when a claim requirement is added to the ComplyDeFi protocol, it means that this claim topic is necessary to interact with the functions that are using the `onlyComply` modifier. This event returns the claim topic that is required. 
```solidity
event ClaimRequired(uint claimTopic);
```

## ClaimUnRequired
This event is emitted when a claim requirement is removed. This event returns the claim topic that is not required anymore. 
```solidity
event ClaimUnRequired(uint claimTopic);
```
##  FactorySet
This event is emitted when the factory address is set. The event returns the address of the factory.
```solidity
event FactorySet(address _factory);
```

# ComplyDeFi Functions
## setFactory
This function is a setter for the ONCHAINID Factory address.
It can be used post-deployment to update the ONCHAINID Factory address if required.  
**OnlyOwner function : the owner wallet is the only one able to call this function**  
param1 : `_factory` the address of the ONCHAINID factory  
emits a `FactorySet` event
```solidity
function setFactory(address _factory) external;
```

## isTrustedIssuer
getter function for the trusted status of a claim issuer  
returns true if the address corresponds to a trusted issuer and false if not  
**public function : can be called by anyone**  
param1 : `_issuer` the address of the ONCHAINID contract of the claim issuer  
it is important to note that the `_issuer` address here is not a wallet address but an ONCHAINID
```solidity
function isTrustedIssuer(address _issuer) external view returns (bool);
```
## addTrustedIssuer
function used to add a new trusted issuer for the contract. Adds a trusted issuer and the corresponding claims they 
are trusted for. This function can be called only to register a new claim issuer, to update an existing issuer, 
please use the `updateIssuerTopics` function.  
**onlyOwner function : the owner wallet is the only one able to call this function**  
param1 : `_issuer` the address of the ONCHAINID contract of the claim issuer  
param2 : `_claimTopics` the array of claim topics for which the issuer is trusted  
it is important to note that the `_issuer` address here is not a wallet address but an ONCHAINID  
emits a `TrustedIssuerAdded` event

```solidity
function addTrustedIssuer(address _issuer, uint[] memory _claimTopics) external;
```

## removeTrustedIssuer
This function is used to remove the trusted status from a claim issuer. Can be called only to remove an existing 
claim issuer, function call will fail if the claim issuer does not exist.  
**onlyOwner function : the owner wallet is the only one able to call this function**  
param1 : `_issuer` the address of the ONCHAINID contract of the claim issuer  
it is important to note that the `_issuer` address here is not a wallet address but an ONCHAINID  
emits a `TrustedIssuerRemoved` event
```solidity
function removeTrustedIssuer(address _issuer) external;
```

## updateIssuerTopics
This function is used to update the claim set that a claim issuer is trusted for. Can be called only on an existing 
claim issuer, function call will fail if the issuer does not exist.  
The set of claim topics cannot be empty, otherwise the issuer is not considered as trusted anymore, in this case use 
the function `removeTrustedIssuer` instead.  
**onlyOwner function : the owner wallet is the only one able to call this function**  
param1 : `_issuer` the address of the ONCHAINID contract of the claim issuer  
param2 : `_claimTopics` the array of claim topics for which the issuer is trusted  
it is important to note that the `_issuer` address here is not a wallet address but an ONCHAINID  
emits a `TrustedIssuerUpdated` event

```solidity
function updateIssuerTopics(address _issuer, uint[] memory _claimTopics) external;
```

## isClaimRequired
View function used to check if a claim is required or not to be eligible on the contract.  
Returns true if the claim is required and false otherwise  
**public function : can be called by anyone**  
param1 :  `_claim` the claim topic that is currently checked
```solidity
function isClaimRequired(uint _claim) external view returns (bool);
```

## addRequiredClaim
This function is used to add a claim topic to the list of claim topics that are required to be considered eligible 
by the contract.  
**onlyOwner function : the owner wallet is the only one able to call this function**  
param1 : `_claim` the claim topic that has to be added  
emits a `ClaimRequired` event
```solidity
function addRequiredClaim(uint _claim) external;
```

## removeRequiredClaim
This function is used to remove a claim topic to the list of claim topics that are required to be considered 
eligible by the contract.  
**onlyOwner function : the owner wallet is the only one able to call this function**  
param1 :  `_claim` the claim topic that has to be removed  
emits a `ClaimUnRequired` event
```solidity
function removeRequiredClaim(uint _claim) external;
```

## hasClaimTopic
This function is used to check if an issuer is trusted for a specific claim topic  
**public function : can be called by anyone**  
param1 : `_issuer` the claim issuer contract  
param2 : `_claimTopic` the claim topic that is checked  
returns true if the issuer has this claim and false otherwise  
it is important to note that the `_issuer` address here is not a wallet address but an ONCHAINID
```solidity
function hasClaimTopic(address _issuer, uint _claimTopic) external view returns (bool);
```

## isComply
This function is used to check if a wallet is eligible following the requirements of the contract  
**public function : can be called by anyone**  
param1 : `_user` the wallet address of the user  
returns true if the wallet is eligible and false otherwise  
This function is the central function of ComplyDeFi, it is checking if the wallet is linked to an eligible ONCHAINID contract and if this ONCHAINID contains the required claim topics emitted by the issuers that are trusted for the topics
```solidity
function isComply(address _user) external view returns (bool);
```


