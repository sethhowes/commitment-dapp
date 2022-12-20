import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { useState } from "react";
import Greeting from "./Greeting";
import CommitForm from "./CommitForm";

export default function Home() {

  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("")
  const [test, setTest] = useState(0)


  async function connectMetamask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setConnected(true);
    setAddress(account);
    setTest(42);
  }
  
  return (
    <>
      <Head>
        <title>Commitment</title>
      </Head>
      <main className="grid place-items-center">
        <button onClick={connectMetamask} className="bg-sky-500	rounded-full py-1 px-3 text-white">
            Connect to Metamask
        </button>
        <Greeting connected={connected} address={address} test="test" />
        <div>
         <CommitForm connected={connected} />
        </div>
        <div></div>
      </main>
    </>
  );
}
