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

const ArtistItem = ({ item, path = null, onClick = null }) => {
  return (
    <>
      <Link
        href={`/artists/${item.id}`}
        onClick={onClick}
        className="w-[300px]"
      >
        <div
          className="flex items-center overflow-x-hidden transition-all duration-500 cursor-pointer group"
          // onClick={() => {
          //   recentSelectSong(item);
          // }}
        >
          <img
            className="w-16 h-16"
            src={
              (item.images && item.images.length > 2 && item.images[2].url) ||
              (item.images && item.images.length > 1 && item.images[1].url) ||
              (item.images && item.images.length > 0 && item.images[0].url) ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='black'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E"
            }
            alt=""
            width={64}
            height={64}
          />
          <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
            <span>{item.name}</span>
          </p>
        </div>
      </Link>
    </>
  );
};

export default ArtistItem;
