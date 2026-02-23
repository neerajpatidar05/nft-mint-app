const express = require("express");
const router = express.Router();
const { mintNFT } = require("../controllers/mintController");

router.post("/mint", mintNFT);

module.exports = router;
