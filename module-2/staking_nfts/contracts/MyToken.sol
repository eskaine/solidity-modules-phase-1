//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 internal constant NFT_TOKEN_COST = 10000000000000000000;

    event tokenMinted(address buyer, uint256 tokenAmount);
    event tokenSold(address seller, uint256 tokenAmount);

    constructor() ERC20("MyToken", "MT") {}

    function mint(address to, uint256 amount) external {
        uint256 amountInDecimals = amount * (10 ** decimals());
        _mint(to, amountInDecimals);
    }

    function spendAllowance(address from) external {
        uint256 tokenAllowance = allowance(msg.sender, from);
        require(tokenAllowance == NFT_TOKEN_COST, "Token withdrawal not approved!");

        _spendAllowance(msg.sender, from, tokenAllowance);
        _transfer(from, msg.sender, tokenAllowance);
    }

    function approveTokenTransfer(address from) public {
        uint256 fromAmount = balanceOf(from);
        require(fromAmount >= NFT_TOKEN_COST, "Not enough tokens!");

        approve(from, NFT_TOKEN_COST);
    }
}
