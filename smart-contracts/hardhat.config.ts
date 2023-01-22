import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env'});

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/1b3444ad206a44bb9fef6ab15c04f2ce",
      accounts: ["09725b94bd03edc5ede75d4085066a584a9ec3f9348ba70066d77e3a4a7ae063"]
    }
  }
};

export default config;
