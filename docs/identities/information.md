# Basic Information of Identities

An InvestorID Identity has a unique identifier: its address.
Many services can store information about an Identity, while keeping these information outside the blockchain.

For instance, the service that deployed the Identity will probably store
name, email address, postal address, country, website, and maybe others piece of data about the identity.
A service that stores and diffuse information about an Identity is called an **Information Provider**.

Any **Service Provider** is able to request these information from the *Information Provider*. 
t will respond the data only if the Service Provider is allowed to access the information. 
The Identity Owner has a complete control over what information are shared with which services.

Some Information Provider will notify the Identity Owner when an access request is emitted, some will not.

Accessing an information follow the same rules as accessing claims.
Refer to the [Sharing Data](./grants.md) section.

A list of standard information types can be found in the [Developer Section](../developers/constants/information-types.md). 
