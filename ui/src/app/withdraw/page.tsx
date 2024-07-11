"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  useBalance,
  useReadContract,
  useChainId,
  useWriteContract,
} from "wagmi";
import { contractAddress } from "@/lib/constants";
import { formatEther } from "viem";
import { getChainData } from "@/lib/utils";
import { abi } from "@/lib/abi";
import { Button } from "@/components/ui/button";
import DisabledWithdrawButton from "@/components/disabled-withdraw-button";

export default function WithdrawPage() {
  const chainId = useChainId();
  const { tokenSymbol } = getChainData(chainId);

  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useBalance({
    address: contractAddress,
  });

  const {
    data: unlockedAmount,
    isError: isUnlockedError,
    isLoading: isUnlockedLoading,
  } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getUnlockedAmount",
  });

  const renderBalance = () => {
    if (isBalanceLoading) return <p>Loading balance...</p>;
    if (isBalanceError) return <p>Error fetching balance</p>;
    return <p>{`${formatEther(balance.value)} ${tokenSymbol}`}</p>;
  };

  const renderUnlockedAmount = () => {
    if (isUnlockedLoading) return <p>Loading unlocked amount...</p>;
    if (isUnlockedError) return <p>Error fetching unlocked amount</p>;
    return <p>{`${formatEther(unlockedAmount)} ${tokenSymbol}`}</p>;
  };

  const { writeContract } = useWriteContract();

  function handleClick() {
    console.log("Withdraw button clicked");
    writeContract({
      address: contractAddress,
      abi,
      functionName: "withdraw",
    });
  }

  return (
    <main className="p-8 flex flex-col items-center flex-grow">
      <div className="mt-20 w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw</CardTitle>
            <CardDescription>Withdraw unlocked funds.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center px-16 gap-10 pb-10">
            <div className="flex justify-between">
              <div className="text-center">
                <h2 className="text-lg mb-2"><span className="font-semibold">Unlocked</span> balance</h2>
                {renderUnlockedAmount()}
              </div>
              <div className="text-center">
                <h2 className="text-lg mb-2"><span className="font-semibold">Locked</span> balance</h2>
                {renderBalance()}
              </div>
            </div>
            {Number(unlockedAmount) != 0 && <Button onClick={handleClick}>Withdraw</Button>}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
