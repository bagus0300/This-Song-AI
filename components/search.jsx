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

const Search = ({ onClick }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { clientToken, setClientToken } = useContext(TokenContext);
  console.log("clientToken", clientToken);

  const { data: session } = useSession();

  const inputElement = useRef(null);

  const pathname = usePathname();

  console.log("Rendering search.jsx");

  useEffect(() => {
    console.log("Search useEffect");
    console.log("inputElement:", inputElement.current);
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const searchSongs = (term) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (term) {
      // console.log(`Searching for ${term}...`);

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

        const searchResults = await searchTracks(term, accessToken);
        setData(searchResults.data.tracks);
        setStatus(searchResults.status);
        // console.log("searchResults", searchResults);
      };

      catchErrors(fetchData());
    }
  };

  const handleSearch = useDebouncedCallback((term) => {
    searchSongs(term);
  }, 300);

  const clearSearch = () => {
    searchSongs("");
  };

  return (
    <section className="flex flex-col items-center w-full gap-1 min-h-[calc(80dvh-48px-2px-24px)]">
      <span className="relative w-full group/field">
        <Input
          ref={inputElement}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
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
            clearSearch();
            inputElement.current.focus();
          }}
        >
          <X className="absolute w-4 h-4 rounded-full top-[12px] right-[12px] group-hover/x:bg-secondary" />
        </span>
      </span>

      {(data && (
        <div className="w-full max-w-[85dvw] sm:max-w-[462px] lg:h-[calc(100dvh-64px-40px-40px-32px)] h-[calc(80dvh-48px-2px-24px-40px)] overflow-y-scroll">
          {data.items.map((item, index) => (
            <SongItem
              // We can't set the key to the song's id because the same song could be in the recently played list multiple times, so we'll use the index instead
              key={index}
              item={item}
              path={pathname}
              onClick={onClick}
            />
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

export default Search;
