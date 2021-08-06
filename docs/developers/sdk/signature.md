---
sidebar_position: 6
title: Signing claims or messages
---

# Signer Module
Signing a claim requires a Signer Module.

A SignerModule must expose a `.getPublicKey()` and a `.signMessage(message: string)` functions.

This is, for instance, a valid SignerModule:

```javascript
const jsrasign = require('jsrasign');

const signer = new SignerModule({
    getPublicKey: async () => ({
        key: "-----BEGIN CERTIFICATE----- my_super_public_key -----END CERTIFICATE-----",
        type: "X.509",
        signingMethod: "SHA-256",
    }),
    signMessage: async (message) => {
        const signer = new jsrsasign.Signature({ alg: 'SHA256withRSA' });
        signer.init("-----BEGIN CERTIFICATE----- my_super_PRIVATE_no_really_super_secret_PRIVATE_key -----END CERTIFICATE-----");
        signer.updateString(message);
        return signer.sign();
    },
});
```

As a convenient method, a SignerModule can also be created from an ethers Wallet:

```javascript
const wallet = new IdentitySDK.Providers.Wallet('PRIVATE_KEY', provider);
const signer = new IdentitySDK.SignerModule(wallet);
```

It can be used in functions such as `Claim.requestAccess()`:

```javascript
claim.requestAccess(IdentitySDK.utils.enums.AccessGrantType.PERSISTENT, signer);
```

# test

azdazd
