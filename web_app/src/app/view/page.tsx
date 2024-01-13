"use client"

import { useContractRead } from "wagmi"
import { abi } from "@/app/lib/abi"
import { CONTRACT_ADDRESS } from "@/app/lib/constants"
import RunTable from "@/app/ui/view/run-table"
import NoRuns from "@/app/ui/view/no-runs"

export default function Page() {

  const { data: runs, isError, error, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'getAllRuns',
  })
  console.log(runs)

    // Render loading state
    if (isLoading) return <p>Loading...</p>

    // Render error state
    if (isError) {
      // Check if the error message is specific to no runs committed
      if (error?.message.includes("No runs have been committed to")) {
        return <NoRuns />
      }
      // Handle other errors
      return <p>Error: {error?.message}</p>
    }

  return (
    <>
      <RunTable runs={runs}/>
    </>
  )
}