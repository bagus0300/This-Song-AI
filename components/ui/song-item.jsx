"use client";
import React, { useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Link from "next/link";
import { SongContext } from "@/context/ContextProvider";
import Image from "next/image";

const SongItem = ({ item, path = null, onClick = null }) => {
  // const { songID } = useContext(SongContext);

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/songs/${item.id}`} onClick={onClick}>
              <div
                className="flex items-center w-full gap-2 py-2 overflow-x-hidden transition-all duration-500 cursor-pointer hover:pl-4 hover:bg-secondary group"
                // onClick={() => {
                //   recentSelectSong(item);
                // }}
              >
                {/* <Image
                  className="w-16 h-16"
                  src={item.album.images[2].url}
                  width={300}
                  height={300}
                  alt="Album image"
                /> */}
                <img
                  className="w-16 h-16"
                  src={
                    item.album.images &&
                    item.album.images.length > 2 &&
                    item.album.images[2].url
                  }
                  loading="lazy"
                  alt="Album image"
                />
                <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                  <span
                    className={clsx(
                      // Use context instead of path so that /song/current can give the highlight effect as well.
                      // path === `/songs/id/${item.id}` || songID === item.id
                      path === `/songs/${item.id}`
                        ? "text-[#1fdf64]"
                        : "text-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                  <br />
                  <span className="text-muted">
                    {item.artists[0].name}
                    {/* {item.id} */}
                  </span>
                  <br />
                  <span className="text-foreground">{item.album.name}</span>
                </p>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{item.name}</span>
            <br />
            {item.artists[0].name}
            <br />
            {item.album.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SongItem;
