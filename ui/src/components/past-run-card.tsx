import { Card, CardContent } from "@/components/ui/card";
import { formatEther } from "viem";
import { Timer, CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatDate, getSecretsVersion } from "@/lib/utils";
import { useWriteContract } from "wagmi";
import { abi } from "@/lib/abi";
import { contractAddress } from "@/lib/constants";

export default function PastRunCard({ index, commitAmount, completionDate, completed, checked }) {

  const { writeContract } = useWriteContract()

  const handleVerifyClicked = async () => {
    const result = await getSecretsVersion()
    console.log(result)
    console.log(index)
    writeContract({
      abi,
      address: contractAddress,
      functionName: 'verifyRun',
      args: [
        index,
        result,
      ],
    })
  }

  return (
    <Card>
      <CardContent className="relative flex flex-col aspect-square items-center justify-center p-14 gap-10">
        <Badge className="absolute top-4 left-4 text-md">Run {index + 1}</Badge>
        <Badge className="absolute top-4 left-4 text-md">Run {index + 1}</Badge>
        {completed && checked ? (
          <Badge className="absolute top-4 right-4 text-md bg-green-600">Completed</Badge>
        ) : (
          !completed && checked ? (
            <Badge className="absolute top-4 right-4 text-md bg-red-600">Not completed</Badge>
          ) : null
        )}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 text-2xl items-center">
            <CircleDollarSign className="text-muted-foreground" />
            <p className="text-muted-foreground">Commit amount: </p>
          </div>
          <p className="font-semibold text-4xl text-foreground">
            {formatEther(commitAmount)}
          </p>
          <div className="flex gap-2 text-2xl items-center">
            <Timer className="text-muted-foreground" />
            <p className="text-muted-foreground">Completion date: </p>
          </div>
          <p className="font-semibold text-4xl text-foreground">
            {formatDate(completionDate)}
          </p>
          {!checked && <Button className="mt-6" onClick={handleVerifyClicked}>Verify</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
