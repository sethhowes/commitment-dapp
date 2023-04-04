import { Signer } from "ethers";
import contract from "./contract";

export default async function verifyRun(signer: Signer) {
    const contractWithSigner = contract.connect(signer);
    try {
      const tx = await contractWithSigner.verify();
      return "Run was successfully verified!";
    } catch (err) {
      console.log(err)
      return "Uh oh 😳. " + err.reason.split(":")[1];
    }
  }