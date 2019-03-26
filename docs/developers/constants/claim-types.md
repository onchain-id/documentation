# Claim Types

These are the list of claim types that are standard for InvestorID Identities and some other standards like T-REX.

A JSON description of these types, completed with the parsing method description can be downloaded from the [Github repository](https://github.com/investorid/documentation/blob/master/docs/developers/constants/claim_types.json).

| Claim Type     | Name                  | Description                  | Scheme                          | Data               |
| :------------- | :-------------------- | ---------------------------: | -----------------------------:  | -----------------: |
| 10101000042003 | **FIRST_NAME_CLEAR**  | _First name in clear text._  | [URL_ENCODED](claim-schemes.md) | `firstName=VALUE`  |
| 10101000042004 | **LAST_NAME_CLEAR**   | _Last name in clear text._   | [URL_ENCODED](claim-schemes.md) | `lastName=VALUE`   |
