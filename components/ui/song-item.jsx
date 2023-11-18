import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Link from "next/link";

const SongItem = ({ item, path, setShowMenu }) => {
  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/song/${item.id}`}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <div
                className="flex items-center gap-2 py-2 overflow-x-hidden transition-all duration-500 cursor-pointer hover:pl-4 hover:bg-secondary group"
                // onClick={() => {
                //   recentSelectSong(item);
                // }}
              >
                <img className="w-16 h-16" src={item.album.images[2].url} />
                <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                  <span
                    className={clsx(
                      path === `/song/${item.id}`
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
