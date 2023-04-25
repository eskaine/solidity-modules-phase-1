//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    bool private _isSaleAvailable = true;
    uint256 public constant MAX_SUPPLY = 1000000000000000000000000;
    uint256 public constant WEI_PER_TOKEN = 500000000000000;
    uint256 public constant WEI_PER_SALE_TOKEN = 1000000000000000;

    event tokenPurchased(address buyer, uint256 tokenAmount);
    event tokenSold(address seller, uint256 tokenAmount);

    constructor() ERC20("MyToken", "MT") {}

    function buyToken() public payable {
        // buyer needs to pay the minimum price of 1 token
        require(msg.value >= WEI_PER_SALE_TOKEN, "Not enough ether!");

        uint256 currentSupply = totalSupply();
        uint256 amount = (msg.value / WEI_PER_SALE_TOKEN) * (10 ** decimals());
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
            _mint(msg.sender, amount);
        }

        emit tokenPurchased(msg.sender, amount);
    }

    function sellBack(uint256 amount) public {
        address payable seller = payable(msg.sender);
        uint256 amountInDecimals = amount * (10 ** decimals());
        uint256 amountWorthInWei = amount * WEI_PER_TOKEN;
        uint256 amountBalance = balanceOf(seller);

        if (amountWorthInWei > address(this).balance) {
            revert("Not enough funds!");
        }

        if (amountInDecimals > amountBalance) {
            revert("Not enough balance!");
        }

        _burn(msg.sender, amountInDecimals);
        if (totalSupply() < MAX_SUPPLY) {
            _isSaleAvailable = true;
        }

        seller.transfer(amountWorthInWei);
        emit tokenSold(seller, amountInDecimals);
    }

    function withdraw(address payable to) public payable {
        require(totalSupply() == 0, "Tokens are still in circulation!");
        uint256 amount = address(this).balance;
        to.transfer(amount);
    }
}
