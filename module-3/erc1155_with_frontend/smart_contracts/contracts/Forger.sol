//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./GameCollection.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Forger {
    address public owner;
    GameCollection private _gameCollection;
    uint256 public constant itemRate = 1;
    mapping(uint256 => uint256[]) private _itemsRequirements;
    mapping(uint256 => bool) private _tradableItems;

    event ItemMinted(address _to, uint256 id);
    event ItemTraded(address _to, uint256 id, uint256 burnId);

    constructor(address collectionAddress) {
        owner = msg.sender;
        _gameCollection = GameCollection(collectionAddress);
        _setItemRequires();
        _setTradableItems();
    }

    function tradeItem(uint256 id, uint256 burnId) external notOwner {
        require(_tradableItems[id], "Item is not tradable!");

        _gameCollection.burn(msg.sender, burnId, itemRate);
        _gameCollection.mint(msg.sender, id, itemRate);

        emit ItemTraded(msg.sender, id, burnId);
    }

    function forgeItem(uint256 id) external notOwner {
        if(_itemsRequirements[id].length > 0) {
            uint256[] memory requiredItems = _itemsRequirements[id];
            uint256[] memory amount = new uint256[](requiredItems.length);

            for (uint i=0; i<requiredItems  .length; i++) {
                amount[i] = itemRate;
            }

            _gameCollection.burnBatch(msg.sender, requiredItems, amount);
        } 

        _gameCollection.mint(msg.sender, id, itemRate);
        emit ItemMinted(msg.sender, id);
    }

    function _setItemRequires() private {
        _itemsRequirements[3] = [0, 1]; 
        _itemsRequirements[4] = [1, 2]; 
        _itemsRequirements[5] = [0, 2]; 
        _itemsRequirements[6] = [0, 1, 2];
    }

    function _setTradableItems() private {
        _tradableItems[0] = true; 
        _tradableItems[1] = true; 
        _tradableItems[2] = true; 
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
