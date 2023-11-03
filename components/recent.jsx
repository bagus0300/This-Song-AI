import { React, useState, useEffect } from "react";
import { getRecentlyPlayed } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Recent = () => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getRecentSongs();
  }, []);

  // Awaits the songs that have been recently played and sets state variables accordingly
  const getRecentSongs = () => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    console.log("Getting recent songs...");
    const fetchData = async () => {
      const recentSongs = await getRecentlyPlayed();
      console.log("recentSongs", recentSongs);
      setData(recentSongs.data);
      setStatus(recentSongs.status);
    };

    catchErrors(fetchData());
  };

  return (
    <>
      {(data && (
        <div>
          {data.items.map((song, index) => (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center gap-2 py-2 overflow-x-hidden transition-all duration-500 cursor-pointer hover:pl-8 hover:bg-secondary group"
                    key={`song.track.id-${index}`}
                    // onClick={() => {
                    //   recentSelectSong(song);
                    // }}
                  >
                    <img
                      className="w-16 h-16"
                      src={song.track.album.images[2].url}
                    />
                    <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis group-hover:overflow-x-visible">
                      <span className="text-blue-300">{song.track.name}</span>
                      <br />
                      {song.track.artists[0].name}
                      <br />
                      {song.track.album.name}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>{song.track.name}</span>
                  <br />
                  {song.track.artists[0].name}
                  <br />
                  {song.track.album.name}
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
        )) || (
          <>
            <p>Loading recent songs...</p>
          </>
        )}
    </>
  );
};

export default Recent;
