---
sidebar_position: 7
---

# Claims constants

These are the list of claim topics that are standard for ONCHAINID Identities and some other standards like T-REX.

A JSON description of these topics, completed with the parsing method description can be downloaded from the [Github repository](https://github.com/onchain-id/documentation/blob/master/docs/developers/constants/claim_topics.json).

| Claim Topic     | Name                          | Description                                                                                 | Scheme                            | Data                                                   |
| ------------- | :---------------------------- | ------------------------------------------------------------------------------------------: | --------------------------------: | ------------------------------------------------------ |
| 10101000100000 | **INDIVIDUAL_INVESTOR**       | _Investor is an individual._                                                                | [EMPTY](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)         | `true`                                                 |
| 10101000100001 | **BASIC_IDENTITY**            | _Combination of name, gender and birth date, **hashed**._                                   | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000100002 | **CONTACT_ADDRESS**           | _Combination of residence, email, phone, **hashed**._                                       | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000100003 | **SOVEREIGN_IDENTITY**        | _Combination of ID number, TIN, **hashed**._                                                | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000100004 | **POLITICALLY_EXPOSED**       | _Investor is politically exposed, data is PEP type._                                        | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `elected`                                              |
| 10101000200000 | **INSTITUTIONAL_INVESTOR**    | _Investor is an institution._                                                               | [EMPTY](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)         |                                                        |
| 10101000200001 | **INSTITUTION_INFORMATION**   | _Concatenation of company name and type, **hashed**._                                       | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000200002 | **INSTITUTION_DETAILS**       | _Concatenation of incorporation date, sector and form, **hashed**._                         | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000200008 | **LEGAL_IDENTIFICATION**      | _Concatenation of registration number, VAT, LEI, **hashed**._                               | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 10101000200009 | **INSTITUTIONAL_ROLE**        | _Role of identity owner investor in the institution (if relevant)._                         | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `Some role`                                            |
| 10101000300002 | **COUNTRY**                   | _Country ISO-3 in clear._                                                                   | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `FRA`                                                  |
| 10101000300003 | **AML_STATUS**                | _AML status first, then reason in clear, and details hashed._                               | [URL_ENCODED](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)   | `status=0&reason=Description&hash=0x0999ddefa...34bc`  |
| 10101000300004 | **ETH_WALLETS**               | _List of ETH Wallet address allowed to receive tokens for this identity._                   | [ARRAY of STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes) | `0x0999ddefa34bc,0x0999ddefa34bc,0x0999ddefa34bc`      |
| 10101000300005 | **BANK_ACCOUNTS**             | _List of Bank Accounts data hash (currencies, IBAN, BIC)._                                  | [KEY_PAIRS](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)     | `accountA=0x0999ddefa34bc;accountB=0x0999ddefa34bc`    |
| 10101000300006 | **CRYPTO_ACCOUNTS**           | _List of Crypto Accounts data hash (currency and wallet address)._                          | [KEY_PAIRS](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)     | `accountA=0x0999ddefa34bc;accountB=0x0999ddefa34bc`    |
| 1010101xxxxxxx | **SPECIFIC_KYC_STATUS**       | _Details required by offering for the KYC status, **hashed**._                              | [STRING](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)        | `0x0999ddefa34bc...`                                   |
| 1010102xxxxxxx | **SPECIFIC_ACCREDITATION**    | _Investor is accredited by issuer, or status is irrelevant._                                | [INTEGER](https://docs.tokeny.com/docs/claims-constants#section-claim-schemes)       | `1` for accredited, `2` for irrelevant.                |

These are the list of claim schemes that are standard for ONCHAINID Identities and some other standards like T-REX.

A JSON description of these schemes can be downloaded from the [Github repository](https://github.com/onchain-id/documentation/blob/master/docs/developers/constants/claim_schemes.json).

| Claim Scheme   | Name            | Description                | Example                        |
| :------------- | :-------------- | -------------------------: | -----------------------------: |
| 10101000666002 | **URL_ENCODED** | _URL Encoded string_       | `key_a=VALUE_A&key_b=VALUE_B`  |
| 10101000666003 | **STRING**      | _Clear string_             | `VALUE_A`                      |
| 10101000666004 | **EMPTY**       | _Empty data_               |                                |

These are the standard information types for Identity Providers.

| Information Type | Description                          | Scheme |
| :--------------- | -----------------------------------: | -----: |
| `email`          | _Email_                              | STRING |
| `first_name `      | _First name_                         | STRING |
| `last_name`       | _Last name_                          | STRING |
| `nationality`    | _National (not residential country)_ | STRING |
