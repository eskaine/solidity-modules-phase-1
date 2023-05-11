//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameCollection is ERC1155 {
    address public immutable owner;
    string private _uri =
        "https://esk-erc1155.infura-ipfs.io/ipfs/Qma7FEp5pG3my56RyAjsVjEBs6QAaXXEStusydhxkJmiGR/metadata/";
    uint256[] private _itemCollection = [0, 1, 2, 3, 4, 5, 6];
    mapping(address => uint256) private _lastMintedTime;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    // to get all items for a single address
    function getPlayerAllItems(
        address[] calldata addresses
    ) external view notContractOwner returns (uint256[] memory) {
        for (uint i = 0; i < addresses.length; i++) {
            if (addresses[i] != msg.sender) {
                // prevents user from fetching data of other users
                revert("Invalid addresses!");
            }
        }

        uint256[] memory items = balanceOfBatch(addresses, _itemCollection);
        return items;
    }

    function burn(
        address from,
        uint256 id,
        uint256 amount
    ) external notContractOwner itemOwner(from) {
        _burn(from, id, amount);
    }

    function burnBatch(
        address from,
        uint256[] calldata ids,
        uint256[] calldata amount
    ) external notContractOwner itemOwner(from) {
        _burnBatch(from, ids, amount);
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) external notContractOwner itemOwner(to) {
        uint256 elapsedTime = block.timestamp - _lastMintedTime[to];
        if (id <= 2 && elapsedTime <= 60) {
            revert(Strings.toString(elapsedTime));
        } else if (id <= 2 && elapsedTime > 60) {
            _lastMintedTime[to] = block.timestamp;
        }

        _mint(to, id, amount, "");
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(_uri, Strings.toString(id), ".json"));
    }

    modifier itemOwner(address itemOwnerAddress) {
        require(itemOwnerAddress == tx.origin, "You are not item owner!");
        _;
    }

    modifier notContractOwner() {
        require(msg.sender != owner, "Owner cannot call this function!");
        _;
    }
}
