import Button from "@/components/button";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { abi } from "@/lib/abi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export default function CommitButton() {
  const { isConnected, address } = useAccount();
  const { config, error, isError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "commitRun",
    value: parseEther("0.001"),
    args: [1704663264],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <Button
        disabled={!isConnected || isLoading}
        onClick={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        Commit
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
