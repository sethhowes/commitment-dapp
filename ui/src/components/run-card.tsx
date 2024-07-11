import { Card, CardContent } from "@/components/ui/card";
import { formatEther } from "viem";
import { Timer, CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";


export default function RunCard({ index, commitAmount, completionDate }) {

  return (
    <Card>
      <CardContent className="relative flex flex-col aspect-square items-center justify-center p-14 gap-10">
        <Badge className="absolute top-4 left-4 text-md">Run {index + 1}</Badge>
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
            <p className="text-muted-foreground">Complete by: </p>
          </div>
          <p className="font-semibold text-4xl text-foreground">
            {formatDate(completionDate)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
