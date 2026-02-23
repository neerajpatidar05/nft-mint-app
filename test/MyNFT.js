const { expect } = require("chai");

describe("MyNFT", function () {
  let nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy("https://base/");
  });

  it("Should mint successfully", async function () {
    await nft.mint(addr1.address, { value: ethers.parseEther("1") });
    expect(await nft.totalMinted()).to.equal(1);
  });

  it("Should enforce max supply", async function () {
    for (let i = 0; i < 5; i++) {
      await nft.mint(owner.address, { value: ethers.parseEther("1") });
    }

    await expect(
      nft.mint(owner.address, { value: ethers.parseEther("1") })
    ).to.be.revertedWith("Max supply reached");
  });

  it("Should validate payment", async function () {
    await expect(
      nft.mint(owner.address, { value: ethers.parseEther("0.5") })
    ).to.be.revertedWith("Incorrect MATIC amount");
  });

  it("Only owner can update price", async function () {
    await expect(
      nft.connect(addr1).updateMintPrice(2)
    ).to.be.reverted;
  });
});
