import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2 flex flex-col items-center">
      <Carousel
        opts={{
          align: "start"
        }}
        className="w-[70vw] max-w-xl md:mx-auto"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <Card className="bg-card hover:brightness-125">
                  <CardContent className="flex items-center justify-center p-0 overflow-hidden text-center rounded-lg cursor-pointer aspect-square">
                    <Skeleton className="w-full h-full" />
                    {/* <span className="absolute text-lg font-semibold">
                        Loading...
                      </span> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <Suspense fallback={<TopSongsSnippetsSkeleton />}> */}
      {/* <Playlist playlist={selectedPlaylist} limit="20" offset="0" /> */}
      {/* </Suspense> */}
    </div>
  );
};

export default Loading;
