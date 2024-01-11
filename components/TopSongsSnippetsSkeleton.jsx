import React from "react";
// import { Skeleton } from "./ui/skeleton";

const TopSongsSnippetsSkeleton = async () => {
  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full my-[10px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1DB954"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"animate-spin"}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    </section>
  );
};

export default TopSongsSnippetsSkeleton;
