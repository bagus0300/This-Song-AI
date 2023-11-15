"use client";
import { useContext, useEffect, useState } from "react";

import { SongContext, TokenContext } from "@/context/ContextProvider";

import { getCurrentlyPlaying } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import clsx from "clsx";

const SongData = ({ container, getScrollYPercent }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  // const [song, setSong] = useState(null);

  // Init is used to determine whether the token has been read at least once
  const [init, setInit] = useState(0);

  const { token } = useContext(TokenContext);
  const { song, setSong } = useContext(SongContext);

  const [scrollYPercent, setScrollYPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log(getScrollYPercent());
      setScrollYPercent(getScrollYPercent());
    };

    console.log(container.current);

    container.current.addEventListener("scroll", handleScroll);

    return () => {
      container.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setInit(1);
    getSong();
  }, [token]);

  useEffect(() => {
    if (data) {
      const thisSong = {
        albumArt: data.item.album.images[1].url,
        songName: data.item.name,
        artists: data.item.artists,
        albumName: data.item.album.name
      };

      setSong(thisSong);
    } else {
      setSong(null);
    }
  }, [data]);

  // Force a rerender when the song changes
  useEffect(() => {
    console.log(song);
  }, [song]);

  // Awaits the song that's currently playing and sets state variables accordingly
  const getSong = (select) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (!select && token) {
      const fetchData = async () => {
        console.log("Getting currently playing song...");
        const currentlyPlaying = await getCurrentlyPlaying();
        setData(currentlyPlaying.data);
        setStatus(currentlyPlaying.status);
      };
      catchErrors(fetchData());
    } else if (select) {
      console.log(select);

      const thisSong = {
        albumArt: select.albumArt,
        songName: select.songName,
        artists: select.artists,
        albumName: select.albumName
      };

      setSong(thisSong);
    }
  };

  return (
    <section>
      {(song && (
        <>
          <div
            className={clsx(
              "flex items-center justify-center text-center md:flex-row bg-secondary pb-2 px-2",
              scrollYPercent > 0.25 ? "flex-row h-[100px]" : "flex-col"
            )}
          >
            <div
              className="flex items-center justify-center text-center min-w-[100px] min-h-[100px] h-auto"
              style={{
                // scale: 1 - scrollYPercent,
                height:
                  scrollYPercent < 0.25
                    ? Math.round(300 - (scrollYPercent / 0.75) * 300)
                    : 100,
                width:
                  scrollYPercent < 0.25
                    ? Math.round(300 - (scrollYPercent / 0.75) * 300)
                    : 100
              }}
            >
              <div
                className="relative flex max-w-[300px] max-h-[300px] data-image-container group w-full h-full"
                onClick={() => {
                  getSong(null);
                }}
              >
                <img
                  className="transition-all duration-500 rounded-lg opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 w-full h-full"
                  src={song.albumArt}
                  // style={{
                  //   height: "20%",
                  //   width: "20%"
                  // }}
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100"
                  src="/images/refresh.png"
                />
              </div>
            </div>
            <div
              className={clsx(
                "text-center data-info col-md-8 text-md-start",
                scrollYPercent > 0.25 ? "h-[100px]" : ""
              )}
            >
              <h1
                className={clsx(
                  "font-extrabold text-yellow-500 dark:text-yellow-200",
                  scrollYPercent < 0.25 ? "text-3xl" : "text-xl"
                )}
              >
                {song.songName}
                {/* {scrollYPercent} */}
              </h1>
              <h2
                className={clsx(
                  "text-blue-300",
                  scrollYPercent < 0.25 ? "text-2xl" : "text-lg"
                )}
              >
                {song.artists.map((artist) => artist.name).join(", ")}
              </h2>
              <h3 className={scrollYPercent < 0.25 ? "text-xl" : "text-base"}>
                {song.albumName}
              </h3>
            </div>
          </div>
        </>
      )) ||
        (status == 204 && (
          <>
            <p>No song is currently playing.</p>
          </>
        )) ||
        (status >= 400 && (
          <>
            <p>Error retrieving data from Spotify.</p>
          </>
        )) ||
        // If init is false, then the token hasn't been read yet
        // This should be changed to a progress bar along with the final case, or a skeleton
        (!init && (
          <>
            <p>Loading data from Spotify...</p>
          </>
        )) ||
        (!token && (
          <>
            <p>Log in to Spotify to see what you're listening to.</p>
          </>
        )) || (
          <>
            <p>Loading currently playing song...</p>
          </>
        )}
    </section>
  );
};

export default SongData;