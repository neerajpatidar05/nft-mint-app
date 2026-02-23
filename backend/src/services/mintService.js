const { contract } = require("../config/provider");
const { ethers } = require("ethers");

exports.mintNFTService = async (walletAddress) => {

  const mintPrice = await contract.mintPrice();

  const tx = await contract.mint(walletAddress, {
    value: mintPrice
  });

  const receipt = await tx.wait();

  const transferEvent = receipt.logs.find(
    log => log.fragment && log.fragment.name === "Transfer"
  );

  const tokenId = transferEvent.args.tokenId.toString();

  return {
    success: true,
    txHash: receipt.hash,
    tokenId
  };
};
