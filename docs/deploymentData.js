const ENSREVERSERECORDSADDRESS="0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C";
const ENSREVERSERECORDSABI=[{"inputs":[{"internalType":"contract ENS","name":"_ens","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"getNames","outputs":[{"internalType":"string[]","name":"r","type":"string[]"}],"stateMutability":"view","type":"function"}];

// const WETHADDRESS="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
// const WETHADDRESS_RINKEBY="0xD0000DE5A8A759EAD912F89d2E6f1ae59063a61A";
const WETHABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];


const ERC721_INTERFACE = "0x80ac58cd";
const ERC721METADATA_INTERFACE = "0x5b5e139f";
const ERC721ENUMERABLE_INTERFACE = "0x780e9d63";

const MASK_ERC721 = 2**0;
const MASK_ERC721METADATA = 2**1;
const MASK_ERC721ENUMERABLE = 2**2;

const ERC721HELPERADDRESS="0x1CB0bA2E867549Aa7485a91dD90C454C2121b975";
const ERC721HELPERABI=[{"inputs":[],"name":"ISERC721","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ISERC721ENUMERABLE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ISERC721METADATA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ERC20","name":"token","type":"address"},{"internalType":"address[]","name":"tokenOwners","type":"address[]"},{"internalType":"address","name":"spender","type":"address"}],"name":"getERC20Info","outputs":[{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256[]","name":"allowances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"}],"name":"ownersByEnumerableIndex","outputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"address[]","name":"owners","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"ownersByTokenIds","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"address[]","name":"owners","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"tokenInfo","outputs":[{"internalType":"uint256[]","name":"statuses","type":"uint256[]"},{"internalType":"string[]","name":"symbols","type":"string[]"},{"internalType":"string[]","name":"names","type":"string[]"},{"internalType":"uint256[]","name":"totalSupplys","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"}],"name":"tokenURIsByEnumerableIndex","outputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"string[]","name":"tokenURIs","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"tokenURIsByTokenIds","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"string[]","name":"tokenURIs","type":"string[]"}],"stateMutability":"view","type":"function"}];


const UMSWAPFACTORYADDRESS = "0x8f093895cD4C54eaB897C6377e1Bf85Fe5B4E948";
const UMSWAPFACTORYDEPLOYMENTBLOCK = 15631585;
const UMSWAPFACTORYABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"DuplicateSet","type":"error"},{"inputs":[],"name":"InvalidMessage","type":"error"},{"inputs":[],"name":"InvalidName","type":"error"},{"inputs":[],"name":"InvalidTopic","type":"error"},{"inputs":[],"name":"InvalidUmswapOrCollection","type":"error"},{"inputs":[],"name":"NotERC721","type":"error"},{"inputs":[],"name":"TokenIdsMustBeSortedWithNoDuplicates","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"umswapOrCollection","type":"address"},{"indexed":false,"internalType":"string","name":"topic","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"Message","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"contract Umswap","name":"umswap","type":"address"},{"indexed":true,"internalType":"contract IERC721Partial","name":"collection","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"NewUmswap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"uint256[]","name":"indices","type":"uint256[]"}],"name":"getUmswaps","outputs":[{"internalType":"contract Umswap[]","name":"umswaps_","type":"address[]"},{"internalType":"string[]","name":"symbols","type":"string[]"},{"internalType":"string[]","name":"names","type":"string[]"},{"internalType":"contract IERC721Partial[]","name":"collections","type":"address[]"},{"internalType":"uint256[][]","name":"validTokenIds","type":"uint256[][]"},{"internalType":"uint256[][]","name":"tokenIds","type":"uint256[][]"},{"internalType":"address[]","name":"creators","type":"address[]"},{"internalType":"uint256[][]","name":"stats","type":"uint256[][]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUmswapsLength","outputs":[{"internalType":"uint256","name":"_length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"isValidName","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract IERC721Partial","name":"collection","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"newUmswap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"umswapOrCollection","type":"address"},{"internalType":"string","name":"topic","type":"string"},{"internalType":"string","name":"text","type":"string"}],"name":"sendMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"template","outputs":[{"internalType":"contract Umswap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"umswaps","outputs":[{"internalType":"contract Umswap","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const UMSWAPABI = [{"inputs":[],"name":"AlreadyInitialised","type":"error"},{"inputs":[],"name":"CannotAddDuplicate","type":"error"},{"inputs":[],"name":"InsufficientTokensToBurn","type":"error"},{"inputs":[],"name":"InvalidRatingMessage","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"InvalidTokenId","type":"error"},{"inputs":[{"internalType":"uint256","name":"max","type":"uint256"}],"name":"MaxRatingExceeded","type":"error"},{"inputs":[],"name":"NotFound","type":"error"},{"inputs":[],"name":"ReentrancyAttempted","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"score","type":"uint256"},{"indexed":false,"internalType":"string","name":"text","type":"string"},{"indexed":false,"internalType":"uint64[3]","name":"stats","type":"uint64[3]"}],"name":"Rated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"inTokenIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"outTokenIds","type":"uint256[]"},{"indexed":false,"internalType":"uint64[3]","name":"stats","type":"uint64[3]"}],"name":"Swapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"getInfo","outputs":[{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"contract IERC721Partial","name":"collection_","type":"address"},{"internalType":"uint256[]","name":"validTokenIds_","type":"uint256[]"},{"internalType":"uint256[]","name":"tokenIds_","type":"uint256[]"},{"internalType":"address","name":"creator_","type":"address"},{"internalType":"uint256[]","name":"stats_","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"indices","type":"uint256[]"}],"name":"getRatings","outputs":[{"components":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint64","name":"score","type":"uint64"}],"internalType":"struct Umswap.Rating[]","name":"ratings_","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"contract IERC721Partial","name":"_collection","type":"address"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256[]","name":"_tokenIds","type":"uint256[]"}],"name":"initUmswap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"isValidTokenId","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"score","type":"uint256"},{"internalType":"string","name":"text","type":"string"}],"name":"rate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raters","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ratings","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint64","name":"score","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"inTokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"outTokenIds","type":"uint256[]"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
