# Configuration

## Identity Providers
By default, unsecured Identity Providers are not allowed. The SDK will refuse to fetch data on these endpoints.
A claim that has an URI which is not an HTTPS endpoint won't be retrieved.

Allow unsecured endpoints with:

```javascript
const IdentitySDK = require('@onchain-id/identity-sdk');
IdentitySDK.config({ allowUnsecuredProviders: true });
``` 
