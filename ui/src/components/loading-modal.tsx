import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export function LoadingModal({ transactionStatus, onClose, modalOpen }) {
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {transactionStatus === "pending"
              ? "Loading..."
              : transactionStatus === "success"
              ? "Success"
              : "Error"}
          </DialogTitle>
          <DialogDescription>
            {transactionStatus === "pending" ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : transactionStatus === "success" ? (
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p>Run committed successfully.</p>
                <Button onClick={onClose} className="mt-4">
                  Close
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p>An error occurred while submitting your run.</p>
                <Button onClick={onClose} className="mt-4">
                  Close
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
