# Module 2 - Staking NFTs

You must create 3 separate smart contracts: an ERC20 token, and ERC721 token, and a third smart contract that can mint new ERC20 tokens and receive ERC721 tokens.

A classic feature of NFTs is being able to receive them to stake tokens.

Create a contract where users can send their NFTs and withdraw 10 ERC20 tokens every 24 hours. The user can withdraw the NFT at any time. The smart contract must take possession of the NFT and only the user should be able to withdraw it. Beware of the corner case of re-staking to bypass the timer.

IMPORTANT: you must be able to transfer the NFT like in the youtube video I recorded above

Hint: to test the contract, use a shorter timeframe. Remix will respect local timestamps. We will discuss actual testing later.

Where people commonly mess up:
- Not verifying the contract on etherscan
- Forgetting decimals in ERC20
- Not properly securing the communication among the three contracts
- Forcing people to withdraw the NFT to get their tokens
