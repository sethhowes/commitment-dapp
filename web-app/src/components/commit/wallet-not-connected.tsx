import { ConnectButton } from "@rainbow-me/rainbowkit";

export const WalletNotConnected = (
  <div className="bg-white h-128 mx-10 my-20 rounded-lg p-4 grid grid-cols-6 gap-y-6 shadow-lg">
    <h1 className="text-7xl text-black text-bold col-start-3 col-end-5 mt-20">
      Connect your wallet.
    </h1>
    <p className="text-2xl text-gray-400 col-start-3 col-end-5">
      Connect your wallet to commit to a run.
    </p>
    <div className="col-start-3 col-end-5 justify-self-center mt-8 mb-20">
      <ConnectButton />
    </div>
  </div>
);
