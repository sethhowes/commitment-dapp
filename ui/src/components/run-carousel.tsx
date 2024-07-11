import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type IndexedRun } from "@/lib/types";

import UpcomingRunCard from "@/components/upcoming-run-card";
import PastRunCard from "@/components/past-run-card";

type RunCarouselProps = {
  runs: IndexedRun[];
  pastOrUpcoming: "past" | "upcoming";
};

export function RunCarousel({ runs, pastOrUpcoming }: RunCarouselProps) {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {runs.map((run) => (
          <CarouselItem key={run.index}>
            {pastOrUpcoming === "upcoming" ? (
              <UpcomingRunCard
                index={run.index}
                commitAmount={run.commitAmount}
                completionDate={run.completionDate}
              />
            ) : (
              <PastRunCard
                index={run.index}
                commitAmount={run.commitAmount}
                completionDate={run.completionDate}
                checked={run.checked}
                completed={run.completed}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
