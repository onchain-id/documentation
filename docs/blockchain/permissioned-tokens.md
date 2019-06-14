### Necessity of Permissioned Tokens

All the experts of the sector agree on the point that only permissioned tokens are suitable to issue security tokens because there 
cannot be a total, uncontrolled, freedom of the transaction in such instruments and, investors need to comply with a number of 
criteria- either by regulation or imposed by the issuer himself in order to be eligible for holding the tokens. The main technical 
difference between standard [ERC-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) tokens and T-REX permissioned tokens 
resides in the transfer function of T-REX tokens being made conditional, the condition for a transaction to be executed being that the 
transfer manager approves it according to the governance criteria defined for the the token in question. However, despite this modification
of the transfer function of the token, it is to be highlighted that, because the token structure is based on the ERC-20 standard, it 
remains fully compatible with with it and all the available exchanges and tools based on ERC-20 tokens. 

Most of the “Security token protocols” promoted in the industry so far are permissioned tokens. The transfer function is modified and 
requests a transfer approval from an external validator service to control the transfer of tokens. 
T-REX involves an on-chain identity management system (InvestorID) allowing issuers to control the transfer of ownership directly on-chain.
