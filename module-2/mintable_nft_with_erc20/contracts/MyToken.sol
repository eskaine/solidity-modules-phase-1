//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MT") {}

    function mintToken(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function spendAllowance(address from, uint256 allowance) external {
        _spendAllowance(msg.sender, from, allowance);
        _transfer(from, msg.sender, allowance);
    }
}
