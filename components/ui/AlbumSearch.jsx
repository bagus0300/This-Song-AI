"use client";
import { TokenContext } from "@/context/ContextProvider";
import {
  getClientAccessToken,
  hasClientTokenExpired,
  searchAlbums
} from "@/lib/spotify";
import { useSession } from "next-auth/react";
import React, { useContext, useRef, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import SongItem from "./song-item";
import { Input } from "./input";
import clsx from "clsx";
import { X } from "lucide-react";
import { catchErrors } from "@/lib/utils";
import AlbumItem from "./album-item";

const AlbumSearch = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { clientToken, setClientToken } = useContext(TokenContext);
  console.log("clientToken", clientToken);

  const { data: session } = useSession();

  const inputElement = useRef(null);

  const searchAlbum = (term) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (term) {
      console.log(`Searching for ${term}...`);

      const fetchData = async () => {
        let token = null;
        let accessToken = null;
        if (session && session.accessToken) {
          accessToken = session.accessToken;
        } else {
          token = clientToken;
          if (!token) {
            token = await getClientAccessToken();
            setClientToken(token);
            console.log("token", token);
            console.log("clientToken", clientToken);
            accessToken = token.clientToken;
          } else {
            console.log("Found a token in TokenContext");
            if (hasClientTokenExpired(token)) {
              console.log("Token has expired");
              token = await getClientAccessToken();
              setClientToken(token);
              console.log("token", token);
              console.log("clientToken", clientToken);
            }
            accessToken = token.clientToken;
          }
        }

        console.log("search token", accessToken);

        const searchResults = await searchAlbums(term, accessToken);

        console.log(searchResults.data.albums);

        setData(searchResults.data.albums);
        setStatus(searchResults.status);
        // console.log("searchResults", searchResults);
      };

      catchErrors(fetchData());
    }
  };

  const handleSearch = useDebouncedCallback((term) => {
    searchAlbum(term);
  }, 300);

  const clearSearch = () => {
    searchAlbum("");
  };

  return (
    <section className="flex flex-col items-center w-full gap-1 p-2">
      <span className="relative group/field">
        <Input
          ref={inputElement}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          value={searchTerm}
          className="text-base"
          placeholder="Search for an album...."
          autoFocus
        />
        <span
          className={clsx(
            "absolute top-0 right-0 w-10 h-10 cursor-default group/x",
            !searchTerm && "hidden"
          )}
          onClick={(e) => {
            setSearchTerm("");
            clearSearch();
            inputElement.current.focus();
          }}
        >
          <X className="absolute w-4 h-4 rounded-full top-[12px] right-[12px] group-hover/x:bg-secondary" />
        </span>
      </span>

      {(data && (
        <div className="flex flex-row flex-wrap justify-center w-full gap-2 pt-4">
          {data.items.map((item, index) => (
            <div
              className="border-2 w-[300px] rounded-md p-2 hover:bg-card"
              key={index}
            >
              <AlbumItem
                // We can't set the key to the song's id because the same song could be in the recently played list multiple times, so we'll use the index instead
                key={index}
                item={item}
                // path={pathname}
                // onClick={onClick}
              />
            </div>
          ))}
        </div>
      )) ||
        (status == 204 && (
          <>
            <p>No content to display.</p>
          </>
        )) ||
        (searchTerm && (
          <>
            <p>Searching for {searchTerm}...</p>
            <Bars
              height="30"
              width="30"
              color="#1fdf64"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </>
        )) || <></>}
    </section>
  );
};

export default AlbumSearch;
