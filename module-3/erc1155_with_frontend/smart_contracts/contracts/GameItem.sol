//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItem is ERC1155 {
    address public owner;
    string private _uri = 'https://esk-erc1155.infura-ipfs.io/ipfs/Qma7FEp5pG3my56RyAjsVjEBs6QAaXXEStusydhxkJmiGR/metadata/';
    uint256[] public ITEM_COLLECTION = [0, 1, 2, 3, 4, 5, 6];
    uint256 public constant itemRate = 1;
    mapping(uint256 => uint256[]) private _itemsRequirements;

    event ItemMinted(address _to, uint256 id);

    constructor() ERC1155("") {
        owner = msg.sender;
        _setItemRequires();
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

    function mintItem(uint256 id) external notOwner {
        if(_itemsRequirements[id].length > 0) {
            uint256[] memory requiredItems = _itemsRequirements[id];
            uint256[] memory amounts = new uint256[](requiredItems.length);

            for (uint i=0; i<requiredItems  .length; i++) {
                amounts[i] = itemRate;
            }

            _burnBatch(msg.sender, requiredItems, amounts);
        } 

        _mint(msg.sender, id, itemRate, "");
        emit ItemMinted(msg.sender, id);
    }

    function _setItemRequires() private {
        _itemsRequirements[3] = [0, 1]; 
        _itemsRequirements[4] = [1, 2]; 
        _itemsRequirements[5] = [0, 2]; 
        _itemsRequirements[6] = [0, 1, 2];
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(_uri, Strings.toString(id), '.json'));
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
