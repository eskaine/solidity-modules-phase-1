//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameCollection is ERC1155 {
    address public owner;
    string private _uri = 'https://esk-erc1155.infura-ipfs.io/ipfs/Qma7FEp5pG3my56RyAjsVjEBs6QAaXXEStusydhxkJmiGR/metadata/';
    uint256[] public ITEM_COLLECTION = [0, 1, 2, 3, 4, 5, 6];

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    // to get all items for a single address
    function getPlayerAllItems(address[] calldata addresses) external view notOwner returns(uint256[] memory) {
        for (uint i=0; i<addresses.length; i++) {
            if(addresses[i] != msg.sender) {
                // prevents user from fetching data of other users
                revert("Invalid addresses!");
            }
        }

        uint256[] memory items = balanceOfBatch(addresses, ITEM_COLLECTION);
        return items;
    }

    function burnBatch(address from, uint256[] calldata ids, uint256[] calldata amount) external notOwner {
        _burnBatch(from, ids, amount);
    }

    function mint(address from, uint256 id, uint256 amount) external notOwner {
        _mint(from, id, amount, "");
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(_uri, Strings.toString(id), '.json'));
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
