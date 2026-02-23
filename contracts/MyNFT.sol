// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MyNFT is ERC721, Ownable, ReentrancyGuard {

    uint256 private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 5;
    uint256 public mintPrice = 1 ether;
    string private baseTokenURI;

    constructor(string memory _baseURI)
        ERC721("InterviewNFT", "INFT")
        Ownable(msg.sender)
    {
        baseTokenURI = _baseURI;
    }

    function mint(address to) external payable nonReentrant {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        require(msg.value == mintPrice, "Incorrect MATIC amount");

        _tokenIdCounter++;                     // increment manually
        uint256 tokenId = _tokenIdCounter;     // current token id

        _safeMint(to, tokenId);
    }

    function updateMintPrice(uint256 _newPrice) external onlyOwner {
        mintPrice = _newPrice;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdraw failed");
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
