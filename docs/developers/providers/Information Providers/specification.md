# Specification for Information Providers

An Information Provider exposes the following endpoints:

| Route | Description | Authentication | Returns |
| ----- | ----------: | -------------: | ------: |
| `GET _/identities/{identityID}/information?types=typeA&types=typeB` | Get information whose types are specified in the `types` query parameter. | JWT token in `Authorization: Bearer <token>` header | Array of information. |
| `POST _/identities/{identityID}/information/access_requests` | Request access whose types are specified in the `information_types` body parameter. | JWT token in `Authorization: Bearer <token>` header | The access request challenge (with random string inside). |
| `POST _/access-grants/{accessGrantId}/validation` | Validate an access grant create when making an access_request with a `signature` in body. | None | The validation response (and access token for `IMMEDIATE` access). |

## Request access to information

Information are identified by their `type`. An identity can only have one information per type and per provider.
