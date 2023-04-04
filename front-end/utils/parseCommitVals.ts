import { ethers } from 'ethers';

export default async function parseCommitVals(dateString: string, amountString: string) {
    // Convert date to UNIX time
    const currentDate = new Date(Date.now());
    currentDate.setHours(currentDate.getHours() + Number(dateString));
    currentDate.setMinutes(0);
    const unixTime = Math.round(currentDate.getTime() / 1000);
    // TEMP COMMIT TWO MINUTES IN THE FUTURE
    const TESTTIME = Math.round(Date.now() / 1000) + 120
    // Convert amount
    const amountEth = ethers.utils.parseEther(amountString);
    return {
      amount: amountEth,
      commitDate: unixTime,
    }
  }