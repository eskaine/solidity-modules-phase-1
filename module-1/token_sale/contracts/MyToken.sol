//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address payable public owner;
    bool private _isSaleAvailable;
    uint256 immutable private _maxSupply;
    uint256 immutable private _tokenPerEther = 1000;

    event tokenPurchased(address);

    constructor() ERC20("MyToken", "MT") {
        owner = payable(msg.sender);
        _isSaleAvailable = true;
        // 1 million tokens with 18 decimal
        _maxSupply = 1000000000000000000000000;
    }

    function buyToken() public payable {
        require(_isSaleAvailable, "Token sales closed!");
        require(msg.value == 1 ether, "Not enough ether!");

        uint256 currentSupply = totalSupply();
        if(currentSupply == _maxSupply) {
            _isSaleAvailable = false;
        }

        // tokens are set according to ether decimal places
        uint256 amount = _tokenPerEther * (10 ** decimals());
        _mint(msg.sender, amount);

        emit tokenPurchased(msg.sender);
    }

    function withdraw(address payable to) public payable {
        require(msg.sender == owner, "Not contract owner!");
        require(totalSupply() == 0, "Tokens are still in circulation!");
        uint256 amount = address(this).balance;
        to.transfer(amount);
    }
}
