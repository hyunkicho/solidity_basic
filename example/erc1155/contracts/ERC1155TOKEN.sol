// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract ERC1155TOKEN is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable, ERC1155Supply, ERC1155URIStorage {
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
        _setBaseURI("https://raw.githubusercontent.com/hyunkicho/solidity_basic/refs/heads/main/example/erc1155/metadata/");
        _setURI(0,"series1/0");
        _setURI(1,"series1/1");
        _setURI(2,"series1/2");
        _setURI(3,"series2/0");
        _setURI(4,"series2/1");
        _setURI(5,"series2/2");
    }

    function setURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _setURI(tokenId, tokenURI);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    function uri(uint256 tokenId) 
        public view virtual
        override(ERC1155, ERC1155URIStorage) returns (string memory) {
            return super.uri(tokenId);
    }
}
