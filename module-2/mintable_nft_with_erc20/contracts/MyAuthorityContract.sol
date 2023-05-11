// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./MyNftContract.sol";
import "./MyToken.sol";

contract MyAuthorityContract {
    address public immutable owner;
    MyToken private immutable _myToken;
    MyNftContract private immutable _myNftContract;
    uint256 public constant BASE_TOKEN_AMOUNT = 1e19;
    uint256 public constant NFT_TOKEN_COST = 1e19;

    constructor(address myTokenAddress, address myNftContractAddress) {
        owner = msg.sender;
        _myToken = MyToken(myTokenAddress);
        _myNftContract = MyNftContract(myNftContractAddress);
    }

    function mintToken() external notOwner {
        _myToken.mintToken(msg.sender, BASE_TOKEN_AMOUNT);
    }

    function mintNft() external notOwner {
        uint256 tokenAllowance = _myToken.allowance(msg.sender, address(this));
        require(
            tokenAllowance == NFT_TOKEN_COST,
            "Token withdrawal not approved!"
        );

        bool isTransfer = _myToken.transferFrom(msg.sender, address(this), tokenAllowance);
        if(isTransfer) {
            _myNftContract.mint(msg.sender);
        }
    }

    // pre nft minting, token transfer approval
    function approveTokenTransfer() external notOwner {
        uint256 fromAmount = _myToken.balanceOf(msg.sender);
        require(fromAmount >= NFT_TOKEN_COST, "Not enough tokens!");

        _myToken.approve(msg.sender, address(this), NFT_TOKEN_COST);
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
