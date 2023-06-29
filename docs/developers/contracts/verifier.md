# Verifier

The Verifier contract is a contract designed to be extended by contracts that need to verify that addresses are
compliant with a set of identities rules.

## Usage

Extend the Verifier contract and use the `onlyVerifiedSender()` modifier to restrict calls to the function to compliant
identities. Note that the `sender` of the transaction MUST be an ONCHAINID (probably using `execute`/`approve` flow).
In order to support other types of `sender` (including EOA), call the `verify(address identityAddress)` method instead
of the modifier (note that you may have to add an `identity` parameter to your function, or an identity registry, and
make sure to verify that the `sender` is authorized to use the given identity). 


```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../verifiers/Verifier.sol";

contract VerifierUser is Verifier {
    constructor() Verifier() {}

    function doSomething() onlyVerifiedSender public {}
    
    function doOtherThing(address identity) public {
        if (!verify(identity)) {
            revert("Identity is not verified");
        }
    }
}
```

## Verifier configuration

To update the list of requirements of claim topics and issuers trusted for these topics, use the following methods:

- `addTrustedIssuer`
- `removeTrustedIssuer`
- `addClaimTopic`
- `removeClaimTopic`
- `updateIssuerClaimTopics`

To be compliant, an identity must have at least one valid claim of each required claim topic issued by an issuer
trusted for this topic.

The default version of the `Verifier` contract is `Ownable` and restricts the configuration methods to the owner of the
contract (which is initialized with the deployer).
