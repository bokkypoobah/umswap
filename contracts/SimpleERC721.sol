pragma solidity ^0.8.0;

// ----------------------------------------------------------------------------
// Simple ERC721 for testing
//
// https://github.com/bokkypoobah/umswap
//
// SPDX-License-Identifier: MIT
//
// Enjoy. And hello, from the past.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2022
// ----------------------------------------------------------------------------

import "./openzeppelin/token/ERC721/ERC721.sol";

contract SimpleERC721 is ERC721 {
    constructor() ERC721("SimpleERC721", "SE7") {
    }
}
