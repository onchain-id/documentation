# OnchainID Identities

OnchainID Identities are stored on the Ethereum public BlockChain, in a decentralized way. They can't be hidden nor deleted.
No service or organization can remove your access rights to it, and it spans a lifetime.

Identities are Smart Contract, deployed on the Ethereum Main Network.
Any implementation standard to the ERC734 and ERC735 proposals are supported by the OnchainID standard, and thus with
any service that supports the OnchainID standard.

Yet, an Identity has no value itself. This is the information (claims) attached to it that gives credit to the identity.

These information can be self-attested, and many websites will only use self-attested information such as a username.

Regulated exchanges, however, requires an Identity to be "real" one, linked to an existing person or organization.
Proof of these information are called **Claims**.
They are issued by any **Claim Issuer** that is allowed by the *Identity Owner* to publish claims about the Identity.
For example, a Claim Issuer could emit a claim saying that a given Identity has passed an Identity Check with an ID card and a selfie.

Of course, sensitive information such as the ID card number or the picture itself are not stored on the blockchain publicly.
The Claim Issuer will store the claim **Private Data** on its *off-chain* servers, and will publish publicly *on-chain* a signature.
Therefore, anyone knows that a trusted third party has successfully checked the identity.
But to access the data, one would need the explicit consent of the *Identity Owner* allowing the consultation of the private data.

## What can I do with an OnchainID?

- Log in to compatible websites without any password, using an hardware security key or a plugin (e.g. Metamask).
- Participate in compliant regulated tokenized assets offerings, and exchange security tokens in a decentralized way in full compliance.
