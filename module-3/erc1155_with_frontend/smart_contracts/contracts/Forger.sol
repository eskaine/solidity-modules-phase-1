//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./GameCollection.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Forger {
    address public owner;
    GameCollection private _gameCollection;
    uint256 public constant itemRate = 1;
    mapping(uint256 => uint256[]) private _itemsRequirements;

    event ItemMinted(address _to, uint256 id);

    constructor(address collectionAddress) {
        owner = msg.sender;
        _gameCollection = GameCollection(collectionAddress);
        _setItemRequires();
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

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
