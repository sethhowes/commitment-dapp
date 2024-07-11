"use client";

import { RunCarousel } from "@/components/run-carousel";
import { useEffect, useState } from "react";

import { useReadContract } from "wagmi";
import { abi } from "@/lib/abi";
import { contractAddress } from "@/lib/constants";

import { type Run, IndexedRun } from "@/lib/types";
import UpcomingRunCard from "@/components/upcoming-run-card";

export default function Page() {
  const [runs, setRuns] = useState<IndexedRun[]>([]);
  const { data, isLoading, isError } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllRuns",
  });

  useEffect(() => {
    if (data) {
      // Filter runs so only those with a timestamp in the past appear
      const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
      const runSelection = data
      .map((run: Run, index: number) => ({ ...run, index }))
      .filter((run: IndexedRun) => run.completionDate > currentTimestamp);
      setRuns(runSelection);
      console.log(runSelection);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading runs</div>;
  return (
    <main className="flex-grow items-center flex flex-col">
      <div className="mt-20">
        {runs.length > 1 ? (
          <RunCarousel runs={runs} pastOrUpcoming="upcoming" />
        ) : runs.length === 1 ? (
          <UpcomingRunCard
            index={runs[0].index}
            commitAmount={runs[0].commitAmount}
            completionDate={runs[0].completionDate}
          />
        ) : (
          <div>No upcoming runs found.</div>
        )}
      </div>
    </main>
  );
}
