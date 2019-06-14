# What is Blockchain?

Blockchain is a technology that emerged with the creation of [Bitcoin](https://bitcoin.org/bitcoin.pdf) by Satoshi Nakamoto in 2009. 
The blockchain is the underlying technology allowing Bitcoin to work without any need of a trusted third party and by relying only on the 
protocol. Blockchains use a decentralized peer-to-peer network in order to achieve consensus and byzantine fault tolerance, on Bitcoin and Ethereum -
which are the most used blockchains - this consensus is achieved by proof-of-work which provides a probabilistic solution to the [byzantine 
generals problem](https://en.wikipedia.org/wiki/Byzantine_fault). <br>
The blockchain can be seen as a big ledger, containing all the past transactions and consultable by anyone as it is distributed. These transactions are
contained in "blocks", each block can contain a finite number of transactions and the average time needed to create a new block is fixed
in the implementation level of the blockchain. As each block is linked to the previous one by a cryptographical proof (the block header of a new block contains the hash of the previous block) the transactions that are processed in a block on the blockchain are immutable, this
characteristic is necessary when it comes to the use of this technology for transferring value.
