# What is Blockchain?

Blockchain is a technology that emerged with the creation of [Bitcoin](https://bitcoin.org/bitcoin.pdf) by Satoshi Nakamoto in 2009. 
The blockchain is the underlying technology allowing Bitcoin to work without any need of a trusted third party and by relying only on the 
protocol. Blockchains use a decentralized peer-to-peer network in order to achieve consensus and byzantine fault tolerance, on Bitcoin and Ethereum -
which are the most used blockchains - this consensus is achieved by proof-of-work which provides a probabilistic solution to the [byzantine 
generals problem](https://en.wikipedia.org/wiki/Byzantine_fault). <br>
The blockchain can be seen as a big ledger, containing all the past transactions and consultable by anyone as it is distributed. These transactions are
contained in "blocks", each block can contain a finite number of transactions and the average time needed to create a new block is fixed
in the implementation level of the blockchain. As each block is linked to the previous one by a cryptographical proof (the block header
containing of a new block contains the hash of the previous block) the transactions that are processed in a block on the blockchain are immutable, this
characteristic is necessary when it comes to the use of this technology for transferring value. 

# The Ethereum Blockchain

The [Ethereum Blockchain](https://github.com/ethereum/wiki/wiki/White-Paper) is an evolution of the Bitcoin blockchain protocol, the 
first release of the protocol was in 2015 and it evolved a lot since then. The intent of Ethereum is to create an alternative protocol 
for building decentralized applications, providing a different set of tradeoffs that are very useful for a large class of 
decentralized applications, with particular emphasis on situations where rapid development time, security for small and rarely used applications, 
and the ability of different applications to very efficiently interact, are important. Ethereum does this by building what is essentially 
the ultimate abstract foundational layer: a blockchain with a built-in Turing-complete programming language, allowing anyone to write smart
contracts and decentralized applications where they can create their own arbitrary rules for ownership, transaction formats and state 
transition functions. Smart contracts, cryptographic "boxes" that contain value and only unlock it if certain 
conditions are met, can also be built on top of the platform, with vastly more power than that offered by Bitcoin scripting because of the 
added powers of Turing-completeness, value-awareness, blockchain-awareness and state.

## The Smart Contracts



## The ERC-20 Token Standard



## The T-REX Token Standard

The main goal of the T-REX standard is to create a set of global tools, fully based on blockchain technologies, to allow frictionless and 
compliant issuance and use of tokenized securities on a peer to peer basis or through marketplaces but in full compliance with regulations 
and issuers requirements, by embedding controls mechanisms in the tokens themselves. With T-REX, we are implementing a “Compliance by 
Design” approach where it is simply impossible for an investor to buy a security without being compliant. The regulator itself can verify 
the compliance of the Issuer through the auditing of the smart contracts that support the Security Token life cycle.

The management of compliant transactions through T-REX backed permission tokens will be based on 3 main pillars creating a decentralized 
Validator: 

- InvestorID, a blockchain based identity management system, allowing the creation of a globally accessible identity for every stakeholder. 
- A set of claims, as described in the [ERC-725](https://github.com/ethereum/EIPs/issues/725) and 
[ERC-735](https://github.com/ethereum/EIPs/issues/735) standards.
- A transfer manager whose role is to act as a filter of all the transactions of tokenized securities and which will check the 
claims of the stakeholders, essentially it will check that the receiver has the rights to receive the tokens following the specific 
compliance rules and issuer requirements applicable for this specific asset. The transfer manager will block the transaction if the 
receiver misses a mandatory claim and will notify him about the reason of the failure. 

These 3 key elements allow issuers to use a decentralized Validator to control transfers and enforce compliance on the holders of the 
security token he has issued. The Validator includes rules for the whole offering (e.g. managing the max number of holders allowed in a 
specific markets, when such rule apply), and rules for each investors (e.g. KYC or issuer-defined eligibility criteria) thanks to the 
identity management system.

## Security of T-REX tokens

Security aspects of a blockchain based solution usually deal with three topics : the blockchain protocol, security of program deployed 
on the blockchain (Smart Contracts), and security of access to the blockchain (mainly key management).

### The Blockchain protocol

As of now, we have chosen the public Ethereum blockchain for the deployment of our tokens. Ethereum. It is the most powerful ethash (Ethash 
is an Ethereum mining Proof-of-Work algorithm. Ethash has been designed to be ASIC-resistant via memory-hardness and easily verifiable.) based 
blockchain, meaning that a 51% attack on this network would be almost impossible, not as smaller ethash blockchains like Ethereum Classic 
who suffered from a 51% attack (51% attack refers to an attack on a blockchain by a group of miners controlling more than 50% of the network's 
mining hashrate, or computing power.) very recently. As both blockchains are based on the same consensus algorithm which is PoW (proof-of-work),
the difference remains in the hashpower of each of them, in respect of which Ethereum (ETH) is far more powerful than Ethereum Classic 
(ETC) (143TH/s for ETH vs 8TH/s for ETC).The electricity cost of a 51% attack on ETC is estimated at $4,635/hour, while an attack on ETH 
would cost $78,250/hour according to [crypto51](https://www.crypto51.app/) at the time of writing. 
Additionally only 5% of the hashpower needed to perform a 51% attack on ETH is nice-hashable
(hashpower easily available for rent) while it stands at 77% for ETC, which means that an attacker would need to have its own mining 
hardware in order to proceed, which drastically increases the price of an attack : as 5% is nice-hashable and the total hashrate is 
143TH/s, an attacker would need to provide 68TH/s of hashpower through his own hardware. As the best hardware option on the market ( [Antminer E3](https://www.antminerdistribution.com/antminer-e3/) ) costs 
approximately $3,9/MH/s, the hardware needed for this attack would cost $265M. It should also be noted that this kind of specialized 
hardware (ASIC) has only one use case : mining ethash, so the total cost of the hardware would be lost in case of a big loss of trust on 
cryptocurrencies, while using this hashpower by following the rules of ETH would be highly profitable for the miner. 
The Ethereum community is aware of the future risks though, coming from quantum computing or big mining consortiums, and is on 
the path of switching the mining consensus method from PoW to PoS (proof-of-stake), first with a mixed consensus PoW+PoS ( [Casper](https://github.com/ethereum/casper) ) 
and then probably 100% PoS. 

### Security related to Smart Contracts

The T-REX smart contracts are designed for issuing and managing security tokens. While a 51% attack would allow double spending and could 
result in the theft of classical tokens by a pseudonymous individual (identifiable by his address on the blockchain, i.e. the address which
took profits from the theft) T-REX tokens are only transferable on addresses linked to an onchain identity based on ERC725 & 735 standards 
and containing all the claims that are necessary for a transaction to proceed. The onchain identities are linked to offchain data held by 
the token issuer and allow him to know exactly who is the owner of each address, in the case of a theft through double spending, the issuer
could sue this person in a court of justice. In addition of this, it is to be noted that a token issuer using the T-Rex solution is 
always in full control of the security tokens he issued, i.e. in case of a theft of security tokens, the token issuer (or, as the case may 
be, the agent that the issuer officially appointed to administer the security) could simply burn the stolen tokens and mint back tokens on 
the victim’s wallets. The tokens issuer also has the possibility to freeze tokens, to be sure that the stolen tokens are not circulating 
anymore.

### Keys management

The private keys unlock access to the funds held in wallets, these keys have to be stored either by the investors or by a custodian, the 
address of a wallet is obtained by hashing (keccak256) the public key derived through ECDSA (Elliptic Curve Digital Signature Algorithm) 
from the private key, which can be any number between 1 and 2^256 -1 in Secp256k1. 
This cryptographic process allowing to get the wallet address from the private key is not reversible, and is unbreakable at the moment, 
The best known algorithms for breaking ECDSA require O(sqrt(n)) operations. That means 2^128 operations would be needed to break an ethereum
account. [The largest ECDSA broken to date was 112-bits long](https://lacal.epfl.ch/articles/112bit_prime/), An Ethereum account is more than 4 billion trillions times harder to break. 
The only potential risk would be quantum computing (which is still a subject of research at the moment). It also means that if the investor
loses access to his wallet, i.e. loses his private key, it won’t be possible to grant him access to the wallet anymore, what the token 
issuer does in this situation is a recovery process for the T-REX tokens held in the lost account by burning them and minting new tokens 
on a new wallet provided by the identity holder, the new wallet has to be linked to the onchain identity (InvestorID) of the investor in order to 
proceed to the recovery and it can only be done after the investor provided all the necessary proofs that he’s the person he pretends to be. 
If a private key theft happens, the token issuer can also initiate the recovery process of the lost funds after freezing the account which 
has been compromised.

### Conclusion about security

As a conclusion, the risks based on the blockchain infrastructure that is used to issue the T-REX tokens are negligible, the cost 
of a 51% attack on the ethereum blockchain is so expensive that it that it makes it very unlikely. Additionally, would such an attack 
happen, mitigating actions/tools exist as the thief could be easily identified (allowing for legal action to be taken against him but also 
to blacklist him on all existing and future T-REX tokens) and, most importantly, the stolen assets could be frozen and then burned to mint 
them back in the victim’s wallets.
