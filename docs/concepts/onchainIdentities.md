---
sidebar_position: 2
---

# Onchain Identities
## What is an  onchain identity 

ONCHAINIDs are stored on the public Ethereum BlockChain, in a decentralized way. They can't be hidden nor deleted. No service or organization can remove your access rights to it.

Identities are smart contracts, deployed on the Ethereum Main Network. Any implementation standard to the ERC734 and ERC735 proposals are supported by the ONCHAINID standard, and thus with any service that supports the ONCHAINID standard too.

Yet, an Identity has no value itself. It is the information (claims) attached to it that gives credit to the identity.

This information can be self-attested, and many websites will only use self-attested information such as a username.

Regulated exchanges, however, requires an Identity to be a "real" one, linked to an existing person or organization. Proof of this information is called a Claim.

They are issued by any Claim Issuer that is allowed by the Identity Owner to publish claims about the Identity.
For example, a Claim Issuer could emit a claim saying that a given Identity has passed an Identity Check with an ID card and a selfie.

Of course, sensitive information such as the ID card number or the picture itself is not stored on the blockchain publicly. The Claim Issuer will store the claim Private Data on its off-chain servers and will publish a signature publicly onchain.

Therefore, anyone knows that a trusted third party has successfully checked the identity. But to access the data, one would need the explicit consent of the *Identity Owner*.

## What features can be built with the ONCHAINID?

- Authentication with compatible websites without any password, using a hardware security key or a plugin (e.g. Metamask).
- Participation in compliant regulated tokenized asset offerings, and security token exchange.

## Basic identity Information

An ONCHAINID Identity has a unique identifier; an address.
Many services can store information about an Identity while keeping this information outside the blockchain.

For instance, the service that deployed the Identity will probably store the name, email address, postal address, country, website, and maybe additional data about the identity.

A service that stores and distributes information about an Identity is called an Information Provider.

Any Service Provider is able to request this data from the Information Provider. It provides the data only if the Service Provider is allowed to access the information. 
The Identity Owner has complete control over what information is shared, and with which services.

Some Information Providers will notify the Identity Owner when an access request is emitted, and some may not.

