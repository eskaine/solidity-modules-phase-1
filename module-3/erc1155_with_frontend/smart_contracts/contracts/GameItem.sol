//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItem is ERC1155 {
    uint256[] public ITEM_COLLECTION = [0, 1, 2, 3, 4, 5, 6];
    string public constant IPFS_API = 
        'https://esk-erc1155.infura-ipfs.io/ipfs/QmVA6bTu8yZHji9TkoRqWF3wpihpF7DoZ9zshDJD8PgS3J/metadata/{id}.json';

    event GetPlayerAllItems(address _from,  uint256[] _items);

    constructor() ERC1155(IPFS_API) {}

    // to get all items for a single address
    function getPlayerAllItems() external view returns(uint256[] memory) {
        // addresses are generated here to prevent user from fetching data of other users
        uint256 length = ITEM_COLLECTION.length;
        address[] memory addresses = new address[](length);

        for (uint i=0; i<length; i++) {
            addresses[i] = msg.sender;
        }

        uint256[] memory items = balanceOfBatch(addresses, ITEM_COLLECTION);
        return items;
        // emit GetPlayerAllItems(msg.sender, items);
    }
}
