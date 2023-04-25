// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MyNftContract.sol";
import "./MyToken.sol";

contract MyAuthorityContract {
    address public owner;
    address private _myToken;
    address private _myNftContract;

    constructor(address myTokenAddress, address myNftContractAddress) {
        owner = msg.sender;
        _myToken = myTokenAddress;
        _myNftContract = myNftContractAddress;
    }

    function mintToken() external payable notOwner {
        (bool success) = _myToken.delegatecall(
            abi.encodeWithSelector(MyToken.buyToken.selector)
        );

        require(success, "Token minting failed!");
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
