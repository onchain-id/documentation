# Identity Claims

Claims can be obtained from several sources: Identity Owner (so-called "self-attested" claims),
Claim Issuers,  _or technically anyone the Identity Owner allowed to add claims to its identity (CLAIM key or above)._
They are stored in a ClaimHolder contract (ERC735) that is owned by an Identity (ERC734) contract.    
    
Issued claims can be removed from a ClaimHolder by:
the Identity Owner (has the ability to remove ANY claim),
the issuer of the claim to be removed,
 _or technically anyone the Identity Owner allowed to manage claims on its identity (CLAIM key or above)._
 Note that there are NO WAY to verify that the identity is strictly compliant with the standard.    
    
A claim signer may only issue one claim per type per Identity. It will be stored by a unique identifier composed with the issuer address and the claim type. Issuing a new claim for the same type will override the first instance. As T-REX intends to support any ERC725/725 compliant Identity, a claim issuer has NO CERTAINTY that the claim will be added or updated, as the Identity contract implementation could deny the update. The only security is that NO ONE can fake the claim issuer signing key, thus a valid claim can only be issued by an approved claim issuer.    
    
Claims may be related to sensitive data. To respect legislation, these data cannot be publicly stored on the blockchain. Storing encrypted data in the blockchain is not recommended aswell. Claim issuer should store the data they checked in an secured off-chain database, and refer these data in the added claim. To ensure compliance, a hash of these data should also be stored with the claim added to the Identity. As external data is not accessible from within the blockchain when transactions occurs, the claim should be self-explanatory to validate compliance for the given token, without exposing sensitive data. When the claim is related to a data that is part of an exhaustive list of possibilities, i.e. sex, country of residence, age, ... the hash is not enough to keep the data private cause it is pretty easy to find the private data by iterating on a limited list of possibilities, therefore, in this type of case we should hash a concatenation of this data with another data that is not part of an exhaustive list, e.g. the name or the first name of the user.    
    
Some claims are therefore sharable between tokens of multiple issuers (for instance: accreditation status) and are called  **Generic Claims**, or between token for a same issuer (for instance, the fact that the investor is approved for token investment for a set of tokens) and are called  **Specific Claims**. Specific claims can be customized per token or issuer (for instance, the issuer asks for a claim check that will allow him to know that the investor satisfies a set of criteria like country, occupation, in a list of approved ones that he configured with the claim issuer). Generic claims are public statuses, that usually have an expiration date.    
    
To generate a claim, a Claim Issuer can ask the Identity Owner all data it requires through a custom User Interface, mail exchanges, research... Some claim issuer (like Tokeny) allows user to share their information with other claim issuers approved that implements an OAuth client. The list and content of data shared are explicitly displayed to the user when an access is requested by an application. A claim can be requested by anyone for an Identity.

> Note: For Claim attribution, in first iteration, as information will remain in Tokeny's Domain, we won't have to request explicit user consent to use its information. We will also collect all required information in our server before trigger the checks, and the investor will have no direct interation with the Claim Issuer.
