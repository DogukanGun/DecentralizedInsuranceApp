/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "testnet_aurora",
  networks: {
     hardhat: {},
     testnet_aurora: {
        chainId: 1313161555,
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
  },
}