import { CONTRACT_ADDRESS } from "@/lib/constants";
import { RawRunData } from "@/lib/definitions";
import { formatRunData, isIntervalPassed } from "@/lib/utils";
import RunCard from "@/components/runs/run-card";
import { useContractWrite } from "wagmi";
import { abi } from "@/lib/abi";

export default function RunDisplay({ runs }: { runs: RawRunData[] }) {
  const { write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "verifyRun",
  });

  const runCards = runs.map((run, index) => {
    const formattedRun = formatRunData(run);
    return <RunCard key={index} formattedRun={formattedRun} index={index} inInterval={isIntervalPassed(run)} />;
  });
  
  return <div className="flex m-10">{runCards}</div>;
}
