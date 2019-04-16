# Specifications

## Claims

A Claim is composed of the following values:
- **id:** Unique identified of the claim, it has to be unique for the claim issuer service only, but is exposed in the uri published on blockchain.
- **data:** The hex-encoded string of the claim data published on blockchain.
- **emissionDate:** The date on the claim issuer declared the claim as complete and emitted.
- **issuanceDate:** The date on the claim was successfully issued to the blockchain.
- **hash:** A hex string of the keccak256 hash of identity address, claim type and claim data.
- **identityAddress:** The address of the identity contract targeted (an identity can only have one claim of each type).
- **issuerAddress:** The address of the claim issuer contract issuing the claim.
- **issuanceTransaction:** The transaction hash of the claim issuance, this allows to consult the transaction for verification.
- **privateData:** The JSON containing the private data of the claim.
- **publicData:** The JSON containing the public data of the claim.
- **scheme:** An integer that describe the claim data (cf [claim schemes](../../constants/claim-schemes.md)).
- **type:** An integer that describe the claim  (cf [claim schemes](../../constants/claim-types.md)).
- **signingKey:** The public key linked to the key that will sign the claim.
- **signature:** The has string of the hash prefixed by Ethereum Signed Message (cf ETH specifications) and signed by the private key pair of signing key.
- **status:** The claim status, claim can be EXPECTED (not yet issued), READY (ready to be published, but issuance not triggered yet), PENDING (currently issuing on blockchain), ISSUED (published to blockchain), CANCELLED (issuance cancelled), REVOKED (claim no longer valid).
- **uri:** The URI of the claim, on which the claim issuer allows for access requests and consultation.

These fields can be named internally differently, but they must be exposed with these names to other services.
