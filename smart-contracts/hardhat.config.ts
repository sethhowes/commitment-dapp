import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env'});

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/7hyt7IHEHeEpFeldgUYsoB_9M3fNH2R4",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;
