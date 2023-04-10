import { Signer } from "ethers";
import contract from "./contract";

export default async function verifyRun(signer: Signer) {
    const contractWithSigner = contract.connect(signer);
    try {
      const tx = await contractWithSigner.verifyRun();
      tx.wait();
      console.log("Run verified!");
    } catch (err) {
      console.log(err);
  }
}