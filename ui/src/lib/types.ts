import { ReadContractReturnType } from "wagmi/actions";
import { abi } from "@/lib/abi";

export type Run = {
    commitAmount: bigint;
    completionDate: bigint;
    checked: boolean;
    completed: boolean;
}

export interface IndexedRun extends Run {
    index: number;
}