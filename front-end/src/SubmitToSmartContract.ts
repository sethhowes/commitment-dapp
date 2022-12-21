import ethers from "ethers";

export default function submitToSmartContract(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const completeBy = new Date(event.target.completeBy.value);

    

}