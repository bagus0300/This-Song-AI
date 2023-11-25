import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-1 align-middle md:flex-row md:gap-5">
        {/* <Skeleton className="w-[300px] h-[300px]" />
      <div className="flex flex-col items-center justify-center gap-1">
        <Skeleton className="w-[400px] h-[36px]" />
        <Skeleton className="w-[200px] h-[32px]" />
        <Skeleton className="w-[250px] h-[28px]" />
      </div> */}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 text-base text-center align-bottom">
        <p className="relative top-[56px]">Loading...</p>
      </div>
    </>
  );
};

export default Loading;
