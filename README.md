# Umswap

Umswaps are subsets of ERC-721 NFT collections pooled into ERC-20 tokens. Umswaps are created by UmswapFactory.

Following is the example from the [test scripts](test/00_test_0.js) and [results](testIt.out).

The "ERC721MOCK" ERC-721 collection has 6 tokens with **user0** owning **[111, 222, 333]** and **user1** owning **[444,555,666]**.

An Umswap has been deployed on the "ERC721MOCK" collection with valid tokenIds **[111, 333, 555]**, with symbol **UMS00000** and name **Odd TokenIds: - test**.

<pre>
--- Before Any Umswaps ---
  Account                                   ETH            UMS00000   0.0 ERC721MOCK (6)           
  -------------------- ------------------------ ----------------------- ---------------------------------------------
  user0:0x7099          9999.999940893043943425                     0.0 [111,222,333]            
  user1:0x3C44                          10000.0                     0.0 [444,555,666]            
  Umswap:0x9f1a                             0.0                     0.0 []                       

  # Address              Creator              Symbol   Name                             In  Out     TotalSupply TokenIds                      
--- -------------------- -------------------- -------- ------------------------------ ---- ---- --------------- ------------------------------
  0 Umswap:0x9f1a        deployer:0xf39F      UMS00000             Odd TokenIds: - test              0    0             0.0 [111,333,555]                 
</pre>

<br />

<br />

---


## History

* 2022-07-16 [UmswapFactory 0.8.5 testing](deployed/UmswapFactory_0.8.5_0x9D6856A4CCef088dA9B6E8a7c476aE05BC7caA2E.sol) deployed to [0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e](https://etherscan.io/address/0x9d6856a4ccef088da9b6e8a7c476ae05bc7caa2e#code)

<br />

---

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

OpenZeppelin v4.7.0
npm install --save-dev @openzeppelin/test-helpers
