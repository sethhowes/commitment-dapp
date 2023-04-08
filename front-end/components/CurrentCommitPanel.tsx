import formatDate from "../utils/formatDate";
import verifyRun from "../utils/verifyRun";
import { useSigner } from "wagmi";
import { Signer } from "ethers";

interface RunDetails {
  commitAmount: number;
  completeBy: string;
}

export default function CurrentCommitPanel({
  completeBy,
  commitAmount,
}: RunDetails) {
  const { data: signer } = useSigner();

  const onVerifyClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await verifyRun(signer as Signer);
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-[#D9D9D9] rounded-md w-1/3 py-8 mt-8">
      <div className="flex flex-row mt-4 items-center">
        <p className="text-3xl p-4">💸 Amount staked:</p>
        <p className="border bg-white py-2 px-4 rounded-lg">
          {commitAmount} ETH
        </p>
      </div>
      {Number(completeBy) * 1000 > Date.now() ? (
        <div className="flex flex-row my-4 items-center">
          <p className="text-3xl p-4">⏳ Complete by:</p>
          <p className="border bg-white py-2 px-4 rounded-lg">
            {formatDate(completeBy)}
          </p>
        </div>
      ) : (
        <div className="flex flex-col my-4 items-center">
          <p className="text-3xl p-3">⏰ Time up!</p>
          <button
            className="py-3 w-32 my-4 bg-[#B90202] text-white rounded-2xl drop-shadow-lg"
            onClick={(e) => {
              onVerifyClicked(e);
            }}
          >
            Verify Run
          </button>
        </div>
      )}
    </div>
  );
}
