"use client";
import SongCard from "@/components/ui/SongCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import ArtistTopAlbums from "@/components/ui/ArtistTopAlbums";
import ArtistTopSongs from "@/components/ui/ArtistTopSongs";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/api/v1/gpt/summary`;

const URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://localhost:3000"
    : "https://thissong.app";

const ArtistPage = ({ params }) => {
  const { id } = params;
  const [artist, setArtist] = useState(null);
  const [artistID, setArtistID] = useState(null);
  const [summaries, setSummaries] = useState(null);

  const ref = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const artistResponse = await fetch(`/api/artists?artistID=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const artistJSON = await artistResponse.json();

        console.log("artistJSON", artistJSON);

        setArtist(artistJSON);

        setArtistID(id);

        return artistJSON;
      } catch (e) {
        console.log(e);
      }
    };

    getArtist();
  }, []);

  // Run this hook when the albumID changes; by that point, the DOM will be ready so the ref will be defined
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
  }, [artistID]);

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
    <>
      {(artist && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[calc(56px)] lg:top-[calc(56px+8px+8px)] md:gap-5 z-10",
                "bg-background"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <a
                href={artist.externalURL}
                target="_blank"
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
                    src={artist.imageURL}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                    alt=""
                  />
                </motion.div>
              </a>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0 text-ellipsis whitespace-nowrap",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0 max-h-[100px]"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1 className="transform-all duration-500 text-base font-extrabold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px] overflow-hidden text-ellipsis">
                  <a
                    href={artist.externalURL}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {artist.name}
                  </a>
                </h1>
                <h2 className="text-base">
                  {artist.genres
                    .map(
                      (genre) => genre.charAt(0).toUpperCase() + genre.slice(1)
                    )
                    .join(", ")}
                </h2>
                <h3 className="text-sm duration-500 transform-all min-w-[300px] overflow-hidden text-ellipsis">
                  Total followers: {artist.followers.toLocaleString("en-US")}
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
              <a href={artist.externalURL} target="_blank">
                {artist.name}
              </a>
            </h1>
            <h2 className="text-base">
              {artist.genres
                .map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1))
                .join(", ")}
            </h2>
            <h3 className="text-sm">
              Total followers: {artist.followers.toLocaleString("en-US")}
            </h3>
          </div>

          <section className="w-full gap-1">
            <div className="flex flex-wrap items-center justify-center w-full">
              {(!artistID && (
                <>
                  <section className="w-full gap-1">
                    <div className="flex flex-wrap items-center justify-center w-full my-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={"animate-spin"}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    </div>
                  </section>
                </>
              )) || (
                <>
                  <section className="flex flex-col justify-center w-full lg:items-start lg:flex-row max-w-7xl">
                    <section className="flex flex-col items-center justify-center basis-1/3">
                      <h1 className="text-3xl">Albums</h1>
                      <ArtistTopAlbums artistID={artistID} limit={5} />
                    </section>
                    <section className="flex flex-col items-center basis-2/3">
                      <h1 className="text-3xl">Top Songs</h1>
                      <ArtistTopSongs artistID={artistID} limit={10} />
                    </section>
                    {/* <section className="flex flex-col items-center flex-1">
                      Similar Artists
                    </section> */}
                  </section>
                </>
              )}
            </div>
          </section>
        </>
      )) || (
        <>
          <div className="flex flex-col items-center justify-center w-full gap-1 align-middle md:flex-row md:gap-5">
            <Skeleton className="w-[300px] h-[300px]" />
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-[400px] h-[36px]" />
              <Skeleton className="w-[200px] h-[32px]" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArtistPage;
