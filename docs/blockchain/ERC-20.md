## The ERC-20 Token Standard

[ERC-20](https://eips.ethereum.org/EIPS/eip-20) is a token standard first proposed by Vitalik Buterin in June 2015. It is a simple interface 
that allows for the creation of tokens on Ethereum that can be re-used by other applications, from wallets to decentralized exchanges. 
It is also the most commonly used standard for Ethereum-based tokens and was the token of choice for many initial coin offerings (ICOs) 
between 2016-2018.

The ERC-20 standard contains 6 key functions that must be implemented to meet the standard. The functions are outlined below:

- **totalSupply()** : Used to get the token supply of a specific ERC-20 token.
- **balanceOf()** : Keeps track of the token balance in each Ethereum wallet.
- **transfer()** : Upon token creation, this function can send all the tokens to one wallet or distribute them to ICO investors.
- **transferFrom()** : Enables token holders to exchange tokens with one another after the initial distribution occurs.
- **approve()** : Used to “approve” other accounts to withdraw a certain amount of tokens from the account calling the function.
- **allowance()** : After approve() is used, allowance() is used to see the amount of tokens the approved account is allowed to withdraw 
from the original account.
<br>
ERC-20 tokens are relatively easy to create – as of June 14, 2019, there are [192,826](https://etherscan.io/tokens) ERC-20 contracts deployed on the Ethereum 
blockchain. Some of the most valuable ERC-20 tokens include Binance Coin (BNB), 0x (ZRX), and OmiseGo (OMG) with market caps of 
$4,6 billions, $191 million, and $297 million, respectively.
