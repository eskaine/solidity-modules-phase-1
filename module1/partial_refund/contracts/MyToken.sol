//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address payable public owner;
    bool private _isSaleAvailable;
    uint256 immutable private _maxSupply;
    uint256 immutable private _tokenPerEther = 1000;
    uint256 immutable private _weiPerToken = 500000000000000;
    uint256 immutable private _weiPerSaleToken = 1000000000000000;

    event tokenPurchased(address buyer, uint256 tokenAmount);
    event tokenSold(address seller, uint256 tokenAmount);

    constructor() ERC20("MyToken", "MT") {
        owner = payable(msg.sender);
        _isSaleAvailable = true;
        // 1 million tokens with 18 decimal
        _maxSupply = 1000000000000000000000000;
    }

    function buyToken() public payable {
        // buyer needs to pay the minimum price of 1 token
        require(msg.value >= _weiPerSaleToken, "Not enough ether!");

        uint256 currentSupply = totalSupply();
        uint256 amount = (msg.value / _weiPerSaleToken) * (10 ** decimals());
        // revert if tokens are not available for minting or purchased from contract
        if((currentSupply + amount) > _maxSupply && amount > balanceOf(owner)) {
            revert("Tokens not available!");
        }

        // stop minting sales if minted supplies have reached
        if(currentSupply == _maxSupply) {
            _isSaleAvailable = false;
        }

        // buy from minting
        if(_isSaleAvailable && (currentSupply + amount) <= _maxSupply) {
            _mint(msg.sender, amount);
        // buy from contract
        } else if(amount <= balanceOf(owner)) {
            approve(owner, amount);
            _spendAllowance(msg.sender, owner, amount);
            _transfer(owner, msg.sender, amount);
        }

        emit tokenPurchased(msg.sender, amount);
    }

    function sellBack(uint256 amount) public {
        require(msg.sender != owner, "Owner cannot sell!");

        address payable seller = payable(msg.sender);
        uint256 amountInDecimals = amount * (10 ** decimals());
        uint256 amountWorthInWei = amount * _weiPerToken;
        uint256 amountBalance = balanceOf(seller);

        if(amountWorthInWei > address(this).balance) {
            revert("Not enough funds!");
        }

        if(amountInDecimals > amountBalance) {
            revert("Not enough balance!");
        }

        approve(owner, amountInDecimals);
        _spendAllowance(msg.sender, owner, amountInDecimals);
        _transfer(msg.sender, owner, amountInDecimals);

        seller.transfer(amountWorthInWei);
        emit tokenSold(seller, amountInDecimals);
    }

    function withdraw(address payable to) public payable {
        require(msg.sender == owner, "Not contract owner!");
        uint256 amount = address(this).balance;
        to.transfer(amount);
    }
}
