# umswap - "Like WETH, but for ERC-721s"

Umswaps are subsets of ERC-721 NFT collections pooled into ERC-20 tokens.

Umswaps are created by UmswapFactory.

UI being built at [https://bokkypoobah.github.io/umswap/](https://bokkypoobah.github.io/umswap/).

<br />

<br />

<hr />


## History

* 2022-07-16 [UmswapFactory 0.8.5 testing](deployed/UmswapFactory_0.8.5_0x9D6856A4CCef088dA9B6E8a7c476aE05BC7caA2E.sol) deployed to [0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e](https://etherscan.io/address/0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e#code)

* 2022-07-30 [UmswapFactory 0.8.6 testing](deployed/UmswapFactory_0.8.6_0x39D61eDC9E951C93A0A714c008006c5093992db3.sol) deployed to [0x39D61eDC9E951C93A0A714c008006c5093992db3](https://etherscan.io/address/0x39D61eDC9E951C93A0A714c008006c5093992db3#code)

* 2022-07-31 [UmswapFactory 0.8.7 testing](deployed/UmswapFactory_0.8.7_0xb9969521413D036eAb5Ff2095cDc31BF4600AF9e.sol) deployed to [0xb9969521413D036eAb5Ff2095cDc31BF4600AF9e](https://etherscan.io/address/0xb9969521413D036eAb5Ff2095cDc31BF4600AF9e#code)

* 2022-08-01 [UmswapFactory 0.8.8 testing](deployed/UmswapFactory_0.8.8_0x06cD34744eb3bE01808790Df7D1AeB63355b27Ea.sol) deployed to [0x06cD34744eb3bE01808790Df7D1AeB63355b27Ea](https://etherscan.io/address/0x06cD34744eb3bE01808790Df7D1AeB63355b27Ea#code)
  * [Bug bounty](https://twitter.com/BokkyPooBah/status/1553875661248270337) offer on this contract
    * Cancelled 2022-08-15 - new version

* 2022-08-15 [UmswapFactory 0.8.9 testing](deployed/UmswapFactory_0.8.9_0x0AE45D0a938f4F07F236e5f43ffB05E79ceE8268.sol]) deployed to [0x0AE45D0a938f4F07F236e5f43ffB05E79ceE8268](https://etherscan.io/address/0x0AE45D0a938f4F07F236e5f43ffB05E79ceE8268#code)
  * [Bug bounty](https://twitter.com/BokkyPooBah/status/1553875661248270337) now on offer on this contract

<br />

<hr />

## Umswap Functions

### Umswap Read Functions

#### allowance(tokenOwner, spender)

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function allowance(address tokenOwner, address spender) override external view returns (uint remaining)
```

<br />

#### balanceOf(tokenOwner)

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function balanceOf(address tokenOwner) override external view returns (uint balance)
```

<br />

#### decimals()

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function. Set to 18 decimals.

```javascript
function decimals() override external view returns (uint8)
```

<br />

#### getInfo()

```javascript
function getInfo() public view returns (address _creator, string memory __symbol, string memory __name, uint[] memory _tokenIds, uint _swappedIn, uint _swappedOut, uint __totalSupply)
```

<br />

#### isValidTokenId(tokenId)

```javascript
function isValidTokenId(uint _tokenId) public view returns (bool)
```

<br />

#### name()

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function name() override external view returns (string memory)
```

<br />

#### symbol()

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function symbol() override external view returns (string memory)
```

<br />

#### totalSupply()

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function totalSupply() override external view returns (uint)
```

<br />

### Umswap Write Functions

#### approve(spender, tokens)

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function approve(address spender, uint tokens) override external returns (bool success)
```

<br />

#### receive()

Receive any tips in ETH.

```receive
receive() external payable
```

<br />

#### swap(inTokenIds, outTokenIds, integrator)

```javascript
function swap(uint[] calldata _inTokenIds, uint[] calldata _outTokenIds, address integrator) public payable reentrancyGuard
```

<br />

#### transfer(to, tokens)

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function transfer(address to, uint tokens) override external returns (bool success)
```

<br />

#### transferFrom(from, to, tokens)

Standard [ERC-20](https://eips.ethereum.org/EIPS/eip-20) function.

```javascript
function transferFrom(address from, address to, uint tokens) override external returns (bool success)
```

<br />

<hr />

## UmswapFactory Functions

### UmswapFactory Read Functions

#### isValidName

Is name valid? Name cannot start or end with spaces, or contain repeating spaces. Name must be between 1 and 48 characters in length. Valid characters are 0-9, A-Z, a-z, space, +, -, : .

```javascript
function isValidName(string memory str) public pure returns (bool)
```

<br />

#### getUmswapsLength

```javascript
function getUmswapsLength() public view returns (uint _length)
```

<br />

#### getUmswaps

```javascript
function getUmswaps(uint[] memory indices) public view returns (
    Umswap[] memory _umswaps,
    address[] memory _creators,
    string[] memory _symbols,
    string[] memory _names,
    uint[][] memory _tokenIds,
    uint[] memory _swappedIns,
    uint[] memory _swappedOuts,
    uint[] memory _totalSupplies
)
```

<br />

#### owner

Owner of UmswapFactory

```javascript
address public owner
```

<br />

#### umswaps

Array of child Umswap addresses

```javascript
Umswap[] public umswaps
```

<br />

### UmswapFactory Write Functions

#### newUmswap

```javascript
function newUmswap(IERC721Partial _collection, string calldata _name, uint[] calldata _tokenIds, address integrator)
```

<br />

#### receive

```javascript
receive() external payable
```

<br />

#### transferOwnership

```javascript
function transferOwnership(address _newOwner) public onlyOwner
```

<br />

#### withdraw

```javascript
function withdraw(address token, uint tokens, uint tokenId) public onlyOwner
```



<hr />

## Testing

See [test/00_test_0.js](test/00_test_0.js) for the testing scripts and [testIt.out](testIt.out) for the results.

<br />

### UmswapFactory
* [ ] Owned
  * [ ] Can only initialise once `AlreadyInitialised()`
  * [ ] Transfer ownership
    * [ ] Valid ownership transfer
    * [ ] Invalid ownership transfer `NotOwner()`
* [ ] TipHandler
  * [ ] Zero tips
  * [ ] Non-zero tips
    * [ ] `integrator` set to `address(0)`
    * [ ] `integrator` set to `address(this)`
    * [ ] `integrator` set to EOA/contract address/contract that rejects ETH payment
* [ ] CloneFactory
  * [ ] Check
* [ ] UmswapFactory
  * [ ] `newUmswap(...)`
    * [ ] Collection set to EOA `NotERC721()`
    * [ ] Collection set to non ERC-721 contract `NotERC721()`
    * [ ] Invalid name `InvalidName()`
    * [ ] TokenIds not sorted ascending `TokenIdsMustBeSortedWithNoDuplicates()`
    * [ ] Duplicate set `DuplicateSet()`
  * [ ] Receive ETH transfers
  * [ ] Reject ERC-721 `safeTransferFrom(msg.sender, UmswapFactory, tokenId)` transfers
  * [ ] Withdraw
    * [ ] ETH
    * [ ] ERC-20
    * [ ] ERC-721
    * [ ] Not owner `NotOwner()`

### Umswap
* [ ]
* [ ]
  * [ ]


## Notes

npm install --save-dev hardhat
OpenZeppelin v4.7.0
npm install --save-dev @openzeppelin/test-helpers
npm install --save-dev @nomicfoundation/hardhat-toolbox
