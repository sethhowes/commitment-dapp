"use client";

import Modal from "@/app/view/modal";
import LoadingSpinner from "@/components/loading-spinner";
import { useWaitForTransaction } from "wagmi";
import { useEffect } from "react";
import { TickAnimation } from "@/components/commit/tick-motion";
import Button from "@/components/button";

export default function TransactionPendingModal({
  transactionHash,
  setShowModal,
}) {
  const { data } = useWaitForTransaction({ hash: transactionHash });
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data?.status === "success") {
    return (
      <Modal>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl mb-2 text-bold col-start-3 col-end-5">
            Transaction Successful
          </h1>
          <p className="text-2xl text-gray-400 col-start-3 col-end-5">
            Your transaction was successful.
          </p>
          <div className="mt-8">
            <TickAnimation />
          </div>
          <Button className="mt-6" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal>
        <div>
          <h1 className="text-5xl mb-2 text-bold col-start-3 col-end-5">
            Transaction Pending
          </h1>
          <p className="text-2xl text-gray-400 col-start-3 col-end-5">
            Your transaction is pending. Please wait.
          </p>
        </div>
        <LoadingSpinner />
      </Modal>
    );
  }
}
