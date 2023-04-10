import { useState } from "react";
import { addHoursToNow } from "../utils/addHoursToNow";
import parseCommitVals from "../utils/parseCommitVals";
import contract from "../utils/contract";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import LoadingContents from "./LoadingContents";

export default function CommitForm({ onSuccess }) {
  const [amountCommitted, setAmountCommitted] = useState("");
  const [commitDate, setCommitDate] = useState(addHoursToNow("24"));
  const [slideVal, setSlideVal] = useState(addHoursToNow("24"));
  const [loading, setLoading] = useState(false);

  const { data: signer } = useSigner();

  // Event handler for changing slide
  const onSlideChange = function (value: string) {
    const commitTime = addHoursToNow(value);
    setCommitDate(commitTime);
    setSlideVal(value);
  };

  // Event handler for when submit is clicked
  const onSubmitClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { amount, commitDate } = await parseCommitVals(
      slideVal,
      amountCommitted
    );
    const contractWithSigner = contract.connect(signer as Signer);
    const tx = await contractWithSigner.commitRun(commitDate, {
      value: amount,
    });
    await tx.wait();
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="bg-[#D9D9D9] rounded-md w-1/3">
      <form className="flex flex-col p-4">
        <input
          className="mx-12 mt-8 rounded p-2 drop-shadow-lg"
          placeholder="Amount (ETH)"
          type="number"
          name="commitAmount"
          id="commitAmount"
          onChange={(e) => {
            setAmountCommitted(e.target.value);
          }}
          value={amountCommitted}
        />
        <br />
        <input
          className="mt-4 mx-12 accent-red-600 drop-shadow-lg cursor-pointer"
          type="range"
          min="1"
          max="168"
          step="0.5"
          name="commitDate"
          id="commitDate"
          value={slideVal}
          onChange={(e) => {
            onSlideChange(e.target.value);
          }}
        />
        <br />
        <div className="flex justify-center mb-8">
          <p>
            <span className="font-bold mr-2">Complete by: </span>
            <span className="border bg-white p-2 rounded-lg">{commitDate}</span>
          </p>
        </div>
        <button
          className="py-3 px-4 mx-32 my-5 bg-red-600 hover:bg-red-800 text-white rounded-2xl drop-shadow-lg"
          onClick={onSubmitClicked}
          disabled={loading}
        >
          <LoadingContents loading={loading} buttonText="Commit" />
        </button>
      </form>
    </div>
  );
}
