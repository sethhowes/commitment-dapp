import { useState } from "react";
import { slideToDate } from "../utils/slideToDate";
import parseCommitVals from "../utils/parseCommitVals";
import contract from "../utils/contract";
import { useSigner } from "wagmi";
import { Signer } from "ethers";
import LoadingContents from "./LoadingContents";

export default function CommitForm() {
  const [amountCommitted, setAmountCommitted] = useState("");
  const [commitDate, setCommitDate] = useState("");
  const [slideVal, setSlideVal] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: signer } = useSigner();
  // Event handler for changing slide
  const onSlideChange = function (value: string) {
    const commitTime = slideToDate(value);
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
    const tx = await contractWithSigner.commit(commitDate, { value: amount });
    await tx.wait();
    setLoading(false);
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
          className="mt-4 mx-12 accent-red-500 drop-shadow-lg"
          type="range"
          min="1"
          max="168"
          step="0.5"
          name="commitDate"
          id="commitDate"
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
          className="py-3 px-4 mx-32 my-5 bg-[#B90202] text-white rounded-2xl drop-shadow-lg"
          onClick={onSubmitClicked}
          disabled={loading}
        >
          <LoadingContents loading={loading} />
        </button>
      </form>
    </div>
  );
}
