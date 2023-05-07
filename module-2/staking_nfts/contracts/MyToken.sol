//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20("MyToken", "MT") {
    uint256 internal constant NFT_TOKEN_COST = 1e19;

    function mint(address to, uint256 amount) external {
        uint256 amountInDecimals = amount * (10 ** decimals());
        _mint(to, amountInDecimals);
    }

    function spendAllowance(address from) external {
        uint256 tokenAllowance = allowance(msg.sender, from);
        require(
            tokenAllowance == NFT_TOKEN_COST,
            "Token withdrawal not approved!"
        );

        _spendAllowance(msg.sender, from, tokenAllowance);
        _transfer(from, msg.sender, tokenAllowance);
    }

    function approveTokenTransfer(address from) public {
        uint256 fromAmount = balanceOf(from);
        require(fromAmount >= NFT_TOKEN_COST, "Not enough tokens!");

        approve(from, NFT_TOKEN_COST);
    }
}
