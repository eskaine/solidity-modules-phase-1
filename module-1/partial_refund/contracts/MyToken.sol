//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MyToken is ERC20 {
    address payable public immutable owner;
    uint256 public constant MAX_SUPPLY = 1e22;
    uint256 public constant WEI_PER_TOKEN = 1e18;
    uint256 public constant WEI_PER_SALE_TOKEN = 5e17;

    event TokenPurchased(address buyer, uint256 tokenAmount);
    event TokenSold(address seller, uint256 tokenAmount);

    constructor() ERC20("MyToken", "MT") {
        owner = payable(msg.sender);
    }

    function buyToken() public payable notOwner {
        // buyer needs to pay the minimum price of 1 token
        require(msg.value >= WEI_PER_SALE_TOKEN, "Not enough ether!");

        uint256 currentSupply = totalSupply();
        uint256 amount = (10 ** decimals()) * (msg.value / WEI_PER_SALE_TOKEN);

        // revert if tokens are not available for minting
        if ((currentSupply + amount) > MAX_SUPPLY) {
            revert("Tokens not available!");
        }

        _mint(msg.sender, amount);
        emit TokenPurchased(msg.sender, amount);
    }

    function sellBack(uint256 amount) public notOwner {
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

        emit TokenSold(seller, amountInDecimals);
        seller.transfer(amountWorthInWei);
    }

    function withdraw(address payable to) public payable {
        require(to != address(0), "Invalid address!");
        require(msg.sender == owner, "Not contract owner!");
        require(totalSupply() == 0, "Tokens are still in circulation!");
        uint256 amount = address(this).balance;
        to.transfer(amount);
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
