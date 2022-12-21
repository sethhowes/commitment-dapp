import submitToSmartContract from "../src/SubmitToSmartContract";

export default function CommitForm({ connected }: any): any {

  if (connected) {
    return (
      <form onSubmit={submitToSmartContract} action="" className="m-4 flex flex-col border-2 p-6 space-y-6 bg-teal-100 rounded-md">
        <div>
            <label htmlFor="amount">Commitment amount: </label>
            <input
            type="text"
            placeholder="Dollar amount"
            id="amount"
            name="amount"
            />
        </div>
        <div>
            <label htmlFor="completeBy">Complete by: </label>
            <input
            type="datetime-local"
            id="completeBy"
            name="completeBy"
            />
        </div>
        <button
            type="submit"
            className="bg-blue-400 text-white p-2 rounded-full"
        >
            Submit
        </button>
      </form>
    );
  }
}
