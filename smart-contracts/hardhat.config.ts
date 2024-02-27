import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    defaultNetwork: "mumbai",
    networks: {
        sepolia: {
        url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`,
        accounts: [process.env.PRIVATE_KEY!]
        },
        mumbai: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
        accounts: [process.env.PRIVATE_KEY!],
        },
    },
    etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY || "",
        customChains: [
          {
            network: "mumbai",
            chainId: 80001,
            urls: {
              apiURL: "https://api-testnet.polygonscan.com/api",
              browserURL: "https://mumbai.polygonscan.com"
            }
          }
        ]
      }
      
};

export default config;