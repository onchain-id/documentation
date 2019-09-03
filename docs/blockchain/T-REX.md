# The T-REX Token Standard

The main goal of the T-REX standard is to create a set of global tools, fully based on blockchain technologies, to allow frictionless and 
compliant issuance and use of tokenized securities on a peer to peer basis or through marketplaces but in full compliance with regulations 
and issuers requirements, by embedding controls mechanisms in the tokens themselves. With T-REX, we are implementing a “Compliance by 
Design” approach where it is simply impossible for an investor to buy a security without being compliant. The regulator itself can verify 
the compliance of the Issuer through the auditing of the smart contracts that support the Security Token life cycle.

The management of compliant transactions through T-REX backed permission tokens will be based on 3 main pillars creating a decentralized 
Validator: 

- OnchainID, a blockchain based identity management system, allowing the creation of a globally accessible identity for every stakeholder. 
- A set of claims, as described in the [ERC-734](https://github.com/ethereum/EIPs/issues/734) and 
[ERC-735](https://github.com/ethereum/EIPs/issues/735) standards.
- A transfer manager whose role is to act as a filter of all the transactions of tokenized securities and which will check the 
claims of the stakeholders, essentially it will check that the receiver has the rights to receive the tokens following the specific 
compliance rules and issuer requirements applicable for this specific asset. The transfer manager will block the transaction if the 
receiver misses a mandatory claim and will notify him about the reason of the failure. 

These 3 key elements allow issuers to use a decentralized Validator to control transfers and enforce compliance on the holders of the 
security token he has issued. The Validator includes rules for the whole offering (e.g. managing the max number of holders allowed in a 
specific markets, when such rule apply), and rules for each investors (e.g. KYC or issuer-defined eligibility criteria) thanks to the 
identity management system.
