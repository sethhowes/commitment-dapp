import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    defaultNetwork: "amoy",
    networks: {
        amoy: {
        url: `${process.env.AMOY_RPC_URL}${process.env.AMOY_API_KEY}`,
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