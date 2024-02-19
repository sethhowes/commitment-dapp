import { BanknotesIcon, FlagIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button";
import { FormattedRunData } from "@/lib/definitions";
import { abi } from "@/lib/abi";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { useContractWrite } from "wagmi";
import { format } from "path";

export default function RunCard({
  formattedRun,
  index,
  inInterval
}: {
  formattedRun: FormattedRunData;
  index: number;
  inInterval: boolean;
}) {
  const { write } = useContractWrite({
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

  return (
    <div className="w-56 h-56 bg-white shadow-lg rounded-lg gap-2 p-4 flex flex-col justify-center">
      <h2 className="text-wrap text-black text-xl">
        Start time: {formattedRun.startTime}
      </h2>
      <h2 className="text-wrap text-black text-xl">
        End time: {formattedRun.endTime}
      </h2>
      <div className="flex text-gray-500 gap-2">
        <BanknotesIcon className="w-6 h-6" />
        <p>{formattedRun.commitAmount} ETH</p>
      </div>
      <Button
        disabled={formattedRun.checked || !inInterval}
        onClick={() => handleClick(index)}
      >
        Check
      </Button>
    </div>
  );
}
