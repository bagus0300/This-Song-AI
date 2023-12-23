import React from "react";
import { Skeleton } from "./ui/skeleton";

const TopSongsSnippetsSkeleton = async () => {
  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full my-8">
        {new Array(20).fill().map((item, index) => (
          <div
            className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[200px] items-center justify-center"
            key={index}
          >
            <div className="w-full md:w-[400px] h-[200px] flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-full gap-2 p-2 overflow-x-hidden">
                <Skeleton className="w-16 h-16" />
                <div className="flex flex-col items-center w-[70%] gap-2">
                  <Skeleton className="w-full h-7" />
                  <Skeleton className="w-[70%] h-5" />
                </div>
              </div>
              <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
              <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
              <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSongsSnippetsSkeleton;
