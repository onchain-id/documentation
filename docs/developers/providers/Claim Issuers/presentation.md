# Introduction to Claim Issuers

A Claim Issuer is a service provider that has the technical ability to emit or validate information about an Identity.
 _For instance, Tax offices can validate/emit the tax number of a person using their identity data._
 They may require payment in exchange of the checks.  
  
Claims can be generic
_(ID number, tax number, identity check, accreditation status)_
or specific to a configuration
_(is the identity owner conform to a set of criteria? Is it arbitrary approved by an issuer?)_.  
  
Claims usually hold private sensitive data, and these data MUST NOT be accessible publicly.
These data should be referenced in the blockchain claim with a hash and unique identifier
and URI that allows anyone to access the claim data, provided that the request emitter has the right to access them.
As the User is the owner of the data, he/she should be the only one to manage the access rights to these data.
Other services may request access from him/her.  

To be a Claim issuer, a service must be able to generate (or use) one or several private keys that will be used to
sign the claim issued, and must implement a service to emit transactions on the Identity contract to add
claims. This is the bare minimum. There are some **Claim Issuer SDK** which handle the blockchain part after being
configured to use the Claim Issuer wallet key and its private claim signing key.  
  
Usually, a Claim Issuer awaits an order before emitting a claim, and will probably ask for payment in exchange.
You will certainly have to build an API to receive these orders, but you could also manage these via non-automated
media like email, phone calls, or whatever you want.
If you build an API, this will allow Service Providers and Tokenization Platforms to
trigger the checks at an appropriate time.  
  
You may also want to notify Identity owner, Token Issuer or Information Provider that you issued a claim.
These will usually scan blockchain to detect them, but sending them a notification is appreciated.
Most SDK implements standard methods to call these services.  
  
Sometimes, claims needs to hold data that cannot be put on the blockchain.
The Claim issuer needs to store these private claim data somewhere (digital or not).
Some Information Providers allows Claim Issuer to store claim data in their databases.
The SDK implements methods to store and retrieve these.
You must have the explicit consent of the user to share the data with an Information Provider
or another service such as a Token Issuer.
Some Information Providers handle the access rights management
_(checking rights, allow the user to manage these rights, ...)_.  
  
To issue a claim, a Claim Issuer usually has to ask information about the user.
It can ask the user for these information.
But a user doesn't want to send the same data and fill the same forms each time he wants a claim.
Therefore, they may use an Information Provider to keep their information in a single place.
Other services may then request these data from the Information Provider, with the explicit consent of the user.
Most SDK provides all methods required to request and access these information.

---

## Summary

Whatever types of claims the service will issue, it must implement the following features:

- Ability to publish a claim on the Blockchain.
- Manage a Claim Registry on the Blockchain (optional).
- Manage access grants to data of a claim.
