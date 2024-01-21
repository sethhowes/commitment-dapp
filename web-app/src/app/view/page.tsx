"use client";

import { useContractRead } from "wagmi";
import { abi } from "@/lib/abi";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import RunTable from "@/components/view/run-table";
import NoRuns from "@/components/view/no-runs";
import { RawRunData } from "../../lib/definitions";

export default function Page() {
  const {
    data: runs,
    isError,
    error,
    isLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getAllRuns",
  });

  // Render loading state
  if (isLoading) return <p>Loading...</p>;

  // Render error state
  if (isError) {
    // Check if the error message is specific to no runs committed
    if (error?.message.includes("No runs have been committed to")) {
      return <NoRuns />;
    }
    // Handle other errors
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <RunTable runs={runs as RawRunData[]} />
    </>
  );
}
