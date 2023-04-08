import { useEffect, useState } from "react";
import verifyRun from "../utils/verifyRun";
import { useSigner } from "wagmi";
import { Signer } from "ethers";

export default function Countdown({ completeBy }: { completeBy: string }) {
  const calculateTimeLeft = () => {
    // Get difference between committed time and current time
    const difference = new Date(completeBy).getTime() * 1000 - new Date().getTime();
    console.log('Time left: ', difference)
    return difference > 0 ? difference : 0;
  };
  
  const { data: signer } = useSigner();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);

  }, [timeLeft]);

    // Event handler for when verify is clicked
   

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    (timeLeft > 0) ? (

        <div className="flex flex-row items-center">
      <p className="text-3xl p-4">⏰ Time remaining:</p>
      <p className="border bg-white py-2 px-4 rounded-lg">
        {formatTime(timeLeft)}
      </p>
    </div>
    ) : (
        <>
        <p className="text-3xl p-3">⏰ Time up!</p>
        <button
        className="py-3 w-32 my-4 bg-[#B90202] text-white rounded-2xl drop-shadow-lg"
        onClick={(e) => {
          onVerifyClicked(e);
        }}
      >
        Verify Run
      </button>
        </>
        
    )
  );
}
