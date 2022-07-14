pragma solidity ^0.8.0;

// ----------------------------------------------------------------------------
// Umswap v0.8.5 testing to be deployed
//
// https://github.com/bokkypoobah/Umswap
//
// Deployed to ?
//
// SPDX-License-Identifier: MIT
//
// Enjoy. And hello, from the past.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2022
// ----------------------------------------------------------------------------

interface IERC20Partial {
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
}

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721Partial is IERC165 {
    function ownerOf(uint tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint balance);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint tokenId) external payable;
}

interface ERC721TokenReceiver {
    function onERC721Received(address operator, address from, uint tokenId, bytes memory data) external returns(bytes4);
}


contract Owned {
    bytes4 private constant ERC721_INTERFACE = 0x80ac58cd;

    address public owner;

    event OwnershipTransferred(address indexed from, address indexed to);
    event Withdrawn(address indexed token, uint tokens, uint tokenId);

    error NotOwner();

    modifier onlyOwner {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function withdraw(address token, uint tokens, uint tokenId) public onlyOwner {
        if (token == address(0)) {
            if (tokens == 0) {
                tokens = address(this).balance;
            }
            payable(owner).transfer(tokens);
        } else {
            bool isERC721 = false;
            try IERC721Partial(token).supportsInterface(ERC721_INTERFACE) returns (bool b) {
                isERC721 = b;
            } catch {
            }
            if (isERC721) {
                IERC721Partial(token).safeTransferFrom(address(this), owner, tokenId);
            } else {
                if (tokens == 0) {
                    tokens = IERC20Partial(token).balanceOf(address(this));
                }
                IERC20Partial(token).transfer(owner, tokens);
            }
        }
        emit Withdrawn(token, tokens, tokenId);
    }
}


contract ReentrancyGuard {
    error ReentrancyAttempted();
    uint private _executing;
    modifier reentrancyGuard() {
        if (_executing == 1) {
            revert ReentrancyAttempted();
        }
        _executing = 1;
        _;
        _executing = 2;
    }
}


/// @author BokkyPooBah, Bok Consulting Pty Ltd
/// @title ERC-721 pool
contract Umswap is Owned, ReentrancyGuard, ERC721TokenReceiver {
    uint public something = 1;

    event ThankYou(uint tip);

    constructor() {
    }

    function onERC721Received(address /*_operator*/, address /*_from*/, uint _tokenId, bytes memory /*_data*/) external override returns(bytes4) {
        emit ThankYou(_tokenId);
        return this.onERC721Received.selector;
    }

}

contract UmswapFactory is Owned {
    uint public something = 1;

    event ThankYou(uint tip);

    constructor() {
    }


}
