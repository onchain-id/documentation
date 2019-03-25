# The Identity SDK

This package facilitates the interaction with Identities stored in the BlockChain.

# Forewords

> It is recommended you read the [Identities](../../../identities/introduction.md) section before continuing further.

The JS Identity SDK targets server-side environments with a NodeJS Runtime.
It is intended to work in-browser with web3 provider as well, but it was not built yet.

It is intended to support any identity compliant with the [ERC734](https://github.com/ethereum/eips/issues/734) and [ERC735](https://github.com/ethereum/EIPs/issues/735) standards (which are still in draft state). It will work especially well with the [contract implementations of the T-REX standard](https://github.com/TokenySolutions/T-REX).

# Functionality

- Deploy identities
- List keys on an Identity.
- Manage keys on an Identity (if allowed).
- List Claims on an Identity.
- Manage Claims on an Identity (if allowed).
- Issue claims for an Identity (if allowed).
- Verify a claim (check validity).
- Fetch claim data using their URI.
- Request access to claim private data using their URI.
- Use access grants to access private data of claims.
