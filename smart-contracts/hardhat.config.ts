import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config();
const {GOERLI_API_KEY, PRIVATE_KEY} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${GOERLI_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
