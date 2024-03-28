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

const SongItemMain = ({ item, path = null, onClick = null }) => {
  // const { songID } = useContext(SongContext);

  return (
    <>
      <Link href={`/songs/${item.id}`}>
        <div
          className="flex items-center w-full h-full gap-2 p-2 overflow-x-hidden transition-all duration-500 cursor-pointer group"
          // onClick={() => {
          //   recentSelectSong(item);
          // }}
        >
          <img
            className="w-16 h-16"
            src={
              (item.album.images &&
                item.album.images.length > 2 &&
                item.album.images[2].url) ||
              (item.album.images &&
                item.album.images.length > 1 &&
                item.album.images[1].url) ||
              (item.album.images &&
                item.album.images.length > 0 &&
                item.album.images[0].url) ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='black'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E"
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
    </>
  );
};

export default SongItemMain;
