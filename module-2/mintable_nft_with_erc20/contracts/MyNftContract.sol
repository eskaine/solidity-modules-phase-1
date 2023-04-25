// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNftContract is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _ids;
    uint256 public constant MAX_SUPPLY = 10;

    constructor() ERC721("MyNftContract", "MNC") {}

    function mint(address to) external {
        require(_ids.current() < MAX_SUPPLY, "Run out of NFTs!");
        _mint(to, _ids.current());
        _ids.increment();
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(
                        baseURI,
                        Strings.toString(tokenId),
                        ".json"
                    )
                )
                : "";
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://gateway.pinata.cloud/ipfs/QmUTzKXMS1Nyk9zUpjxYo5k3QC765yk51vUu7B8euWeKRC/";
    }
}
