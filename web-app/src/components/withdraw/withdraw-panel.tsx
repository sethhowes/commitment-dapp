import Button from "../button";

export default function WithdrawPanel({ unlockedData, balanceData }) {
  return (
    <div className="flex flex-col w-1/4 py-10 bg-white gap-2 rounded-lg drop-shadow-lg items-center">
      <p>
        <span className="text-5xl text-black">{String(unlockedData)} </span>
        <span className="text-lg text-gray-500">{balanceData?.symbol}</span>
      </p>
      <Button
        className="mt-4 w-24"
        onClick={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        Withdraw
      </Button>
    </div>
  );
}
