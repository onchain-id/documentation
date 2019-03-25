### SignerModule

Many interaction with identities, and especially accessing claims, require to sign a challenge message.
Functions requiring these signatures expect a SignerModule as argument.

A SignerModule must expose a `.getPublicKey()` and a `.signMessage(message: string)` functions.

This, for instance, id a valid simple SignerModule:

```javascript
const jsrasign = require('jsrasign');

const signer = {
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
};
```

It can be used in functions such as Claim.requestAccess():

```javascript
claim.requestAccess(IdentitySDK.utils.enums.AccessGrantType.PERSISTENT, signer);
``` 
