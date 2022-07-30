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
    console.log("      00. Test 00 - Happy Path - Specified Set");

    const tokenIds = [111, 333, 555];
    const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "Odd TokenIds: - test", tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await data.printEvents("deployer->factory.newUmswap(erc721Mock, " + JSON.stringify(tokenIds) + ")", await newUmswapTx.wait());

    const umswapAddress = await data.umswapFactory.umswaps(0);
    const umswap  = await ethers.getContractAt("Umswap", umswapAddress);
    data.setUmswap(umswap);

    const approval1Tx = await data.erc721Mock.connect(data.user0Signer).setApprovalForAll(umswapAddress, true);
    await data.printEvents("user0->erc721Mock.setApprovalForAll(umswap, true)", await approval1Tx.wait());
    await data.printState("Before Any Umswaps");

    const swapInIds = [111, 333];
    const swapIn1Tx = await umswap.connect(data.user0Signer).swap(swapInIds, [], data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->umswap(" + JSON.stringify(swapInIds) + ", [], ...)", await swapIn1Tx.wait());
    await data.printState("user0 swapped in " + JSON.stringify(swapInIds));

    const transferAmount = "0.54321";
    const transfer1Tx = await umswap.connect(data.user0Signer).transfer(data.user1, ethers.utils.parseEther(transferAmount));
    await data.printEvents("user0->umswap.transfer(user1, " + transferAmount + ")", await transfer1Tx.wait());
    await data.printState("user0 transferred " + transferAmount + " umswaps to user1");

    const swapOutIds1 = [111];
    const swapOut1Tx = await umswap.connect(data.user0Signer).swap([], swapOutIds1, data.integrator, { value: ethers.utils.parseEther("0.3333") });
    await data.printEvents("user0->umswap.swap([], " + JSON.stringify(swapOutIds1) + ", ...)", await swapOut1Tx.wait());
    await data.printState("user0 swapped out " + JSON.stringify(swapOutIds1));

    const approveAmount = "0.45679";
    const approve1Tx = await umswap.connect(data.user0Signer).approve(data.user1, ethers.utils.parseEther(approveAmount));
    await data.printEvents("user0->umswap.approve(user1, " + approveAmount + ")", await approve1Tx.wait());
    await data.printState("user0 approved user1 to transfer " + approveAmount + " umswaps");

    const transferFromAmount = "0.45679";
    const transferFrom = await umswap.connect(data.user1Signer).transferFrom(data.user0, data.user1, ethers.utils.parseEther(transferFromAmount));
    await data.printEvents("user1->umswap.transferFrom(user0, user1, " + transferFromAmount + ")", await transferFrom.wait());
    await data.printState("user1 transferred " + transferFromAmount + " umswaps from user0");

    const swapOutIds2 = [333];
    const swapOut2Tx = await umswap.connect(data.user1Signer).swap([], swapOutIds2, data.integrator, { value: ethers.utils.parseEther("0.3333") });
    await data.printEvents("user1->umswap.swap([], " + JSON.stringify(swapOutIds2) + ", ...)", await swapOut2Tx.wait());
    await data.printState("user1 swapped out " + JSON.stringify(swapOutIds2));

    const withdrawal1Tx = await data.umswapFactory.withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("deployer->umswapFactory.withdraw(address(0), 0, 0)", await withdrawal1Tx.wait());
    await data.printState("Deployer Withdrawn");
  });


  it("01. Test 01", async function () {
    console.log("      01. Test 01 - Happy Path - Whole Collection");

    const tokenIds = [];
    const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "Odd TokenIds: - test", tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await data.printEvents("deployer->factory.newUmswap(erc721Mock, " + JSON.stringify(tokenIds) + ")", await newUmswapTx.wait());

    const umswapAddress = await data.umswapFactory.umswaps(0);
    const umswap  = await ethers.getContractAt("Umswap", umswapAddress);
    data.setUmswap(umswap);

    const approval1Tx = await data.erc721Mock.connect(data.user0Signer).setApprovalForAll(umswapAddress, true);
    await data.printEvents("user0->erc721Mock.setApprovalForAll(umswap, true)", await approval1Tx.wait());
    await data.printState("Before Any Umswaps");

    const swapInIds = [111, 333];
    const swapIn1Tx = await umswap.connect(data.user0Signer).swap(swapInIds, [], data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->umswap(" + JSON.stringify(swapInIds) + ", [], ...)", await swapIn1Tx.wait());
    await data.printState("user0 swapped in " + JSON.stringify(swapInIds));

    const transferAmount = "0.54321";
    const transfer1Tx = await umswap.connect(data.user0Signer).transfer(data.user1, ethers.utils.parseEther(transferAmount));
    await data.printEvents("user0->umswap.transfer(user1, " + transferAmount + ")", await transfer1Tx.wait());
    await data.printState("user0 transferred " + transferAmount + " umswaps to user1");

    const swapOutIds1 = [111];
    const swapOut1Tx = await umswap.connect(data.user0Signer).swap([], swapOutIds1, data.integrator, { value: ethers.utils.parseEther("0.3333") });
    await data.printEvents("user0->umswap.swap([], " + JSON.stringify(swapOutIds1) + ", ...)", await swapOut1Tx.wait());
    await data.printState("user0 swapped out " + JSON.stringify(swapOutIds1));

    const approveAmount = "0.45679";
    const approve1Tx = await umswap.connect(data.user0Signer).approve(data.user1, ethers.utils.parseEther(approveAmount));
    await data.printEvents("user0->umswap.approve(user1, " + approveAmount + ")", await approve1Tx.wait());
    await data.printState("user0 approved user1 to transfer " + approveAmount + " umswaps");

    const transferFromAmount = "0.45679";
    const transferFrom = await umswap.connect(data.user1Signer).transferFrom(data.user0, data.user1, ethers.utils.parseEther(transferFromAmount));
    await data.printEvents("user1->umswap.transferFrom(user0, user1, " + transferFromAmount + ")", await transferFrom.wait());
    await data.printState("user1 transferred " + transferFromAmount + " umswaps from user0");

    const swapOutIds2 = [333];
    const swapOut2Tx = await umswap.connect(data.user1Signer).swap([], swapOutIds2, data.integrator, { value: ethers.utils.parseEther("0.3333") });
    await data.printEvents("user1->umswap.swap([], " + JSON.stringify(swapOutIds2) + ", ...)", await swapOut2Tx.wait());
    await data.printState("user1 swapped out " + JSON.stringify(swapOutIds2));

    const withdrawal1Tx = await data.umswapFactory.withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("deployer->umswapFactory.withdraw(address(0), 0, 0)", await withdrawal1Tx.wait());
    await data.printState("Deployer Withdrawn");
  });


  it("02. Test 02", async function () {
    console.log("      02. Test 02 - Get Data");
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


  it("03. Test 03", async function () {
    console.log("      03. Test 03 - New Umswaps with 16, 32, 64 and 256 bit tokenId collections. Note > 2 ** 64 x 1200 close to failure at the current 30m block gas limit");
    for (let numberOfTokenIds of [10, 100, 1200]) {
      for (let rangeStart of ["0x0", "0xffff", "0xffffffff", "0xffffffffffffffff"]) {
        let tokenIds = generateRange(0, numberOfTokenIds, 1);
        const rangeStartBN = ethers.BigNumber.from(rangeStart);
        tokenIds = tokenIds.map((i) => rangeStartBN.add(i));
        const name = numberOfTokenIds + " items from " + rangeStart;
        const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, name, tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
        await data.printEvents(name, await newUmswapTx.wait());
      }
    }
    console.log("      02. Test 02 - New Umswaps with 16 bit tokenId collections. Note < 2 ** 16 x 3800 close to the current 30m block gas limit. 4k fails");
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


  it("04. Test 04", async function () {
    console.log("      04. Test 04 - UmswapFactory Withdrawal Of ETH/ERC-20/ERC-721 Tokens");

    const tokenIds = [111, 333, 555];
    const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "Odd TokenIds: - test", tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await data.printEvents("deployer->factory.newUmswap(erc721Mock, " + JSON.stringify(tokenIds) + ")", await newUmswapTx.wait());

    const umswapAddress = await data.umswapFactory.umswaps(0);
    const umswap  = await ethers.getContractAt("Umswap", umswapAddress);
    data.setUmswap(umswap);

    const approval1Tx = await data.erc721Mock.connect(data.user0Signer).setApprovalForAll(umswapAddress, true);
    await data.printEvents("user0->erc721Mock.setApprovalForAll(umswap, true)", await approval1Tx.wait());
    await data.printState("Before Any Umswaps");

    const swapInIds = [111, 333];
    const swapIn1Tx = await umswap.connect(data.user0Signer).swap(swapInIds, [], data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->umswap(" + JSON.stringify(swapInIds) + ", [], ...)", await swapIn1Tx.wait());
    await data.printState("user0 swapped in " + JSON.stringify(swapInIds));

    const transferAmount = "0.54321";
    const transfer1Tx = await umswap.connect(data.user0Signer).transfer(data.umswapFactory.address, ethers.utils.parseEther(transferAmount));
    await data.printEvents("user0->umswap.transfer(umswapFactory, " + transferAmount + ")", await transfer1Tx.wait());
    await data.printState("user0 transferred " + transferAmount + " umswaps to umswapFactory");

    const transferFrom1Tx = await data.erc721Mock.connect(data.user0Signer).transferFrom(data.user0, data.umswapFactory.address, 222);
    await data.printEvents("user0->erc721Mock.transferFrom(user0, umswapFactory, 222)", await transferFrom1Tx.wait());
    await data.printState("Before Any Umswaps");

    const tx1 = await data.umswapFactory.transferOwnership(data.user2);
    expect(await data.umswapFactory.owner()).to.equal(data.user2);
    console.log("        Tested deployer->umswapFactory.transferOwnership(user2) - success");

    const withdrawal1Tx = await data.umswapFactory.connect(data.user2Signer).withdraw(ZERO_ADDRESS, ethers.utils.parseEther("0.01111"), 0);
    await data.printEvents("user2->umswapFactory.withdraw(ZERO_ADDRESS, 0.01111, 0)", await withdrawal1Tx.wait());
    const withdrawal1TxReceipt = await ethers.provider.getTransactionReceipt(withdrawal1Tx.hash);
    const event1 = data.umswapFactory.interface.decodeEventLog("Withdrawn", withdrawal1TxReceipt.logs[0].data, withdrawal1TxReceipt.logs[0].topics);
    expect(event1[2]).to.equal(ZERO_ADDRESS);
    expect(event1[3]).to.equal(ethers.utils.parseEther("0.01111"));
    console.log("        Tested user2->umswapFactory.withdraw(ZERO_ADDRESS, 0.01111, 0) - success");

    const withdrawal2Tx = await data.umswapFactory.connect(data.user2Signer).withdraw(umswap.address, ethers.utils.parseEther("0.11111"), 0);
    await data.printEvents("user2->umswapFactory.withdraw(umswap, 0.11111, 0)", await withdrawal2Tx.wait());
    const withdrawal2TxReceipt = await ethers.provider.getTransactionReceipt(withdrawal2Tx.hash);
    const event2 = data.umswapFactory.interface.decodeEventLog("Withdrawn", withdrawal2TxReceipt.logs[1].data, withdrawal2TxReceipt.logs[1].topics);
    expect(event2[2]).to.equal(umswap.address);
    expect(event2[3]).to.equal(ethers.utils.parseEther("0.11111"));
    console.log("        Tested user2->umswapFactory.withdraw(umswap, 0.11111, 0) - success");

    await data.printState("After Partial Withdraws");

    const withdrawal3Tx = await data.umswapFactory.connect(data.user2Signer).withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("user2->umswapFactory.withdraw(ZERO_ADDRESS, 0, 0)", await withdrawal3Tx.wait());
    const withdrawal3TxReceipt = await ethers.provider.getTransactionReceipt(withdrawal3Tx.hash);
    const event3 = data.umswapFactory.interface.decodeEventLog("Withdrawn", withdrawal3TxReceipt.logs[0].data, withdrawal3TxReceipt.logs[0].topics);
    expect(event3[2]).to.equal(ZERO_ADDRESS);
    expect(event3[3]).to.equal(ethers.utils.parseEther("0.05555"));
    console.log("        Tested user2->umswapFactory.withdraw(ZERO_ADDRESS, 0 => 0.05555, 0) - success");

    const withdrawal4Tx = await data.umswapFactory.connect(data.user2Signer).withdraw(umswap.address, 0, 0);
    await data.printEvents("user2->umswapFactory.withdraw(umswap, 0, 0)", await withdrawal4Tx.wait());
    const withdrawal4TxReceipt = await ethers.provider.getTransactionReceipt(withdrawal4Tx.hash);
    const event4 = data.umswapFactory.interface.decodeEventLog("Withdrawn", withdrawal4TxReceipt.logs[1].data, withdrawal4TxReceipt.logs[1].topics);
    expect(event4[2]).to.equal(umswap.address);
    expect(event4[3]).to.equal(ethers.utils.parseEther("0.4321"));
    console.log("        Tested user2->umswapFactory.withdraw(umswap, 0 => 0.4321, 0) - success");

    const withdrawal5Tx = await data.umswapFactory.connect(data.user2Signer).withdraw(data.erc721Mock.address, 0, 222);
    await data.printEvents("user2->umswapFactory.withdraw(erc721Mock, 0, 222)", await withdrawal5Tx.wait());
    const withdrawal5TxReceipt = await ethers.provider.getTransactionReceipt(withdrawal5Tx.hash);
    const event5 = data.umswapFactory.interface.decodeEventLog("Withdrawn", withdrawal5TxReceipt.logs[2].data, withdrawal5TxReceipt.logs[2].topics);
    expect(event5[2]).to.equal(data.erc721Mock.address);
    expect(event5[4]).to.equal(222);
    console.log("        Tested user2->umswapFactory.withdraw(erc721Mock, 0, 222) - success");

    await data.printState("After Withdraws");
  });


  it("05. Test 05", async function () {
    console.log("      05. Test 05 - UmswapFactory Exceptions");

    const tx1 = await data.umswapFactory.transferOwnership(data.user0);
    await expect(
      data.umswapFactory.transferOwnership(data.user0)
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotOwner");
    console.log("        Tested transferOwnership(...) for error 'NotOwner'");

    await expect(
      data.umswapFactory.newUmswap(data.user0, "name", [111, 222, 333], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotERC721");
    console.log("        Tested newUmswap(...) for error 'NotERC721'");

    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name%", [111, 222, 333], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "InvalidName");
    console.log("        Tested newUmswap(...) for error 'InvalidName'");

    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [222, 222, 333], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "TokenIdsMustBeSortedWithNoDuplicates");
    console.log("        Tested newUmswap(...) for error 'TokenIdsMustBeSortedWithNoDuplicates'");

    const firstTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [111, 222, 333], data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await expect(
      data.umswapFactory.newUmswap(data.erc721Mock.address, "name", [111, 222, 333], data.integrator, { value: ethers.utils.parseEther("0.1111") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "DuplicateSet");
    console.log("        Tested newUmswap(...) for error 'DuplicateSet'");

    await expect(
      data.umswapFactory.connect(data.user1Signer).withdraw(ZERO_ADDRESS, 0, 0)
    ).to.be.revertedWithCustomError(data.umswapFactory, "NotOwner");
    console.log("        Tested withdraw(...) for error 'NotOwner'");
  });


  it("06. Test 06", async function () {
    console.log("      06. Test 06 - TODO: Umswap Additional Tests");

    const tokenIds = [111, 333, 555];
    const newUmswapTx = await data.umswapFactory.newUmswap(data.erc721Mock.address, "Odd TokenIds: - test", tokenIds, data.integrator, { value: ethers.utils.parseEther("0.1111") });
    await data.printEvents("deployer->factory.newUmswap(erc721Mock, " + JSON.stringify(tokenIds) + ")", await newUmswapTx.wait());

    const umswapsLength = await data.umswapFactory.getUmswapsLength();
    expect(await data.umswapFactory.getUmswapsLength()).to.equal(1);
    console.log("        Tested newUmswap(...) - success");

    const umswapAddress = await data.umswapFactory.umswaps(0);
    const umswap  = await ethers.getContractAt("Umswap", umswapAddress);
    data.setUmswap(umswap);

    const approval1Tx = await data.erc721Mock.connect(data.user0Signer).setApprovalForAll(umswapAddress, true);
    await data.printEvents("user0->erc721Mock.setApprovalForAll(umswap, true)", await approval1Tx.wait());
    await data.printState("Before Any Umswaps");

    const swapInIds = [111, 333];
    const swapIn1Tx = await umswap.connect(data.user0Signer).swap(swapInIds, [], data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->umswap(" + JSON.stringify(swapInIds) + ", [], ...)", await swapIn1Tx.wait());
    await data.printState("user0 swapped in " + JSON.stringify(swapInIds));

    const rate1Tx =  await umswap.connect(data.user0Signer).rate(5, "Yeah 5", data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->rate(5, 'Yeah', ...)", await rate1Tx.wait());
    await data.printState("user0 rated 5");

    const rate2Tx =  await umswap.connect(data.user1Signer).rate(6, "Yeah 6", data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user1->rate(6, 'Yeah', ...)", await rate2Tx.wait());
    await data.printState("user1 rated 6");

    const rate3Tx =  await umswap.connect(data.user0Signer).rate(10, "Yeah 10", data.integrator, { value: ethers.utils.parseEther("0.2222") });
    await data.printEvents("user0->rate(10, 'Yeah', ...)", await rate3Tx.wait());
    await data.printState("user0 rated 10");

    const sendMessage1Tx =  await data.umswapFactory.connect(data.user1Signer).message(ZERO_ADDRESS, ZERO_ADDRESS, "Topic 1", "Hello world!", data.integrator, { value: ethers.utils.parseEther("0.55555") });
    await data.printEvents("user1->message(0x0, 0x0, 'Hello world!', ...)", await sendMessage1Tx.wait());

    const sendMessage2Tx =  await data.umswapFactory.connect(data.user1Signer).message(ZERO_ADDRESS, umswap.address, "Topic 2", "Hello world! - specific umswap", data.integrator, { value: ethers.utils.parseEther("0.55555") });
    await data.printEvents("user1->message(0x0, umswap, 'Hello world!', ...)", await sendMessage2Tx.wait());

    const blah1 = "🤪 Blah ".repeat(280/10);
    const sendMessage3Tx =  await data.umswapFactory.connect(data.user2Signer).message(ZERO_ADDRESS, ZERO_ADDRESS, "Topic 3", blah1, data.integrator, { value: ethers.utils.parseEther("0.55555") });
    await data.printEvents("user2->message(0x0, 0x0, '(long message)', ...)", await sendMessage3Tx.wait());

    await expect(
      data.umswapFactory.connect(data.user2Signer).message(ZERO_ADDRESS, data.user0, "Should Fail - InvalidTopic    1234567890123456789", "Hello world!", data.integrator, { value: ethers.utils.parseEther("0.55555") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "InvalidTopic");
    console.log("        Tested message(...) for error 'InvalidTopic'");

    await expect(
      data.umswapFactory.connect(data.user2Signer).message(ZERO_ADDRESS, data.user0, "Should Fail - InvalidUmswap", "Hello world!", data.integrator, { value: ethers.utils.parseEther("0.55555") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "InvalidUmswap");
    console.log("        Tested message(...) for error 'InvalidUmswap'");

    const blah2 = "Blah".repeat(280/4) + "a";
    await expect(
      data.umswapFactory.connect(data.user2Signer).message(ZERO_ADDRESS, data.user0, "Should Fail - InvalidMessage", blah2, data.integrator, { value: ethers.utils.parseEther("0.55555") })
    ).to.be.revertedWithCustomError(data.umswapFactory, "InvalidMessage");
    console.log("        Tested message(...) for error 'InvalidMessage'");

    await data.printState("users 1 & 2 sent messages");
  });


  // it("07. Test 07", async function () {
  //   console.log("      07. Test 07 - TODO: Umswap Exceptions");
  // });

});
