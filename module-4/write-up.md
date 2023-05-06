# Slither Write-up

## 1. Zero Address Error

A lack of zero address checks might result in an expected burn of cryptocurrency by bad actors whom may seek to manipulate the market
or losing control of a smart contract which may result in failing services.

## 2. Too Many Digits

As working on smart contracts involves very large numbers, a literal representation of these numbers does not provide sufficient clarity
and thus might lead to development issues as developers accidentally misuses the numbers. A shorter, more concise representation
such ethereum units will be a better approach.