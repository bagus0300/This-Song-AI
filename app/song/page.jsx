"use client";
import { useContext, useEffect, useRef, useState } from "react";

import { SongContext, TokenContext } from "@/context/ContextProvider";

import { getCurrentlyPlaying } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import Lyrics from "@/components/lyrics";
import Image from "next/image";

const Page = () => {
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

  const [scrolled, setScrolled] = useState(false);

  const { token } = useContext(TokenContext);
  const { songID, setSongID } = useContext(SongContext);
  const [song, setSong] = useState(null);

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    // Awaits the song that's currently playing and sets state variables accordingly
    const getSong = (select) => {
      // Clear the previous state variables
      setData(null);
      setStatus(null);
      setScrolled(false);

      setSongID(null);

      scrollTo(0, 0);

      if (!select) {
        const fetchData = async () => {
          // console.log("Getting currently playing song...");
          try {
            const currentlyPlaying = await getCurrentlyPlaying();
            setData(currentlyPlaying.data);
            setStatus(currentlyPlaying.status);
          } catch (error) {
            console.log("Could not get currently playing song.");
          }
        };
        catchErrors(fetchData());
      } else if (select) {
        // console.log(select);

        const thisSong = {
          id: select.id,
          albumArt: select.albumArt,
          songName: select.songName,
          artists: select.artists,
          albumName: select.albumName
        };

        // console.log("Song id: ", thisSong);
        setSongID(thisSong.id);
        setSong(thisSong);
      }
    };

    setInit(1);
    getSong();
  }, [setSongID]);

  useEffect(() => {
    if (data) {
      const thisSong = {
        id: data.item.id,
        albumArt: data.item.album.images[1].url,
        songName: data.item.name,
        artists: data.item.artists,
        albumName: data.item.album.name
      };

      // console.log("Setting song: ", thisSong);

      // console.log("Song id: ", thisSong.id);
      setSongID(thisSong.id);
      setSong(thisSong);
    } else {
      setSongID(null);
      setSong(null);
    }
  }, [data, setSongID]);

  // Force a rerender when the song changes
  useEffect(() => {
    // console.log(song);

    // Toggle the scrolled state variable when the scroll target is intersected
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrolled(false);
        } else {
          setScrolled(true);
        }
      },
      { threshold: 0, rootMargin: "-156px" }
    );

    const scrollTarget = ref.current;

    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    return () => {
      setScrolled(false);
      scrollTo(0, 0);
      if (scrollTarget) {
        observer.unobserve(scrollTarget);
      }
    };
  }, [song]);

  // console.log("Rendering song/page.jsx");

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[56px] lg:left-[256px] lg:w-[calc(100dvw-256px-8px)] lg:top-0 md:gap-5",
                "bg-background"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <motion.div
                className="relative group"
                onClick={() => {
                  window.location.reload();
                }}
                style={{
                  width: scrollHeight,
                  height: scrollHeight
                }}
              >
                {/* <Image
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.albumArt}
                  width={300}
                  height={300}
                  // placeholder={`data:image/svg+xml;base64,${toBase64(
                  //   shimmer(300, 300)
                  // )}`}
                  alt="Album art"
                />
                <Image
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                  alt="Refresh icon"
                  width={300}
                  height={300}
                /> */}
                <img
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.albumArt}
                  alt="Album art"
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                  alt="Refresh icon"
                />
              </motion.div>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0",
                  // "border-red-500 border-2",
                  // scrolled ? "opacity-100 w-[300px]" : "w-[0%] opacity-0",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1 className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px]">
                  {song.songName}
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </h2>
                <h3 className="transform-all duration-500 text-base xl:text-xl lg:text-lg min-w-[300px]">
                  {song.albumName}
                </h3>
              </div>
            </motion.div>
          </div>
          <div
            // id="scroll-target"
            ref={ref}
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-opacity duration-500 md:h-0 overflow-hidden"
              // scrolled ? "opacity-0 -z-10" : "opacity-100"
            )}
          >
            <h1 className="text-3xl font-extrabold text-[#1fdf64]">
              {song.songName}
            </h1>
            <h2 className="text-2xl text-muted">
              {song.artists.map((artist) => artist.name).join(", ")}
            </h2>
            <h3 className="text-xl text-">{song.albumName}</h3>
          </div>
          <Lyrics
            songName={song.songName}
            artistName={song.artists[0].name}
            albumName={song.albumName}
          />
        </>
      )) ||
        (status == 204 && (
          <>
            <p className="relative top-[56px]">No song is currently playing.</p>
          </>
        )) ||
        (status >= 400 && (
          <>
            <p className="relative top-[56px]">
              Error retrieving data from Spotify.
            </p>
          </>
        )) ||
        // If init is false, then the token hasn't been read yet
        // This should be changed to a progress bar along with the final case, or a skeleton
        (!init && (
          <>
            <p className="relative top-[56px]">Loading data from Spotify...</p>
          </>
        )) ||
        (!token && (
          <>
            <p className="relative top-[56px]">
              Log in to Spotify to see what you&apos;re listening to.
            </p>
          </>
        )) || (
          <>
            <p className="relative top-[56px]">
              Loading currently playing song...
            </p>
          </>
        )}
    </section>
  );
};

export default Page;
