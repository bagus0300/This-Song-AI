"use client";
import SongCard from "@/components/ui/SongCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

const URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://localhost:3000"
    : "https://thissong.app";

const AlbumPage = ({ params }) => {
  const { id } = params;
  const [album, setAlbum] = useState(null);
  const [albumID, setAlbumID] = useState(null);
  const [summaries, setSummaries] = useState(null);

  const ref = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const albumResponse = await fetch(`/api/albums?albumID=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const albumJSON = await albumResponse.json();

        console.log("albumJSON", albumJSON);

        setAlbum(albumJSON);

        const songs = albumJSON.tracks.items;
        const allSummaries = new Map();

        await Promise.all(
          songs.map(async (element) => {
            // console.log(element.track.name);
            const songID = element.id;
            const songName = element.name;

            const gpt4Response = await fetch(GPT_SUMMARY_ENDPOINT, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                songID: songID,
                trackName: songName
              }),
              cache: "no-store"
            });

            if (gpt4Response.ok) {
              const summary = await gpt4Response.text();
              if (summary) {
                // console.log("songID", songID);
                // console.log("songName", songName);
                // console.log("summary", summary);
                const firstLetter = summary.slice(13, 14);
                const restOfSummary = summary.slice(14);
                allSummaries.set(
                  element.id,
                  firstLetter.toUpperCase() + restOfSummary
                );
              } else {
                allSummaries.set(
                  element.id,
                  "Description currently unavailable."
                );
              }
            }
          })
        );

        setSummaries(allSummaries);

        setAlbumID(id);

        return albumJSON;
      } catch (e) {
        console.log(e);
      }
    };

    getAlbum();
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
  }, [albumID]);

  useEffect(() => {
    console.log("album", album);
  }, [album]);

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
      {(album && (
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
                href={album.externalURL}
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
                    src={album.imageURL}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                    alt="Album art"
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
                <h1 className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px] overflow-hidden text-ellipsis">
                  <a
                    href={album.externalURL}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {album.name}
                  </a>
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {album.artists.map((artist, index) => (
                    <Fragment key={index}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        className="hover:brightness-150 hover:underline"
                      >
                        {artist.name}
                      </a>
                      {index < album.artists.length - 1 && ", "}
                    </Fragment>
                  ))}
                </h2>
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
              <a href={album.externalURL} target="_blank">
                {album.name}
              </a>
            </h1>
            <h2 className="text-2xl text-muted">
              {album.artists.map((artist, index) => (
                <Fragment key={index}>
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    className="hover:brightness-150 hover:underline"
                  >
                    {artist.name}
                  </a>
                  {index < album.artists.length - 1 && ", "}
                </Fragment>
              ))}
            </h2>
          </div>

          <section className="w-full gap-1">
            <div className="flex flex-wrap items-center justify-center w-full">
              {(summaries &&
                album.tracks &&
                album.tracks.items.map((item, index) => (
                  <div
                    id={index}
                    className="animate-slide-in flex m-[10px] transition-all sm:max-w-[400px] duration-300 w-full items-center justify-center text-center sm:overflow-visible overflow-hidden"
                    key={index}
                    style={{
                      transform: "translateX(30px)",
                      opacity: 0,
                      animationDuration: "500ms",
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <SongCard
                      id={item.id}
                      name={
                        (item.track_number ? item.track_number + ". " : "") +
                        item.name
                      }
                      artistName={item.artists[0].name}
                      summary={
                        summaries.has(item.id)
                          ? summaries.get(item.id)
                          : "loading"
                      }
                      spotifyURL={item.external_urls.spotify}
                      // isLast={index === topSongs.length - 1}
                      // newLimit={() => setCurrentOffset(currentOffset + limit)}
                    />
                  </div>
                ))) || (
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

export default AlbumPage;
