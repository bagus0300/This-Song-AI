"use client";
import React from "react";
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

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const shimmer = (
  w,
  h
) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<linearGradient id="g">
  <stop stop-color="#333" offset="20%" />
  <stop stop-color="#222" offset="50%" />
  <stop stop-color="#333" offset="70%" />
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="#333" />
<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const AlbumItem = ({ item, path = null, onClick = null }) => {
  return (
    <>
      <Link href={`/albums/${item.id}`} onClick={onClick} className="w-[300px]">
        <div
          className="flex items-center gap-2 py-2 overflow-x-hidden transition-all duration-500 cursor-pointer group"
          // onClick={() => {
          //   recentSelectSong(item);
          // }}
        >
          <img
            className="w-16 h-16"
            src={item.images && item.images.length > 2 && item.images[2].url}
            alt="Album image"
            width={64}
            height={64}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(300, 300)
            )}`}
          />
          <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
            <span>{item.name}</span>
            <br />
            <span className="text-muted">
              {item.artists[0].name}
              {/* {item.id} */}
            </span>
            <br />
          </p>
        </div>
      </Link>
    </>
  );
};

export default AlbumItem;
