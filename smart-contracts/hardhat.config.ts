import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env'});

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/7hyt7IHEHeEpFeldgUYsoB_9M3fNH2R4",
      accounts: ["cf2942f0c2ddae05d1aa2dd6e7988f031decc33d5079726df01f354413ee8974"]
    }
  }
};

export default config;
