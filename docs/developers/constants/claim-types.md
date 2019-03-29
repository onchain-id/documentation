# Claim Types

These are the list of claim types that are standard for InvestorID Identities and some other standards like T-REX.

A JSON description of these types, completed with the parsing method description can be downloaded from the [Github repository](https://github.com/investorid/documentation/blob/master/docs/developers/constants/claim_types.json).

| Claim Type     | Name                          | Description                                                          | Scheme                          | Data                                                   |
| :------------- | :---------------------------- | -------------------------------------------------------------------: | -----------------------------:  | -----------------------------------------------------: |
| 10101000042003 | **FIRST_NAME_CLEAR**          | _First name in clear text._                                          | [URL_ENCODED](claim-schemes.md) | `firstName=VALUE`                                      |
| 10101000042004 | **LAST_NAME_CLEAR**           | _Last name in clear text._                                           | [URL_ENCODED](claim-schemes.md) | `lastName=VALUE`                                       |
| 10101000100000 | **INDIVIDUAL_INVESTOR**       | _Investor is an individual._                                         | [EMPTY](claim-schemes.md)       | `true`                                                 |
| 10101000100001 | **BASIC_IDENTITY**            | _Combination of name, gender and birth date, **hashed**._            | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000100002 | **CONTACT_ADDRESS**           | _Combination of residence, email, phone, **hashed**._                | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000100003 | **SOVEREIGN_IDENTITY**        | _Combination of ID number, TIN, **hashed**._                         | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000100004 | **POLITICALLY_EXPOSED**       | _Investor is politically exposed, data is PEP type._                 | [STRING](claim-schemes.md)      | `elected`                                              |
| 10101000200005 | **INSTITUTIONAL_INVESTOR**    | _Investor is an institution._                                        | [EMPTY](claim-schemes.md)       |                                                        |
| 10101000200006 | **INSTITUTION_INFORMATION**   | _Concatenation of company name and type, **hashed**._                | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000200007 | **INSTITUTION_DETAILS**       | _Concatenation of incorporation date, sector and form, **hashed**._  | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000200008 | **LEGAL_IDENTIFICATION**      | _Concatenation of registration number, VAT, LEI, **hashed**._        | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 10101000200005 | **INSTITUTIONAL_INVESTOR**    | _Investor is an institution._                                        | [EMPTY](claim-schemes.md)       |                                                        |
| 10101000300002 | **COUNTRY**                   | _Country ISO-3 in clear._                                            | [STRING](claim-schemes.md)      | `FRA`                                                  |
| 10101000300001 | **AML_STATUS**                | _AML status first, then reason in clear, and details hashed._        | [URL_ENCODED](claim-schemes.md) | `status=0&reason=Description&hash=0x0999ddefa...34bc`  |
| 1010101xxxxxxx | **SPECIFIC_KYC_STATUS**       | _Details required by offering for the KYC status, **hashed**._       | [STRING](claim-schemes.md)      | `0x0999ddefa34bc...`                                   |
| 1010102xxxxxxx | **SPECIFIC_ACCREDITATION**    | _Investor is accredited by issuer, or status is irrelevant._         | [INTEGER](claim-schemes.md)     | `1` for accredited, `2` for irrelevant.                |
