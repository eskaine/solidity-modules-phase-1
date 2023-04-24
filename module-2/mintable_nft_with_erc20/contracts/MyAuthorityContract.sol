// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MyNftContract.sol";
import "./MyToken.sol";

contract MyNftContract {
    address public owner;
    MyNftContract public myNftContract;
    MyToken public myToken;

    constructor() {
        owner = msg.sender;
        myNftContract = MyNftContract(msg.sender);
        myToken = MyToken(msg.sender);
    }
}
