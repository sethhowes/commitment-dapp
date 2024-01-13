"use client";

import { ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import { setToTomorrow, setToNextHour, getUnixTimestampAsInt } from "@/app/lib/utils";
import { abi } from "@/app/lib/abi";
import { CONTRACT_ADDRESS } from "@/app/lib/constants";
import { usePrepareContractWrite, useContractWrite, useNetwork } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import Button from "@/app/ui/button";
import clsx from "clsx";

export default function CommitForm() {
  const { isConnected } = useAccount();
  const [commitAmount, setCommitAmount] = useState("0.01");
  const [endCommitDate, setEndCommitDate] = useState(setToTomorrow());
  const [startCommitDate, setStartCommitDate] = useState(setToNextHour());
  const { chain } = useNetwork();
  const { config, error, isError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "commitRun",
    value: parseEther(commitAmount),
    args: [getUnixTimestampAsInt(startCommitDate), getUnixTimestampAsInt(endCommitDate)],
    onError(error) {
      console.log("Error", error);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <form>
      <fieldset disabled={isLoading} className={clsx(
        {"cursor-not-allowed:": isLoading},
      )}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Commit amount */}
          <div className="mb-4">
            <label
              htmlFor="commit-amount"
              className="mb-2 block text-sm font-medium text-black"
              >
              Commit amount
            </label>
            <div className="relative">
              <input
                id="commit-amount"
                name="commitAmount"
                type="number"
                step="0.01"
                min="0"
                onChange={(e) => setCommitAmount(e.target.value)}
                placeholder={`Enter ${chain?.name} amount`}
                className="peer block w-full text-black cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={commitAmount}
                />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="start-commit-date"
              className="mb-2 block text-sm font-medium text-black"
              >
              Start commit date
            </label>
            <div className="relative">
              <input
                id="start-commit-date"
                name="startCommitDate"
                type="datetime-local"
                className="peer block w-full text-black cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={startCommitDate}
                onChange={(e) => setStartCommitDate(e.target.value)}
                />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="end-commit-date"
              className="mb-2 block text-sm font-medium text-black"
              >
              End commit date
            </label>
            <div className="relative">
              <input
                id="end-commit-date"
                name="endCommitDate"
                type="datetime-local"
                className="peer block w-full text-black cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={endCommitDate}
                onChange={(e) => setEndCommitDate(e.target.value)}
                />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!isConnected}
            className="mt-4"
            onClick={(e) => {
              e.preventDefault();
              write?.();
            }}
            >
            Commit!
          </Button>
          {isLoading && <div>Check Wallet</div>}
        </div>
      </fieldset>
    </form>
  );
}
