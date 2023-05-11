# Write-up

## Slither

### 1. Zero Address Error

A lack of zero address checks might result in an expected burn of cryptocurrency by bad actors whom may seek to manipulate the market
or losing control of a smart contract which may result in failing services.

### 2. Too Many Digits

As working on smart contracts involves very large numbers, a literal representation of these numbers does not provide sufficient clarity
and thus might lead to development issues as developers accidentally misuses the numbers. A shorter, more concise representation
such ethereum units will be a better approach.

## Ethernaut Level 3 Takeaway

The key takeaway here with Ethernaut level 3 is that developers need to put more thought into coming up with business logic which cannot be easily reverse-engineered outside of the smart contract.

The flip logic relies on past blockhash which is readily accessible, thereby making the guess
predictable.
