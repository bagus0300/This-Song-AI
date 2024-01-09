"use client";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { SongContext } from "@/context/ContextProvider";

import { getCurrentlyPlaying } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import Lyrics from "@/components/lyrics";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginButton from "@/components/ui/login-button";
import { redirect } from "next/navigation";
import { rajdhani } from "@/components/ui/fonts";

const Page = () => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const { data: session } = useSession();

  // Init is used to determine whether the token has been read at least once
  const [init, setInit] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  const { songID, setSongID } = useContext(SongContext);
  const [song, setSong] = useState(null);

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    // Awaits the song that's currently playing and sets state variables accordingly
    const getSong = () => {
      // Clear the previous state variables
      setData(null);
      setStatus(null);
      setScrolled(false);

      setSongID(null);

      scrollTo(0, 0);

      const fetchData = async () => {
        if (session && session?.accessToken) {
          console.log("Getting currently playing song...");
          console.log("session", session);
          const currentlyPlaying = await getCurrentlyPlaying(
            session.accessToken
          );
          setData(currentlyPlaying.data);
          setStatus(currentlyPlaying.status);
        }
      };
      catchErrors(fetchData());
    };

    setInit(1);
    getSong();
  }, [session?.accessToken]);

  useEffect(() => {
    if (data) {
      const thisSong = {
        id: data.item.id,
        album: data.item.album,
        albumLink: data.item.album.external_urls.spotify,
        artists: data.item.artists,
        artistsLinks: data.item.artists.map(
          (artist) => artist.external_urls.spotify
        ),
        link: data.item.external_urls.spotify,
        name: data.item.name,
        previewURL: data.item.preview_url,
        trackNumber: data.item.track_number
      };

      // console.log("Setting song: ", thisSong);

      console.log("Song id: ", thisSong.id);
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
      { threshold: 0, rootMargin: "-204px" }
    );

    const scrollTarget = ref.current;
    console.log("Scroll target: ", scrollTarget);

    if (scrollTarget) {
      console.log("Observe");
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

  console.log("Rendering song/current/page.jsx");

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[calc(56px+48px)] lg:left-[calc(288px+16px)] lg:w-[calc(100dvw-256px-8px)] lg:top-[calc(56px+8px+8px)] md:gap-5 z-10",
                "bg-background"
                // "bg-card rounded-lg",
                // "border-red-500 border-2"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <motion.div
                className="relative group"
                // className="border-2 border-red-500"
                onClick={() => {
                  // getSong(null);
                  window.location.reload();
                }}
                style={{
                  width: scrollHeight,
                  height: scrollHeight
                }}
              >
                <img
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.album.images[1].url}
                  width={300}
                  height={300}
                  // placeholder={`data:image/svg+xml;base64,${toBase64(
                  //   shimmer(300, 300)
                  // )}`}
                  alt="Album art"
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                  alt="Refresh icon"
                  width={300}
                  height={300}
                />
              </motion.div>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0 text-ellipsis whitespace-nowrap",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0 max-h-[100px]"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1 className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px] overflow-hidden text-ellipsis">
                  <a
                    href={song.link}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {song.name}
                  </a>
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {song.artists.map((artist, index) => (
                    <Fragment key={index}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        className="hover:brightness-150 hover:underline"
                      >
                        {artist.name}
                      </a>
                      {index < song.artists.length - 1 && ", "}
                    </Fragment>
                  ))}
                </h2>
                <h3 className="transform-all duration-500 text-base xl:text-xl lg:text-lg min-w-[300px] overflow-hidden text-ellipsis">
                  <a
                    href={song.album.external_urls.spotify}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {song.album.name}
                  </a>
                </h3>
              </div>
            </motion.div>
          </div>
          <div
            // id="scroll-target"
            ref={ref}
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-opacity duration-500 md:h-0 overflow-hidden mb-2"
              // scrolled ? "opacity-0 -z-10" : "opacity-100"
            )}
          >
            <h1 className="text-3xl font-extrabold text-[#1fdf64] hover:brightness-150 hover:underline">
              <a href={song.link} target="_blank">
                {song.name}
              </a>
            </h1>
            <h2 className="text-2xl text-muted">
              {song.artists.map((artist, index) => (
                <Fragment key={index}>
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {artist.name}
                  </a>
                  {index < song.artists.length - 1 && ", "}
                </Fragment>
              ))}
            </h2>
            <h3 className="text-xl hover:brightness-150 hover:underline">
              <a href={song.album.external_urls.spotify} target="_blank">
                {song.album.name}
              </a>
            </h3>
          </div>
          <Lyrics
            songID={song.id}
            songName={song.name}
            artistName={song.artists[0].name}
            albumName={song.album.name}
          />
        </>
      )) ||
        (status == 204 && (
          <>
            <section
              className={clsx(
                rajdhani.className,
                "flex flex-col items-center justify-center pt-2 pb-5"
              )}
            >
              {/* <h1 className="text-2xl font-bold">Welcome to This Song!</h1> */}
              <p className="mt-2 text-xl">No song is currently playing.</p>
              <p className="mt-2 text-base">
                Search for a song, or use the menu to see what you&apos;ve
                played recently or to explore popular tracks.
              </p>
            </section>
          </>
        )) ||
        (status >= 400 && (
          <>
            <p className="mt-2">Error retrieving data from Spotify.</p>
          </>
        )) ||
        // If init is false, then the token hasn't been read yet
        // This should be changed to a progress bar along with the final case, or a skeleton
        // (!init && (
        //   <>
        //     <p className="">Loading data from Spotify...</p>
        //   </>
        // )) ||
        (!session && (
          <>
            <section
              className={clsx(
                rajdhani.className,
                "flex flex-col items-center justify-center text-center pt-2 pb-5"
              )}
            >
              {/* <h1 className="text-2xl font-bold">Welcome to This Song!</h1> */}
              <p className="mt-2 text-2xl">
                <span className="font-bold">This Song</span> is a tool providing
                AI-enhanced analysis of song lyrics.
              </p>
              <p className="mt-2 text-base">
                Search for a song, log in with Spotify to see what you&apos;re
                currently listening to, or use the menu to explore popular
                tracks.
              </p>
            </section>

            {/* <LoginButton onClick={signIn} /> */}
          </>
        )) || (
          <>
            <section
              className={clsx(
                rajdhani.className,
                "flex flex-col items-center justify-center text-center pt-2 pb-5"
              )}
            >
              <p className="mt-2 text-xl">Loading currently playing song...</p>
            </section>
          </>
        )}
    </section>
  );
};

export default Page;
