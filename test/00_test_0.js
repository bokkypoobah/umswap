const { ZERO_ADDRESS, BUYORSELL, ANYORALL, BUYORSELLSTRING, ANYORALLSTRING, Data, generateRange } = require('./helpers/common');
const { singletons, expectRevert } = require("@openzeppelin/test-helpers");
const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const util = require('util');

let data;

describe("umswap", function () {
  const DETAILS = 1;

  beforeEach(async function () {
    console.log();
    console.log("      beforeEach");
    const ERC721Mock  = await ethers.getContractFactory("ERC721Mock");
    const UmswapFactory  = await ethers.getContractFactory("UmswapFactory");
    data = new Data();
    await data.init();

    console.log("        --- Setup Accounts, NFT and Umswap Contracts - Assuming gasPrice: " + ethers.utils.formatUnits(data.gasPrice, "gwei") + " gwei, ethUsd: " + ethers.utils.formatUnits(data.ethUsd, 18) + " ---");

    const erc721Mock = await ERC721Mock.deploy("ERC721Mock", "ERC721MOCK");
    await erc721Mock.deployed();
    await data.setERC721Mock(erc721Mock);
    const erc721MockReceipt = await data.erc721Mock.deployTransaction.wait();
    if (DETAILS > 0) {
      await data.printEvents("Deployed ERC721Mock", erc721MockReceipt);
    }
    console.log("        erc721Mock deployed");

    const umswapFactory = await UmswapFactory.deploy();
    await umswapFactory.deployed();
    await data.setUmswapFactory(umswapFactory);
    const umswapFactoryReceipt = await data.umswapFactory.deployTransaction.wait();
    if (DETAILS > 0) {
      await data.printEvents("Deployed UmswapFactory", umswapFactoryReceipt);
    }
    console.log("        UmswapFactory deployed");

    const setup1 = [];
    setup1.push(data.erc721Mock.mint(data.user0, 111));
    setup1.push(data.erc721Mock.mint(data.user0, 222));
    setup1.push(data.erc721Mock.mint(data.user0, 333));
    setup1.push(data.erc721Mock.mint(data.user1, 444));
    setup1.push(data.erc721Mock.mint(data.user1, 555));
    setup1.push(data.erc721Mock.mint(data.user1, 666));
    const mintATxs = await Promise.all(setup1);
    if (DETAILS > 0) {
      mintATxs.forEach( async function (a) {
        await data.printEvents("Minted ERC721Mock", await a.wait());
      });
    }
    await data.printState("Setup Completed. UmswapFactory bytecode ~" + JSON.stringify(data.umswapFactory.deployTransaction.data.length/2, null, 2));
  });


  it("00. Test 00", async function () {
    console.log("      00. Test 00 - Happy Path 00");

    const tokenIds = [111, 333, 555];
    const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "Odd TokenIds: - test", tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await data.printEvents("Odd TokenIds", await newUmswapTx.wait());

    const umswapAddress = await data.umswapFactory.umswaps(0);
    const umswap  = await ethers.getContractAt("Umswap", umswapAddress);
    data.setUmswap(umswap);

    const approval1Tx = await data.erc721Mock.connect(data.user0Signer).setApprovalForAll(umswapAddress, true);
    await data.printEvents("approval1Tx", await approval1Tx.wait());

    const swapIn1Tx = await umswap.connect(data.user0Signer).swap([111, 333], [], data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("swapIn1Tx", await swapIn1Tx.wait());

    await data.printState("NFT Swapped In");

    const swapOut1Tx = await umswap.connect(data.user0Signer).swap([], [111, 333], data.integrator, { value: ethers.utils.parseEther("0.3333") });
    await data.printEvents("swapOut1Tx", await swapOut1Tx.wait());

    await data.printState("NFT Swapped Out");

    const withdrawal1Tx = await data.umswapFactory.withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("withdrawal1Tx", await withdrawal1Tx.wait());

    await data.printState("Owner Withdrawn");
  });


  it("01. Test 01", async function () {
    console.log("      01. Test 01 - Get Data");
    for (let numberOfTokenIds of [10, 20, 30]) {
      for (let rangeStart of [0, 65]) {
        let tokenIds = generateRange(rangeStart, parseInt(rangeStart) + numberOfTokenIds, 1);
        const name = "Set size " + numberOfTokenIds + " starting " + rangeStart;
        const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, name, tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
        await data.printEvents(name, await newUmswapTx.wait());
      }
    }
    await data.printState("End");
  });


  it("02. Test 02", async function () {
    console.log("      02. Test 02 - New Umswaps with 16, 32, 48 and 256 bit tokenId collections. Note > 2 ** 48 x 1200 close to the current 30m block gas limit");
    for (let numberOfTokenIds of [10, 100, 1200]) {
      for (let rangeStart of [0, 2 ** 16, 2 ** 32, 2 ** 48]) {
        let tokenIds = generateRange(rangeStart, parseInt(rangeStart) + numberOfTokenIds, 1);
        const name = numberOfTokenIds + " items from " + rangeStart;
        const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, name, tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
        await data.printEvents(name, await newUmswapTx.wait());
      }
    }
    console.log("      02. Test 02 - New Umswaps with 16 bit tokenId collections. Note < 2 ** 16 x 3800 close to the current 30m block gas limit");
    for (let numberOfTokenIds of [3800]) {
      for (let rangeStart of [0]) {
        let tokenIds = generateRange(rangeStart, parseInt(rangeStart) + numberOfTokenIds, 1);
        const name = numberOfTokenIds + " items from " + rangeStart;
        const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, name, tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
        await data.printEvents(name, await newUmswapTx.wait());
      }
    }
    await data.printState("End");
  });


  it("03. Test 03", async function () {
    console.log("      03. Test 03 - UmswapFactory Secondary Functions");

    const tx1 = await data.umswapFactory.transferOwnership(data.user0);
    const newOwner = await data.umswapFactory.owner();
    expect(await data.umswapFactory.owner()).to.equal(data.user0);
    console.log("        Tested transferOwnership(...) for success");

    const sendTip1Tx = await data.user0Signer.sendTransaction({ to: data.umswapFactory.address, value: ethers.utils.parseEther("0.888") });
    await expect(
      data.umswapFactory.connect(data.user0Signer).withdraw(ZERO_ADDRESS, 0, 0)
    ).to.emit(data.umswapFactory, "Withdrawn").withArgs(ZERO_ADDRESS, ethers.utils.parseEther("0.888"), 0);
    console.log("        Tested withdraw(ZERO_ADDRESS, ...) for success");

    console.log("      TODO: Test withdrawal of ERC-20s and ERC-721s");
  });


  it("04. Test 04", async function () {
    console.log("      04. Test 04 - UmswapFactory Exceptions");

    const tx1 = await data.umswapFactory.transferOwnership(data.user0);
    await expect(
      data.umswapFactory.transferOwnership(data.user0)
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotOwner");
    console.log("        Tested transferOwnership(...) for error 'NotOwner'");

    await expect(
      data.umswapFactory.newUmswap(data.user0, "name", [1, 2, 3], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotERC721");
    console.log("        Tested newUmswap(...) for error 'NotERC721'");

    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name%", [1, 2, 3], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "InvalidName");
    console.log("        Tested newUmswap(...) for error 'InvalidName'");

    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [2, 2, 3], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "TokenIdsMustBeSortedWithNoDuplicates");
    console.log("        Tested newUmswap(...) for error 'TokenIdsMustBeSortedWithNoDuplicates'");

    const firstTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [1, 2, 3], data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [1, 2, 3], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "DuplicateSet");
    console.log("        Tested newUmswap(...) for error 'DuplicateSet'");

    // const sendTip1Tx = await data.user0Signer.sendTransaction({ to: data.umswapFactory.address, value: ethers.utils.parseEther("0.888") });
    // await data.printState("1");
    // const withdraw1Tx = await data.umswapFactory.withdraw(ZERO_ADDRESS, 0, 0);
    // await data.printState("2");
    await expect(
      data.umswapFactory.connect(data.user1Signer).withdraw(ZERO_ADDRESS, 0, 0)
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotOwner");
    console.log("        Tested withdraw(...) for error 'NotOwner'");
  });


  it("05. Test 05", async function () {
    console.log("      05. Test 05 - TODO: Umswap Secondary/ERC-20 Functions");
  });

  it("06. Test 06", async function () {
    console.log("      06. Test 06 - TODO: Umswap Exceptions");
  });

});
