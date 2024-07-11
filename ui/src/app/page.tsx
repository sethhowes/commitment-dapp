"use client";

import React, { useState } from "react";
import { CommitForm } from "@/components/form";
import { LoadingModal } from "@/components/loading-modal";

type transactionStatus = "idle" | "pending" | "success" | "error"

export default function Home() {
  const [transactionStatus, setTransactionStatus] = useState<transactionStatus>("idle")
  const [modalOpen, setModalOpen] = useState(false)

  const handleTransactionSubmit = () => {
    setTransactionStatus("pending");
    setModalOpen(true)
  };
 
  const handleTransactionComplete = (result) => {
    setTransactionStatus(result)
  };

  const handleModalClose = () => {
    setModalOpen(false)
  };

  return (
    <main className="p-8 flex flex-col items-center flex-grow">
      <div className="mt-20">
        <CommitForm
          onTransactionSubmit={handleTransactionSubmit}
          onTransactionComplete={handleTransactionComplete}
        />
      </div>
      <LoadingModal
        transactionStatus={transactionStatus}
        onClose={handleModalClose}
        modalOpen={modalOpen}
      />
    </main>
  );
}
