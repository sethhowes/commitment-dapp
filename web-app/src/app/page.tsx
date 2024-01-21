"use client";

import { WalletNotConnected } from "@/components/commit/wallet-not-connected";
import { useAccount } from "wagmi";
import CommitForm from "@/components/commit/commit-form";
import { useState } from "react";
import TransactionPendingModal from "@/components/commit/transaction-pending-modal";

export default function Page() {
  const { isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x000000");

  const handleTransactionSubmit = () => {
    setShowModal(true);
  };

  if (!isConnected) {
    return WalletNotConnected;
  } else if (showModal) {
    return <TransactionPendingModal transactionHash={transactionHash} setShowModal={setShowModal} />;
  } else {
    return (
      <CommitForm
        handleTransactionSubmit={handleTransactionSubmit}
        setTransactionHash={setTransactionHash}
      />
    );
  }
}
