// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MyNftContract.sol";
import "./MyToken.sol";

contract MyAuthorityContract {
    address public owner;
    MyToken private _myToken;
    MyNftContract private _myNftContract;
    uint256 public constant BASE_TOKEN_AMOUNT = 10000000000000000000;
    uint256 public constant NFT_TOKEN_COST = 10000000000000000000;

    constructor(address myTokenAddress, address myNftContractAddress) {
        owner = msg.sender;
        _myToken = MyToken(myTokenAddress);
        _myNftContract = MyNftContract(myNftContractAddress);
    }

    function mintToken() external notOwner {
        _myToken.mintToken(msg.sender, BASE_TOKEN_AMOUNT);
    }

    function mintNft() external notOwner {
        uint256 tokenAllowance = _myToken.allowance(address(this), msg.sender);
        require(tokenAllowance == NFT_TOKEN_COST, "Token withdrawal not approved!");

        _myToken.spendAllowance(msg.sender, tokenAllowance);
        _myNftContract.mint(msg.sender);
    }

    // pre nft minting, token transfer approval
    function approveTokenTransfer() external notOwner {
        uint256 fromAmount = _myToken.balanceOf(msg.sender);
        require(fromAmount >= NFT_TOKEN_COST, "Not enough tokens!");

        _myToken.approve(msg.sender, NFT_TOKEN_COST);
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
