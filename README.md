# Umswap

## History

* 2022-07-16 [UmswapFactory 0.8.5 testing](deployed/UmswapFactory_0.8.5_0x9D6856A4CCef088dA9B6E8a7c476aE05BC7caA2E.sol) deployed to [0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e](https://etherscan.io/address/0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e#code)

<br />

---

## Umswap Functions

### Umswap Read Functions

#### allowance

```javascript
function allowance(address tokenOwner, address spender) override external view returns (uint remaining)
```

<br />

#### balanceOf

```javascript
function balanceOf(address tokenOwner) override external view returns (uint balance)
```

<br />

#### decimals

```javascript
function decimals() override external view returns (uint8)
```

<br />

#### getInfo

```javascript
function getInfo() public view returns (address _creator, string memory __symbol, string memory __name, uint[] memory _tokenIds, uint _swappedIn, uint _swappedOut, uint __totalSupply)
```

<br />

#### isValidTokenId

```javascript
function isValidTokenId(uint _tokenId) public view returns (bool)
```

<br />

#### name

```javascript
function name() override external view returns (string memory)
```

<br />

#### symbol

```javascript
function symbol() override external view returns (string memory)
```

<br />

#### totalSupply

```javascript
function totalSupply() override external view returns (uint)
```

<br />

### Umswap Write Functions

#### approve

```javascript
function approve(address spender, uint tokens) override external returns (bool success)
```

<br />

#### swap

```receive
receive() external payable
```

<br />

#### swap

```javascript
function swap(uint[] calldata _inTokenIds, uint[] calldata _outTokenIds, address integrator) public payable reentrancyGuard
```

<br />

#### transfer

```javascript
function transfer(address to, uint tokens) override external returns (bool success)
```

<br />

#### transferFrom

```javascript
function transferFrom(address from, address to, uint tokens) override external returns (bool success)
```

<br />

---

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



---

## Testing

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

OpenZeppelin v4.7.0
npm install --save-dev @openzeppelin/test-helpers
