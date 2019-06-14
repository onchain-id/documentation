## The ERC-20 Token Standard

[ERC-20](https://eips.ethereum.org/EIPS/eip-20) is a token standard first proposed by Vitalik Buterin in June 2015. It is a simple interface 
that allows for the creation of tokens on Ethereum that can be re-used by other applications, from wallets to decentralized exchanges. 
It is also the most commonly used standard for Ethereum-based tokens and was the token of choice for many initial coin offerings (ICOs) 
between 2016-2018.

The standard ERC-20 is a list of rules that an Ethereum token has to implement, giving developers the ability to program how new tokens will function within the Ethereum ecosystem. The ERC-20 token standard became popular with crowdfunding companies working on initial coin offering (ICO) cases due to the simplicity of deployment, together with its potential for interoperability with other Ethereum token standards. ERC-20 tokens are fungible, which means that there is no way to make the difference between 1 token and another belonging to the same token smart contract.
The ERC-20 standard dominates the Ethereum ecosystem. It mainly consists in six functions:

**Allowance** : The `Allowance` function allows for two address to create repeated unidirectional transfer; a wallet address tokenOwner & a second wallet spender are the defined as the two wallets that will engage in repeated transactions. Specifically, the wallet spender will withdraw some amount from the wallet tokenOwner at some interval – both of these are variables that’ll be determined later on.

**Approve**: For the `Approve` function, refer back to our `Allowance` function: the function allows for two addresses to repeatedly withdraw unidirectionally. The `Approve` function, aptly named, is a simple standard function that calls for the wallet owner to “approve” a transaction that’s about to made on his/her behalf in context of an `Allowance`. This function requires two inputs, the address of the spender & the amount of tokens being sent. The output returns a public boolean that dictates whether approval was provided or rejected.

**BalanceOf**: `BalanceOf` is an intuitive function that accepts a single address input parameter (address tokenOwner) & returns a single public constant (uint balance). The returned uint constant, balance, represents the amount of tokens the queried address holds — remember, transactions on a blockchain are usually public, Ethereum is no different.

**TotalSupply**: The `totalSupply` function is an anonymous constructor function that’s ran only once in the very first moment of deployment to the live Ethereum network. The function returns a public constant `totalSupply` unassigned integer (uint) that acts as that tokens total supply for the remainder of the contracts life. This `totalSupply` constant is usually defined one of two ways: hardcoding a variable or funding from an origin wallet.

**Transfer**: The `Transfer` function is the core function of any ERC20 token; it defines & implements direct wallet-owner-to-peer token transferring. Since wallet owners make this call, only two parameters are required: the receiver address & the amount of tokens being sent. These two parameters are usually initialized as (address to) & (uint tokens). The `Transfer` return value is simply a boolean that confirms whether the receiver (the “to” address) received the tokens sent.

**TransferFrom**: The `TransferFrom` function allows for a smart contract to execute a transfer with the parameters passed on behalf of the wallet owner. Carefully make the distinction with the previous `Transfer` function. The previous function allowed for the wallet owner to directly send tokens to an address; this `TransferFrom` allows for a smart contract to send tokens on the wallet owners’ behalf, such as filling an order on an exchange, releasing funds in a timely manner, or paying our winnings in an game of luck.

The `TransferFrom` function has three input parameters, the address of the wallet owner, the address of the receiver wallet, & the amount of tokens sent. They’re often initialized in in the following syntax: (address from, address to, uint tokens). The function output is exactly the same as the Transfer output: a single public boolean that details the success or failure of the transaction.

<br>
<br>

ERC-20 tokens are relatively easy to create – as of June 14, 2019, there are [192,826](https://etherscan.io/tokens) ERC-20 contracts deployed on the Ethereum 
blockchain. Some of the most valuable ERC-20 tokens include Binance Coin (BNB), 0x (ZRX), and OmiseGo (OMG) with market caps of 
$4,6 billions, $191 million, and $297 million, respectively.


