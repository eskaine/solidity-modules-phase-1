# Partial Refund
Take what you did in "token sale" and give the users the ability to transfer their tokens to the contract and receive 0.5 ether for every 1000 tokens they transfer. You should accept amounts other than 1,000 Implement a function sellBack(uint256 amount)

- ERC20 tokens don’t have the ability to trigger functions on smart contracts. Users need to give the smart contract approval to withdraw their ERC20 tokens from their balance. See here: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/49c0e4370d0cc50ea6090709e3835a3091e33ee2/contracts/token/ERC20/ERC20.sol#L136
- The smart contract should block the transaction if the smart contract does not have enough ether to pay the user.
- Users can buy and sell as they please, but of course, they lose ether if they keep doing so
- If someone tries to mint tokens when the supply is used up and the contract isn’t holding any tokens, that operation should fail. The maximum supply should remain at 1 million
- IMPORTANT: Be aware of integer division issues!
