const { mintNFTService } = require("../services/mintService");

exports.mintNFT = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required"
      });
    }

    const result = await mintNFTService(walletAddress);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
