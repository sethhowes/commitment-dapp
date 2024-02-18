"use client";

import { useBalance, useContractRead, useContractWrite } from "wagmi";
import { abi } from "@/lib/abi";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import WithdrawPanel from "@/components/withdraw/withdraw-panel";

export default function Page() {
  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  const { data: unlockedData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getUnlockedAmount",
  });

  const { isLoading, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "withdraw",
  });
  return (
    <div className="flex mt-40 gap-20 items-center justify-center">
      <h1 className="text-5xl w-1/3 ml-20 text-white">
        Click to withdraw funds to your wallet.
      </h1>
      <WithdrawPanel unlockedData={unlockedData} balanceData={balanceData} />
    </div>
  );
}
