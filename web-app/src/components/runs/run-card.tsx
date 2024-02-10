import { BanknotesIcon, FlagIcon } from "@heroicons/react/24/outline";

export default function RunCard() {
  return (
    <div className="w-48 h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center">
      <h2 className="text-wrap text-black text-3xl mb-4">21/02/2024 16:30</h2>
      <div className="flex text-gray-500 gap-2">
        <BanknotesIcon className="w-6 h-6" />
        <p>0.5 ETH</p>
      </div>
      <div className="flex text-gray-500 gap-2">
        <FlagIcon className="w-6 h-6" />
        <p>6 km</p>
      </div>
    </div>
  );
}
