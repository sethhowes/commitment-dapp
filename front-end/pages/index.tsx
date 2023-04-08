import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MainTextCommit from "../components/MainTextCommit";
import MainTextCommitted from "../components/MainTextCommitted";
import StravaButton from "../components/StravaButton";
import { useAccount } from "wagmi";
import checkStravaConnected from "../utils/checkStravaConnected";
import CommitForm from "../components/CommitForm";
import CurrentCommitPanel from "../components/CurrentCommitPanel";
import getLatestRunDetails from "../utils/getLatestRunDetails";
import contract from "../utils/contract";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [currentCommit, setCurrentCommit] = useState(false);
  const [stravaConnected, setStravaConnected] = useState(false);
  const [runDetails, setrunDetails] = useState({
    commitAmount: 0,
    completeBy: "",
    completed: false,
    checked: false,
  });
  
  const { address } = useAccount();

  // Set wallet address and check for current commit
  useEffect(() => {
    setWalletAddress(address as string);

    const fetchCurrentCommit = async () => {
      const commitStatus = await contract.currentCommit();
      setCurrentCommit(commitStatus);
    };

    fetchCurrentCommit();
  }, []);

  // Fetch run details if current commit exists
  useEffect(() => {
    const fetchRunDetails = async () => {
      if (currentCommit) {
        const latestRun = await getLatestRunDetails();
        setrunDetails(latestRun);
      } else {
        console.log('No current commit found');
      }
    };

    if (currentCommit !== null) {

      fetchRunDetails();
    }
  }, [currentCommit]);

  // Gets strava connected status
  useEffect(() => {
    const updateStravaConnected = async () => {
      const isConnected = await checkStravaConnected(walletAddress);
      setStravaConnected(isConnected);
    };

    // Will rerun when wallet address changes
    if (walletAddress) {
      updateStravaConnected();
    }
  }, [walletAddress]);

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
              <CommitForm onSuccess={() => setCurrentCommit(true)}/>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
