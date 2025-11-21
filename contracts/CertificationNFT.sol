// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CertificationNFT
 * @dev NFT contract for certifying Fonti San Bernardino bottle labels
 */
contract CertificationNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    uint256 public mintPrice = 0.01 ether; // Adjust as needed
    
    struct Certification {
        string bottleType;
        string serialNumber;
        uint256 mintDate;
        address minter;
    }
    
    mapping(uint256 => Certification) public certifications;
    
    event CertificationMinted(
        uint256 indexed tokenId,
        address indexed to,
        string bottleType,
        string serialNumber
    );
    
    constructor(address initialOwner) ERC721("Fonti San Bernardino Certification", "FSBC") Ownable(initialOwner) {}
    
    /**
     * @dev Mint a new certification NFT
     * @param to Address to mint the NFT to
     * @param tokenURI IPFS URI of the NFT metadata
     * @param bottleType Type of bottle (still, sparkling, extra-sparkling)
     * @param serialNumber Serial number from the bottle label
     */
    function mintCertification(
        address to,
        string memory tokenURI,
        string memory bottleType,
        string memory serialNumber
    ) public payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient payment");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        certifications[newTokenId] = Certification({
            bottleType: bottleType,
            serialNumber: serialNumber,
            mintDate: block.timestamp,
            minter: to
        });
        
        emit CertificationMinted(newTokenId, to, bottleType, serialNumber);
        
        return newTokenId;
    }
    
    /**
     * @dev Set the mint price (only owner)
     */
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Get certification details
     */
    function getCertification(uint256 tokenId) public view returns (Certification memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return certifications[tokenId];
    }
}

