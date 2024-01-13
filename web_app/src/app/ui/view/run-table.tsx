import { CONTRACT_ADDRESS } from "@/app/lib/constants";
import { RawRunData } from "@/app/lib/definitions";
import { formatRunData } from "@/app/lib/utils";
import Button from "@/app/ui/button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "@/app/lib/abi";

export default function RunTable({ runs }: { runs: RawRunData[] }) {
  const { error, isError, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "verifyRun",
    onError(error) {
      console.log("Error", error);
    },
  });

  const handleClick = (index: number) => {
    console.log("clicked", index);
    write?.({
      args: [index],
    });
  };

  const rows = runs.map((run, index) => {
    const formattedRun = formatRunData(run);
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{formattedRun.startTime}</td>
        <td>{formattedRun.endTime}</td>
        <td>{formattedRun.commitAmount}</td>
        <td>{formattedRun.completed}</td>
        <td>
          <Button
            disabled={formattedRun.checked}
            onClick={() => handleClick(index)}
          >
            Check
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Run ID</th>
          <th>Commit Start</th>
          <th>Commit End</th>
          <th>Commit Amount</th>
          <th>Completed</th>
          <th>Checked</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