Accessing information follows the same rules as accessing claims. Refer to the [Sharing Data](https://tokeny-solutions.readme.io/docs/onchain-identities#section-sharing-identity-data) section.

## Identity Claims

Claims can be obtained from several sources:

* Identity Owner (known as "self-attested" claims), 
* Claim Issuers, or anyone the Identity Owner has allowed to add claims to their identity (CLAIM key or above).

They are stored in a ClaimHolder contract (ERC735) owned by an Identity (ERC734) contract.
    
Issued claims can be removed from a Claim Holder by the Identity Owner; who has the ability to remove any claim from anyone the Identity Owner allowed to manage claims on its identity (CLAIM key or above).

> Note that there is no way to verify that the identity is strictly compliant with the standard.

A claim signer may only issue one claim per type, per Identity. It will be stored with a unique identifier composed of the issuer address and the claim type. Issuing a new claim for the same type will override the first instance.

As T-REX intends to support any ERC725/735 compliant Identity, a claim issuer has no certainty that the claim will be added or updated, as the Identity contract implementation could deny the update. The only security is that no one can fake the claim issuer signing key, thus a valid claim can only be issued by an approved claim issuer.

Claims may be related to sensitive data. To respect any related legislation, this data cannot be publicly stored on the blockchain. Storing encrypted data on the blockchain is not recommended.

A Claim issuer should store the data they have checked in a secured off-chain database, and refer to this data. To ensure compliance, a hash of this data should also be stored with the claim added to the Identity. As external data is not accessible from within the blockchain when transactions occur, the claim should be self-explanatory to validate compliance for the given token, without exposing sensitive data.

When the claim is related to data that is part of an exhaustive list of possibilities for example gender, country of residence, age, etc. A hash is not enough to keep the data private as it is possible to find the private data by iterating on a limited list of possibilities, hence, in this case, we should hash a concatenation of this data with other data that is not part of an exhaustive list. Such as last name or the first name of the user.

Some claims are therefore shared between tokens operated by multiple issuers, among others the accreditation status. These are called Generic Claims. They can also be shared between tokens for the same issuer. 

The investor can be approved for token investments for a set of tokens which is referred to as Specific Claims. Specific claims can be customized per token or per issuer.

The issuer can ask for a claim check that will allow them to know that the investor satisfies a set of criteria such as country and occupation. In a list of approved criteria that they have configured with the claim issuer. Generic claims are public statuses that usually have an expiration date.    

To generate a claim, Claim Issuer can ask the Identity Owner for the data they require via a custom user interface or mail exchange.

Some claim issuers allow a user to share their information with other claim issuers' via an OAuth client. This lists the data that will be shared. and is explicitly displayed to the user when access is requested by the application. A claim can be requested by anyone for an Identity.

## Connect with ONCHAINID

An ONCHAINID allows a user to login to a website using their Identity in a similar way to the current available Social Provider authentication offered by Twitter, Facebook, and Google.

When the user attempts to authenticate, the server generates a challenge to be signed using a wallet linked to the Identity.
The server can request access to some Information and claims about the Identity.

The following process explains the authentication flow for the "Connect with Identity" feature.

To summarize, a website requests access to a certain set of information and allows the connection once it has all the access it requires.

The website (or service provider) can request more access, but it requires a new signature from the Identity Owner each time.

An Identity owner can share, with the request service, a list of data related to their Identity. The Identity Owner signs this list, and the service has access to this list only. This may include:

- First and Last Name
- Email
- Phone number (if available)
- Address
- Any claim data stored by the Tokeny Identity Service.

Once the Identity is connected, the Identity Owner will be able to share additional data and or information stored by other Information Providers or Claim issuers.

There are multiple ways to required access to information: 

- Immediate grants; which only allow access once to information.
- Persistent grants; which allow longer-term access until the grant is revoked by the Identity Owner.

Refer to the sharing data section below for more information about access grants.

![diagram1](./images/diagram1.png)

## Sharing Identity data

ONCHAINID gives the Identity Owner the control of his/her Identity. When an Identity Owner decides to share information about the Identity with a third-party service, an explicit signature and access challenge is requested.

This allows Information consumers to request access to identity data such as:

- Basic Information: first name, last name, email, phone, address.
- Claim data (access to a precise claim content) 

By signing an access challenge, the Identity Owner creates an Access Grant for a service, that can be revoked if needed.

> Note that a revocation will not delete the data stored by the service, but will prevent it from access again.

The following sequence diagram illustrates the access grant flow:

![flow1](./images/flow1.png)

## Types of Access grants

There are two types of access grants flow:

Synchronous immediate grant
The user will sign a challenge that the service will use immediately to access the data. The access grant can be used only once. The grant will remain stored.

Asynchronous persistent grant
Service requests access to the data. The identity owner will be notified and will be able to later approve the request. The access grant can be used until it is revoked.

An Access Grant can be requested with a `POST` from the URI of the resource to be shared, with `/access-requests` appended.

For instance, if a claim has to be shared, and its URI is `GET http://api.identity-service.example.com/claims/09724-IiuD73-989bjD8` the access grant request url will be `POST http://api.identity-service.example.com/claims/09724-IiuD73-989bjD8/access-requests`.

The response Location will point toward the URI of the Access Grant request, which can be itself validated by appending `/validations` to the `POST`  request.

In the above example, to validate the access grant request, call `POST http://api.identity-service.example.com/access-grants/8hy67-hu79k-gf76hk/validations`.

Information Providers should support at least one of the following authentication methods for Service Providers:

- API Keys.
- Challenge Signature flow.

Fig 1: Synchronous Immediate grant
![Synchronous Immediate grant](./images/flow2.png)

Fig 2: Asynchronous Persistent Grant
![Asynchronous Persistent Grant](./images/flow3.png)

The confirmation response from the Identity Service returns to the requester service the challenge to be signed.

This means that the service can request the identity owner's signature without having to wait for the notification to be sent to the user.

## Revoking and monitoring Access Grants

Each Information Provider offers a different level of access and grants control. Some might accept only immediate grants.

Some will allow identity owners to see which access grants they emitted, both immediate and persistent, and how they are currently used.

When an Identity Owner revokes an Access Grants, the related service should no longer be able to access the data.