//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public immutable owner;
    address public immutable centralizedAuthority;

    mapping(address => bool) private _sanctionedAddresses;

    event AddSanction(address);
    event RemoveSanction(address);

    constructor(address authority) ERC20("MyToken", "MT") {
        require(authority != address(0), "Invalid address");
        owner = msg.sender;
        centralizedAuthority = authority;
    }

    function addSanctionedAddress(address newAddress) public onlyAuthority {
        _sanctionedAddresses[newAddress] = true;
        emit AddSanction(newAddress);
    }

    function removeSanctionedAddress(
        address removedAddress
    ) public onlyAuthority {
        _sanctionedAddresses[removedAddress] = false;
        emit RemoveSanction(removedAddress);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        address from = msg.sender;
        require(
            !_sanctionedAddresses[from] && !_sanctionedAddresses[to],
            "Address sanctioned!"
        );

        _transfer(from, to, amount);
        return true;
    }

    function mint(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Not contract owner!");
        _mint(recipient, amount);
    }

    modifier onlyAuthority() {
        require(msg.sender == centralizedAuthority, "Unauthorized authority!");
        _;
    }
}
