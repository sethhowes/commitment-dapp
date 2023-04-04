import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getRunsCommitted } from "../utils/getRumsCommitted";
import MainTextCommit from "../components/MainTextCommit";
import MainTextCommitted from "../components/MainTextCommitted";
import StravaButton from "../components/StravaButton";
import { useAccount } from "wagmi";
import checkStravaConnected from "../utils/checkStravaConnected";
import contract from "../utils/contract";
import CommitForm from "../components/CommitForm";
import CurrentCommitPanel from "../components/CurrentCommitPanel";
import getLatestRunDetails from "../utils/getLatestRunDetails";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [runNumber, setRunNumber] = useState(0);
  const [currentCommit, setCurrentCommit] = useState(false);
  const [stravaConnected, setStravaConnected] = useState(false);
  const [runDetails, setrunDetails] = useState({
    commitAmount: 0,
    completeBy: "",
    checked: false,
  });

  const { address } = useAccount();

  useEffect(() => {
    const fetchRunNumber = async () => {
      const number = await getRunsCommitted();
      setRunNumber(number);
    };

    setWalletAddress(address as string);

    const fetchRunDetails = async () => {
      const latestRun = await getLatestRunDetails();
      setCurrentCommit(!latestRun.checked);
      setrunDetails(latestRun);
    };

    fetchRunNumber();

    fetchRunDetails();

    addCommitListener();
  }, []);

  useEffect(() => {
    const updateStravaConnected = async () => {
      const isConnected = await checkStravaConnected(walletAddress);
      setStravaConnected(isConnected);
      console.log(isConnected);
    };

    // Will rerun when wallet address changes
    if (walletAddress) {
      updateStravaConnected();
    }
  }, [walletAddress]);

  // Add commit listener
  const addCommitListener = () => {
    contract.on("CommitMade", (commit) => {
      setCurrentCommit(true);
    });
  };

  return (
    <>
      <Head>
        <title>Dopa</title>
      </Head>
      <main>
        <div className="h-screen flex flex-col bg-black gap-y-4">
          <div className="flex flex-row-reverse m-4">
            <ConnectButton />
            <StravaButton
              walletAddress={walletAddress}
              stravaConnected={stravaConnected}
            />
          </div>
          <div className="flex justify-center items-center gap-10 mt-32">
            {currentCommit ? <MainTextCommitted /> : <MainTextCommit />}
            {currentCommit ? (
              <CurrentCommitPanel
                completeBy={runDetails.completeBy}
                commitAmount={runDetails.commitAmount}
              />
            ) : (
              <CommitForm />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
