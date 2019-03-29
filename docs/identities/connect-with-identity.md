# Connect with investorID

An InvestorID allows to login to a website using your Identity as it is possible with Social Providers.

When an user attempt to login, the server generates a challenge to be signed using a wallet linked to the Identity.
The server has the possibility to request access to some Information and Claims about the Identity.

The following process explains the authentication flow for **Connect with Identity**.
To summarize, a website requests access to certain set of information, and allows the connection once it has all the access it requires.
The website (or service provider) will be able to request more access, but these will required each time a new signature from the Identity Owner.

An Identity Owner using its Identity to connect to a service will be able to share, on the request of the service, some of the data related to the Identity. The list will be signed by the Identity Owner and the service will not have access to more data. This may include:

- First and Last Name
- Email
- Phone number (if available)
- Address
- Any claim data stored by the Tokeny Identity Service.

Once the Identity is connected, the Identity Owner will be able to share additional data such as:

- Other claim data or information stored by other Information Providers or Claim issuers.

There are multiple ways to required access to information: **immediate grant**, which only allow access once to information,
and **persistent grants**, which allows longer-term access until the grant is revoked by the Identity Owner.
Refer to the [Sharing data](grants.md) section for more information about access grants.

```mermaid
graph TD
  A(Arrival on SignIn) -->|clicks on 'Connect with InvestorID'| B
  B(Load Identity)
  B --> C{Attempt to detect provider}
  C -->|Detected| D(Ask for confirmation)
  C -->|Not detected| E(Display provider selection)
  D --> |confirms provider|F
  E --> |selects provider|F
  F(Display terms & conditions + requested information/claims)
  F --> |Approves T&C|G
  G(Request information access to provider)
  G --> H
  H{Identity found by provider}
  H --> |NO|I(Display Identity Not Found Error)
  H --> |YES + challenge|J
  J(Display challenge to be signed)
  J --> |User signs challenge|K
  K(Validate access request with provider by sending signature)
  K --> |Provider rejects the signed challenge|L(display error message)
  K --> |Provider validates signed challenge|M
  M(Use access grants to obtain an access token)
  M --> N(Use generated access token to retrieve information)
  N --> O(User logged in, and server has access to required information data)
```
