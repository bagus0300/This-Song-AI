"use client";
import { SongContext, TokenContext } from "@/context/ContextProvider";
import {
  getClientAccessToken,
  getTrack,
  hasClientTokenExpired
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import Lyrics from "@/components/lyrics";
import { useSession } from "next-auth/react";

const Page = ({ params }) => {
  /**
   * STATE VARIABLES
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [status, setStatus] = useState(null);
  const [song, setSong] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  const { clientToken, setClientToken } = useContext(TokenContext);
  const { songID, setSongID } = useContext(SongContext);

  const { data: session } = useSession();

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  const id = params.id;
  const pathname = usePathname();

  useEffect(() => {
    // Clear the previous state variables
    // setData(null);
    setStatus(null);
    setScrolled(false);

    setSongID(null);

    const fetchData = async () => {
      let token = null;
      let accessToken = null;
      if (session && session.accessToken) {
        console.log("Getting song by id with session token");
        accessToken = session.accessToken;
      } else {
        token = clientToken;
        if (!token) {
          token = await getClientAccessToken();
          setClientToken(token);
          console.log("token", token);
          console.log("clientToken", clientToken);
          console.log("Getting song by id with brand new client token");
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
          console.log("Getting song by id with existing client token");
          accessToken = token.clientToken;
        }
      }
      // console.log("Getting song...");
      const data = await getTrack(id, accessToken);
      // console.log("data", data);

      if (data.status == 200) {
        setStatus(data.status);

        const thisSong = {
          id: id,
          album: data.data.album,
          albumLink: data.data.album.external_urls.spotify,
          artists: data.data.artists,
          artistsLinks: data.data.artists.map(
            (artist) => artist.external_urls.spotify
          ),
          link: data.data.external_urls.spotify,
          name: data.data.name,
          previewURL: data.data.preview_url,
          trackNumber: data.data.track_number
        };

        console.log("thisSong", thisSong);

        setSongID(id);
        setSong(thisSong);
      }
    };
    catchErrors(fetchData());
  }, [id, setSongID]);

  // Run this hook when the songID changes; by that point, the DOM will be ready so the ref will be defined
  useEffect(() => {
    // Toggle the scrolled state variable when the scroll target is intersected
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrolled(false);
          // console.log("Not scrolled!");
        } else {
          // console.log("Scrolled!");
          setScrolled(true);
        }
      },
      { threshold: 0, rootMargin: "-204px" }
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
  }, [songID]);

  // These two functions are used to convert the album art to a base64 string representing a shimmer effect, which is used as a placeholder for the Image component
  // https://image-component.nextjs.gallery/shimmer
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

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                // "flex flex-row items-center justify-center align-middle w-full fixed top-[56px] lg:left-[256px] lg:w-[calc(100dvw-256px-8px)] lg:top-0 md:gap-5",
                "flex flex-row items-center justify-center align-middle w-full fixed top-[calc(56px+48px)] lg:left-[calc(288px+16px)] lg:w-[calc(100dvw-256px-8px)] lg:top-[calc(56px+8px+8px)] md:gap-5 z-10",
                "bg-background"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <Link
                href={"/albums/" + song.album.id}
                // style={{
                //   cursor: "default"
                // }}
              >
                <motion.div
                  className="relative group"
                  style={{
                    width: scrollHeight,
                    height: scrollHeight
                  }}
                >
                  <img
                    className="absolute w-full h-full transition-all duration-500 opacity-100 -z-10"
                    src={song.album.images[1].url}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                    alt="Album art"
                  />
                </motion.div>
              </Link>
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
                  <Link
                    // href={song.album.external_urls.spotify}
                    href={"/albums/" + song.album.id}
                    className="hover:brightness-150 hover:underline"
                  >
                    {song.album.name}
                  </Link>
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
              <Link
                // href={song.album.external_urls.spotify}
                href={"/albums/" + song.album.id}
                className="hover:brightness-150 hover:underline"
              >
                {song.album.name}
              </Link>
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
        (status >= 400 && (
          <>
            <p className="relative mt-2 top-[56px]">
              Error retrieving data from Spotify.
            </p>
          </>
        )) || (
          <>
            <div className="flex flex-col items-center justify-center w-full gap-1 align-middle md:flex-row md:gap-5">
              <Skeleton className="w-[300px] h-[300px]" />
              <div className="flex flex-col items-center justify-center gap-1">
                <Skeleton className="w-[400px] h-[36px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[250px] h-[28px]" />
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default Page;
