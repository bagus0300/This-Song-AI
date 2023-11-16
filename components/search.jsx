import React, { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SongContext } from "@/context/ContextProvider";
import { useDebouncedCallback } from "use-debounce";
import { searchTracks } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
// import { clientAccessToken } from "@/lib/spotify";

const Search = ({ setShowMenu }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { setSong } = useContext(SongContext);

  useEffect(() => {
    console.log("Search useEffect");

    return () => {
      console.log("Search unmounted!");
    };
  }, []);

  const searchSongs = (term) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (term) {
      console.log(`Searching for ${term}...`);

      const fetchData = async () => {
        const searchResults = await searchTracks(term);
        setData(searchResults.data.tracks);
        setStatus(searchResults.status);
        console.log("searchResults", searchResults);
      };

      catchErrors(fetchData());
    }
  };

  const searchSelectSong = (song) => {
    console.log("searchSelectSong: " + song);
    const thisSong = {
      albumArt: song.album.images[1].url,
      songName: song.name,
      artists: song.artists,
      albumName: song.album.name
    };
    setSong(thisSong);
    setShowMenu(false);
  };

  const handleSearch = useDebouncedCallback((term) => {
    searchSongs(term);
  }, 300);

  console.log("Rendering Search");

  return (
    <section className="flex flex-col items-center gap-1">
      <Input
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        value={searchTerm}
        className="text-base"
      />
      {(data && (
        <div className="w-full md:h-[calc(100dvh-56px-40px-48px-16px-32px-40px)] h-[calc(100dvh-40px-56px-48px-16px-40px)] overflow-y-scroll">
          {data.items.map((song, index) => (
            <TooltipProvider delayDuration={200} key={`song.id-${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center gap-2 py-2 overflow-x-hidden transition-all duration-500 cursor-pointer hover:pl-4 hover:bg-secondary group"
                    key={`song.id-${index}`}
                    onClick={() => {
                      searchSelectSong(song);
                    }}
                  >
                    <img className="w-16 h-16" src={song.album.images[2].url} />
                    <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                      <span className="text-foreground">{song.name}</span>
                      <br />
                      <span className="text-muted">{song.artists[0].name}</span>
                      <br />
                      <span className="text-foreground">{song.album.name}</span>
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>{song.name}</span>
                  <br />
                  {song.artists[0].name}
                  <br />
                  {song.album.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          </>
        )) || <></>}
    </section>
  );
};

export default Search;
