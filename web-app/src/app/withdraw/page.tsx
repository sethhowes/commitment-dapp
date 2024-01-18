"use client";

import Heading from "@/app/ui/heading";
import { useBalance, useContractRead, useContractWrite } from "wagmi";
import { abi } from "@/app/lib/abi";
import { CONTRACT_ADDRESS } from "@/app/lib/constants";
import Button from "@/app/ui/button";
import { formatEther } from "viem";

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
    <div className="flex flex-col gap-2">
      <Heading>Withdraw</Heading>
      <div className="bg-white rounded-lg w-48 p-6">
        <span className="text-3xl text-black">
          {formatEther(unlockedData as bigint)}{" "}
        </span>
        <span className="text-lg text-gray-500">{balanceData?.symbol}</span>
      </div>
      <Button
        className="mt-4 w-24"
        onClick={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        Withdraw
      </Button>
    </div>
  );
}
