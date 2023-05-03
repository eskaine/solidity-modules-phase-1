//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MT") {}

    function mintToken(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function approve(address owner, address spender, uint256 amount) external returns (bool) {
        _approve(owner, spender, amount);
        return true;
    }
}
