"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import {
  getClientAccessToken,
  hasClientTokenExpired,
  searchTracks
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import SongItem from "@/components/ui/song-item";
import { usePathname } from "next/navigation";
import { Bars } from "react-loader-spinner";
import { X } from "lucide-react";
import clsx from "clsx";
import { TokenContext } from "@/context/ContextProvider";
import { useSession } from "next-auth/react";

const MainSearch = ({ setSearching, setSearchTermParent, searchSongs }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [searchTerm, setSearchTerm] = useState("");
  // const [searching, setSearching] = useState(false);

  const inputElement = useRef(null);

  console.log("Rendering search.jsx");

  // useEffect(() => {
  //   console.log("Search useEffect");
  //   console.log("inputElement:", inputElement.current);
  //   if (inputElement.current) {
  //     inputElement.current.focus();
  //   }
  // }, []);

  const handleSearch = useDebouncedCallback((term) => {
    searchSongs(term);
  }, 300);

  const clearSearch = () => {
    searchSongs("");
  };

  return (
    <section className="relative flex flex-col items-center w-full gap-1">
      <span className="relative w-full group/field">
        <Input
          ref={inputElement}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearchTermParent(e.target.value);
            handleSearch(e.target.value);
            if (e.target.value) setSearching(true);
            else setSearching(false);
          }}
          onFocus={() => {
            console.log("Focus");
            // setSearching(true);
          }}
          onBlur={() => {
            console.log("Blur");
            if (!searchTerm) {
              setSearching(false);
            }
          }}
          value={searchTerm}
          className="text-base"
          placeholder="Search for a song...."
          // autoFocus
        />
        <span
          className={clsx(
            "absolute top-0 right-0 w-10 h-10 cursor-default group/x",
            !searchTerm && "hidden"
          )}
          onClick={(e) => {
            setSearchTerm("");
            setSearchTermParent("");
            clearSearch();
            setSearching(false);
            // inputElement.current.focus();
          }}
        >
          <X className="absolute w-4 h-4 rounded-full top-[12px] right-[12px] group-hover/x:bg-secondary" />
        </span>
      </span>
    </section>
  );
};

export default MainSearch;
