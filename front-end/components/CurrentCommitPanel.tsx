import Countdown from "./Countdown";

interface RunDetails {
  commitAmount: number;
  completeBy: string;
}

export default function CurrentCommitPanel({
  completeBy,
  commitAmount,
}: RunDetails) {

  return (
    <div className="flex flex-col items-center gap-2 bg-[#D9D9D9] rounded-md w-1/3 py-8">
      <div className="flex flex-row mt-4 items-center">
        <p className="text-3xl p-4">💸 Amount staked:</p>
        <p className="border bg-white py-2 px-4 rounded-lg">
          {commitAmount / 10e9} ETH
        </p>
      </div>
      <Countdown completeBy={completeBy} />
    </div>
  );
}
