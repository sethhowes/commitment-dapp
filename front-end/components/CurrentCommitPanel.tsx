import formatDate from "../utils/formatDate";
import verifyRun from "../utils/verifyRun";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import { useState } from "react";
import getLatestRunDetails from "../utils/getLatestRunDetails";
import LoadingContents from "./LoadingContents";
import VerifyResultModal from "./VerifyResultModal";

interface RunDetails {
  onUpdateParentState: () => void;
  commitAmount: number;
  completeBy: string;
}

export default function CurrentCommitPanel({
  onUpdateParentState,
  completeBy,
  commitAmount,
}: RunDetails) {

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: signer } = useSigner();

  const onVerifyClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const status = await verifyRun(signer as Signer);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const { completed: checkRunComplete } = await getLatestRunDetails();
    console.log(checkRunComplete)
    setShowModal(true);
    setCompleted(checkRunComplete);
    setLoading(false);
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
            className="py-3 w-32 my-4 bg-red-600 hover:bg-red-800 text-white rounded-2xl drop-shadow-lg cursor-pointer"
            disabled={loading}
            onClick={(e) => {
              onVerifyClicked(e);
            }}
          >
             <LoadingContents loading={loading} buttonText="Verify Run" />
          </button>
          <VerifyResultModal onUpdateParentState={onUpdateParentState} completed={completed} show={showModal} onClose={() => setShowModal(false)}/>
        </div>
      )}
    </div>
  );
}
