// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MyNftContract.sol";
import "./MyToken.sol";

contract MyAuthorityContract {
    address public owner;
    MyToken private _myToken;
    MyNftContract private _myNftContract;

    constructor(address myTokenAddress, address myNftContractAddress) {
        owner = msg.sender;
        _myToken = MyToken(myTokenAddress);
        _myNftContract = MyNftContract(myNftContractAddress);
    }

    function mintToken() external payable notOwner {
        _myToken.buyToken(msg.sender, msg.value);
    }

    function mintNft() external payable notOwner {
        bool isAllowanceSpend = _myToken.spendAllowance(msg.sender);

        //mint nft if allowance is spend successfully
    }

    // pre nft minting, token transfer approval
    function approveTokenTransfer() external notOwner {
        _myToken.approveTokenTransfer(msg.sender);
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
