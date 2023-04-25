//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    bool private _isSaleAvailable = true;
    uint256 internal constant MAX_SUPPLY = 1000000000000000000000000;
    uint256 internal constant WEI_PER_TOKEN = 1000000000000000;
    uint256 internal constant NFT_TOKEN_COST = 10000000000000000000;

    event tokenPurchased(address buyer, uint256 tokenAmount);
    event tokenSold(address seller, uint256 tokenAmount);

    constructor() ERC20("MyToken", "MT") {}

    function buyToken(address to, uint256 weiAmount) external {
        // buyer needs to pay the minimum price of 1 token
        require(weiAmount >= WEI_PER_TOKEN, "Not enough ether!");

        uint256 currentSupply = totalSupply();
        uint256 amount = (weiAmount / WEI_PER_TOKEN) * (10 ** decimals());

        // revert if tokens are not available for minting
        if ((currentSupply + amount) > MAX_SUPPLY) {
            revert("Tokens not available!");
        }

        // stop minting sales if minted supplies have reached
        if (currentSupply == MAX_SUPPLY) {
            _isSaleAvailable = false;
        }

        // buy from minting
        if (_isSaleAvailable) {
            _mint(to, amount);
        }

        emit tokenPurchased(to, amount);
    }

    function spendAllowance(address from) external {
        uint256 tokenAllowance = allowance(msg.sender, from);
        require(tokenAllowance == NFT_TOKEN_COST, "Token withdrawal not approved!");

        _spendAllowance(msg.sender, from, tokenAllowance);
        _transfer(from, msg.sender, tokenAllowance);
    }

    function approveTokenTransfer(address from) external {
        uint256 fromAmount = balanceOf(from);
        require(fromAmount >= NFT_TOKEN_COST, "Not enough tokens!");

        approve(from, NFT_TOKEN_COST);
    }
}
