<<<<<<< HEAD
Project Title

NFT Minting API – Polygon Testnet

Features

ERC-721 NFT Contract

Max Supply = 5

Configurable Mint Price

Secure Withdraw

Reentrancy Protection

Express Mint API

Hardhat Unit Tests


Setup Instructions
Install dependencies
npm install

RPC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=

Deploy Contract
npx hardhat run scripts/deploy.js --network amoy

Run Tests
npx hardhat test

Run API
node server.js

curl -X POST http://localhost:3001/mint \
-H "Content-Type: application/json" \
-d '{"walletAddress":"0x..."}'
=======
# Interview
>>>>>>> 7b95fb98ff33a8eba85e9f742943db6c618a9056
