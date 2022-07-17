pragma solidity ^0.8.0;

// ----------------------------------------------------------------------------
// Umswap v0.8.6 testing
//
// https://github.com/bokkypoobah/Umswap
//
// Deployed to
//
// SPDX-License-Identifier: MIT
//
// Enjoy. And hello, from the past.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2022
// ----------------------------------------------------------------------------

/// @notice https://github.com/optionality/clone-factory/blob/32782f82dfc5a00d103a7e61a17a5dedbd1e8e9d/contracts/CloneFactory.sol
/*
The MIT License (MIT)

Copyright (c) 2018 Murray Software, LLC.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//solhint-disable max-line-length
//solhint-disable no-inline-assembly

contract CloneFactory {

  function createClone(address target) internal returns (address result) {
    bytes20 targetBytes = bytes20(target);
    assembly {
      let clone := mload(0x40)
      mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
      mstore(add(clone, 0x14), targetBytes)
      mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
      result := create(0, clone, 0x37)
    }
  }

  function isClone(address target, address query) internal view returns (bool result) {
    bytes20 targetBytes = bytes20(target);
    assembly {
      let clone := mload(0x40)
      mstore(clone, 0x363d3d373d3d3d363d7300000000000000000000000000000000000000000000)
      mstore(add(clone, 0xa), targetBytes)
      mstore(add(clone, 0x1e), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)

      let other := add(clone, 0x40)
      extcodecopy(query, other, 0, 0x2d)
      result := and(
        eq(mload(clone), mload(other)),
        eq(mload(add(clone, 0xd)), mload(add(other, 0xd)))
      )
    }
  }
}
// End CloneFactory.sol


/// @author Alex W.(github.com/nonstopcoderaxw)
/// @title Array utility functions optimized for Nix
library ArrayUtils {
    /// @notice divide-and-conquer check if an targeted item exists in a sorted array
    /// @param self the given sorted array
    /// @param target the targeted item to the array
    /// @return true - if exists, false - not found
    function includes16(uint16[] memory self, uint256 target) internal pure returns (bool) {
        if (self.length > 0) {
            uint256 left;
            uint256 right = self.length - 1;
            uint256 mid;
            while (left <= right) {
                mid = (left + right) / 2;
                if (uint256(self[mid]) < target) {
                    left = mid + 1;
                } else if (uint256(self[mid]) > target) {
                    if (mid < 1) {
                        break;
                    }
                    right = mid - 1;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    function includes32(uint32[] memory self, uint256 target) internal pure returns (bool) {
        if (self.length > 0) {
            uint256 left;
            uint256 right = self.length - 1;
            uint256 mid;
            while (left <= right) {
                mid = (left + right) / 2;
                if (uint256(self[mid]) < target) {
                    left = mid + 1;
                } else if (uint256(self[mid]) > target) {
                    if (mid < 1) {
                        break;
                    }
                    right = mid - 1;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    function includes48(uint48[] memory self, uint256 target) internal pure returns (bool) {
        if (self.length > 0) {
            uint256 left;
            uint256 right = self.length - 1;
            uint256 mid;
            while (left <= right) {
                mid = (left + right) / 2;
                if (uint256(self[mid]) < target) {
                    left = mid + 1;
                } else if (uint256(self[mid]) > target) {
                    if (mid < 1) {
                        break;
                    }
                    right = mid - 1;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    function includes256(uint256[] memory self, uint256 target) internal pure returns (bool) {
        if (self.length > 0) {
            uint256 left;
            uint256 right = self.length - 1;
            uint256 mid;
            while (left <= right) {
                mid = (left + right) / 2;
                if (self[mid] < target) {
                    left = mid + 1;
                } else if (self[mid] > target) {
                    if (mid < 1) {
                        break;
                    }
                    right = mid - 1;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
}


function unsafeIncrement(uint x) pure returns (uint) {
    unchecked { return x + 1; }
}


/// @notice ERC20 https://eips.ethereum.org/EIPS/eip-20 with optional symbol, name and decimals
interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function transfer(address to, uint tokens) external returns (bool success);
    function approve(address spender, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);

    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function decimals() external view returns (uint8);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721Partial is IERC165 {
    function ownerOf(uint tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint balance);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function transferFrom(address from, address to, uint tokenId) external payable;
    function safeTransferFrom(address from, address to, uint tokenId) external payable;
}


contract ReentrancyGuard {
    uint private _executing;

    error ReentrancyAttempted();

    modifier reentrancyGuard() {
        if (_executing == 1) {
            revert ReentrancyAttempted();
        }
        _executing = 1;
        _;
        _executing = 2;
    }
}


contract Owned {
    bool initialised;
    address public owner;

    event OwnershipTransferred(address indexed from, address indexed to);

    error AlreadyInitialised();
    error NotOwner();

    modifier onlyOwner {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    function initOwned(address _owner) internal {
        if (initialised) {
            revert AlreadyInitialised();
        }
        owner = address(uint160(_owner));
        initialised = true;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}


/// @notice Basic token = ERC20 + symbol + name + decimals + mint + ownership
contract BasicToken is IERC20, Owned {

    string _symbol;
    string _name;
    uint _decimals;
    uint _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    function initToken(address tokenOwner, string memory __symbol, string memory __name, uint __decimals) internal {
        super.initOwned(tokenOwner);
        _symbol = __symbol;
        _name = __name;
        _decimals = __decimals;
    }
    function symbol() override external view returns (string memory) {
        return _symbol;
    }
    function name() override external view returns (string memory) {
        return _name;
    }
    function decimals() override external view returns (uint8) {
        return uint8(_decimals);
    }
    function totalSupply() override external view returns (uint) {
        return _totalSupply - balances[address(0)];
    }
    function balanceOf(address tokenOwner) override external view returns (uint balance) {
        return balances[tokenOwner];
    }
    function transfer(address to, uint tokens) override external returns (bool success) {
        balances[msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens) override external returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    function transferFrom(address from, address to, uint tokens) override external returns (bool success) {
        balances[from] -= tokens;
        allowed[from][msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(from, to, tokens);
        return true;
    }
    function allowance(address tokenOwner, address spender) override external view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
    function _mint(address tokenOwner, uint tokens) internal returns (bool success) {
        balances[tokenOwner] += tokens;
        _totalSupply += tokens;
        emit Transfer(address(0), tokenOwner, tokens);
        return true;
    }
    function _burn(address tokenOwner, uint tokens) internal returns (bool success) {
        balances[tokenOwner] -= tokens;
        _totalSupply -= tokens;
        emit Transfer(tokenOwner, address(0), tokens);
        return true;
    }
}


contract TipHandler {
    event ThankYou(address tipper, address integrator, uint tipIntegrator, uint tipRemainder, uint timestamp);

    function handleTips(address integrator, address remainder) internal {
        if (msg.value > 0) {
            uint tipIntegrator;
            if (integrator != address(0) && integrator != remainder) {
                tipIntegrator = msg.value * 4 / 5;
                if (tipIntegrator > 0) {
                    payable(integrator).transfer(tipIntegrator);
                }
            }
            uint tipRemainder = msg.value - tipIntegrator;
            if (tipRemainder > 0 && remainder != address(this)) {
                payable(remainder).transfer(tipRemainder);
            }
            emit ThankYou(msg.sender, integrator, tipIntegrator, tipRemainder, block.timestamp);
        }
    }
}

/// @author BokkyPooBah, Bok Consulting Pty Ltd
/// @title ERC-721 pool
contract Umswap is BasicToken, TipHandler, ReentrancyGuard {

    address private creator;
    IERC721Partial private collection;
    uint16[] private tokenIds16;
    uint32[] private tokenIds32;
    uint48[] private tokenIds48;
    uint[] private tokenIds256;
    uint private swappedIn;
    uint private swappedOut;

    event Swapped(address account, uint[] _inTokenIds, uint[] _outTokenIds, uint swappedIn, uint swappedOut, uint timestamp);

    error InvalidTokenId(uint tokenId);

    function initUmswap(address _creator, IERC721Partial _collection, string calldata _symbol, string calldata _name, uint[] calldata _tokenIds) public {
        creator = _creator;
        collection = _collection;
        super.initToken(msg.sender, _symbol, _name, 18);
        uint maxTokenId;
        for (uint i = 0; i < _tokenIds.length; i = unsafeIncrement(i)) {
            if (_tokenIds[i] > maxTokenId) {
                maxTokenId = _tokenIds[i];
            }
        }
        if (maxTokenId < 2 ** 16) {
            for (uint i = 0; i < _tokenIds.length; i = unsafeIncrement(i)) {
                tokenIds16.push(uint16(_tokenIds[i]));
            }
        } else if (maxTokenId < 2 ** 32) {
            for (uint i = 0; i < _tokenIds.length; i = unsafeIncrement(i)) {
                tokenIds32.push(uint32(_tokenIds[i]));
            }
        } else if (maxTokenId < 2 ** 48) {
            for (uint i = 0; i < _tokenIds.length; i = unsafeIncrement(i)) {
                tokenIds48.push(uint48(_tokenIds[i]));
            }
        } else {
            tokenIds256 = _tokenIds;
        }
    }

    function validTokenId(uint _tokenId) public view returns (bool _isOk) {
        if (tokenIds16.length > 0) {
            return ArrayUtils.includes16(tokenIds16, _tokenId);
        } else if (tokenIds32.length > 0) {
            return ArrayUtils.includes32(tokenIds32, _tokenId);
        } else if (tokenIds48.length > 0) {
            return ArrayUtils.includes48(tokenIds48, _tokenId);
        } else if (tokenIds256.length > 0) {
            return ArrayUtils.includes256(tokenIds256, _tokenId);
        } else {
            return true;
        }
    }

    function swap(uint[] calldata _inTokenIds, uint[] calldata _outTokenIds, address integrator) public payable reentrancyGuard {
        if (_outTokenIds.length > _inTokenIds.length) {
            _burn(msg.sender, (_outTokenIds.length - _inTokenIds.length) * 10 ** 18);
        }
        for (uint i = 0; i < _inTokenIds.length; i = unsafeIncrement(i)) {
            if (!validTokenId(_inTokenIds[i])) {
                revert InvalidTokenId(_inTokenIds[i]);
            }
            collection.transferFrom(msg.sender, address(this), _inTokenIds[i]);
        }
        for (uint i = 0; i < _outTokenIds.length; i = unsafeIncrement(i)) {
            if (!validTokenId(_outTokenIds[i])) {
                revert InvalidTokenId(_outTokenIds[i]);
            }
            collection.transferFrom(address(this), msg.sender, _outTokenIds[i]);
        }
        if (_outTokenIds.length < _inTokenIds.length) {
            _mint(msg.sender, (_inTokenIds.length - _outTokenIds.length) * 10 ** 18);
        }
        swappedIn += _inTokenIds.length;
        swappedOut += _outTokenIds.length;
        emit Swapped(msg.sender, _inTokenIds, _outTokenIds, swappedIn, swappedOut, block.timestamp);
        handleTips(integrator, owner);
    }

    receive() external payable {
        handleTips(address(0), owner);
    }

    function getInfo() public view returns (address _creator, string memory __symbol, string memory __name, uint[] memory _tokenIds, uint _swappedIn, uint _swappedOut, uint __totalSupply) {
        _creator = creator;
        __symbol = _symbol;
        __name = _name;
        if (tokenIds16.length > 0) {
            _tokenIds = new uint[](tokenIds16.length);
            for (uint i = 0; i < tokenIds16.length; i = unsafeIncrement(i)) {
                _tokenIds[i] = tokenIds16[i];
            }
        } else if (tokenIds32.length > 0) {
            _tokenIds = new uint[](tokenIds32.length);
            for (uint i = 0; i < tokenIds32.length; i = unsafeIncrement(i)) {
                _tokenIds[i] = tokenIds32[i];
            }
        } else if (tokenIds48.length > 0) {
            _tokenIds = new uint[](tokenIds48.length);
            for (uint i = 0; i < tokenIds48.length; i = unsafeIncrement(i)) {
                _tokenIds[i] = tokenIds48[i];
            }
        } else if (tokenIds256.length > 0) {
            _tokenIds = new uint[](tokenIds256.length);
            for (uint i = 0; i < tokenIds256.length; i = unsafeIncrement(i)) {
                _tokenIds[i] = tokenIds256[i];
            }
        } else {
            _tokenIds = new uint[](0);
        }
        _swappedIn = swappedIn;
        _swappedOut = swappedOut;
        __totalSupply = _totalSupply;
    }
}

contract UmswapFactory is Owned, TipHandler, CloneFactory {

    uint8 constant ZERO = 48;
    bytes constant UMSYMBOLPREFIX = "UMS";
    bytes4 constant ERC721_INTERFACE = 0x80ac58cd;

    Umswap public template;
    Umswap[] public umswaps;
    mapping(bytes32 => bool) exists;

    error NotERC721();
    error InvalidName();
    error DuplicateSet();
    error TokenIdsMustBeSortedWithNoDuplicates();

    event NewUmswap(address creator, Umswap _umswap, IERC721Partial _collection, string _name, uint[] _tokenIds, uint timestamp);
    event Withdrawn(address indexed token, uint tokens, uint tokenId);

    constructor() {
        super.initOwned(msg.sender);
        template = new Umswap();
    }

    function isERC721(address token) internal view returns (bool b) {
        if (token.code.length > 0) {
            try IERC721Partial(token).supportsInterface(ERC721_INTERFACE) returns (bool _b) {
                b = _b;
            } catch {
            }
        }
    }

    function genSymbol(uint id) internal pure returns (string memory s) {
        bytes memory b = new bytes(20);
        uint i;
        uint j;
        uint num;
        for (i = 0; i < UMSYMBOLPREFIX.length; i = unsafeIncrement(i)) {
            b[j++] = UMSYMBOLPREFIX[i];
        }
        i = 5;
        do {
            unchecked {
                i--;
            }
            num = id / 10 ** i;
            b[j++] = bytes1(uint8(num % 10 + ZERO));
        } while (i > 0);
        s = string(b);
    }

    function validateName(string memory str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length < 1 || b.length > 48) {
            return false;
        }
        // Leading and trailing space
        if (b[0] == 0x20 || b[b.length-1] == 0x20) {
            return false;
        }
        bytes1 lastChar = b[0];
        for (uint i; i < b.length; i = unsafeIncrement(i)) {
            bytes1 char = b[i];
             // Cannot contain continous spaces
            if (char == 0x20 && lastChar == 0x20) {
                return false;
            }
            // 9-0, A-Z, a-z, space, +, -, :
            if (!(char >= 0x30 && char <= 0x39) && !(char >= 0x41 && char <= 0x5A) &&
                !(char >= 0x61 && char <= 0x7A) &&
                !(char == 0x20) && !(char == 0x2B) && !(char == 0x2D) && !(char == 0x3A)) {
                return false;
            }
            lastChar = char;
        }
        return true;
    }

    function newUmswap(IERC721Partial _collection, string calldata _name, uint[] calldata _tokenIds, address integrator) public payable {
        if (!isERC721(address(_collection))) {
            revert NotERC721();
        }
        if (!validateName(_name)) {
            revert InvalidName();
        }
        if (_tokenIds.length > 0) {
            for (uint i = 1; i < _tokenIds.length; i = unsafeIncrement(i)) {
                if (_tokenIds[i - 1] >= _tokenIds[i]) {
                    revert TokenIdsMustBeSortedWithNoDuplicates();
                }
            }
        }
        bytes32 key = keccak256(abi.encodePacked(_collection, _name, _tokenIds));
        if (exists[key]) {
            revert DuplicateSet();
        }
        exists[key] = true;
        Umswap umswap = Umswap(payable(createClone(address(template))));
        umswap.initUmswap(msg.sender, _collection, genSymbol(umswaps.length), _name, _tokenIds);
        umswaps.push(umswap);
        emit NewUmswap(msg.sender, umswap, _collection, _name, _tokenIds, block.timestamp);
        handleTips(integrator, address(this));
    }

    function withdraw(address token, uint tokens, uint tokenId) public onlyOwner {
        if (token == address(0)) {
            if (tokens == 0) {
                tokens = address(this).balance;
            }
            payable(owner).transfer(tokens);
        } else {
            if (isERC721(token)) {
                IERC721Partial(token).safeTransferFrom(address(this), owner, tokenId);
            } else {
                if (tokens == 0) {
                    tokens = IERC20(token).balanceOf(address(this));
                }
                IERC20(token).transfer(owner, tokens);
            }
        }
        emit Withdrawn(token, tokens, tokenId);
    }

    receive() external payable {
    }

    function getUmswapsLength() public view returns (uint _length) {
        return umswaps.length;
    }

    function getUmswaps(uint[] memory indices) public view returns (
        Umswap[] memory _umswaps,
        address[] memory _creators,
        string[] memory _symbols,
        string[] memory _names,
        uint[][] memory _tokenIds,
        uint[] memory _swappedIns,
        uint[] memory _swappedOuts,
        uint[] memory _totalSupplies
    ) {
        uint length = indices.length;
        _umswaps = new Umswap[](length);
        _creators = new address[](length);
        _symbols = new string[](length);
        _names = new string[](length);
        _tokenIds = new uint[][](length);
        _swappedIns = new uint[](length);
        _swappedOuts = new uint[](length);
        _totalSupplies = new uint[](length);
        for (uint i = 0; i < length; i = unsafeIncrement(i)) {
            _umswaps[i] = umswaps[i];
            (_creators[i], _symbols[i], _names[i], _tokenIds[i], _swappedIns[i], _swappedOuts[i], _totalSupplies[i]) = umswaps[i].getInfo();
        }
    }
}
