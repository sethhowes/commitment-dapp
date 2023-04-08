import contract from "./contract";
import { utils } from 'ethers';

export default async function getLatestRunDetails() {
      let { commitAmount, completeBy, completed, checked } = await contract.getLatestRun();
      // Formats wei in hex to ether in decimal
      commitAmount = utils.formatEther(commitAmount);
      // Formats time as decimal unix timestamp
      completeBy = parseInt(completeBy, 10);
      return {
        commitAmount: commitAmount,
        completeBy: completeBy,
        completed: completed,
        checked: checked,
      };
  }