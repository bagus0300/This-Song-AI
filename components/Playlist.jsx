"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import SongCard from "./ui/SongCard";
import { Button } from "./ui/button";
import clsx from "clsx";
import { rajdhani } from "./ui/fonts";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/api/v1/gpt/summary`;

const Playlist = ({ playlist, limit = 40, offset = 0 }) => {
  let [topSongs, setTopSongs] = useState(null);
  const [ready, setReady] = useState(false);
  const [summaries, setSummaries] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  let errorMessage = "";

  console.log("Rendering Playlist.jsx");

  const getSongs = async (offset = 0) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URI}/api/v1/spotify/client_token`
      );

      const token = data.access_token;

      // console.log("Getting top songs...");

      // Today's top hits: 37i9dQZF1DXcBWIGoYBM5M
      // Rock classics: 37i9dQZF1DWXRqgorJj26U
      axios.defaults.baseURL = "https://api.spotify.com/v1";
      axios.defaults.headers["Content-Type"] = "application/json";
      const topSongsResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlist}/tracks?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: "no-store"
        }
      );

      // setTopSongs((prev) =>
      //   prev
      //     ? [...prev, topSongsResponse.data.items]
      //     : [topSongsResponse.data.items]
      // );
      setTopSongs((prev) =>
        prev
          ? prev.concat(topSongsResponse.data.items)
          : topSongsResponse.data.items
      );

      const songs = topSongsResponse.data.items;
      console.log("songs", songs);

      // return songs;

      // const allSummaries = new Map();

      // await Promise.all(
      //   songs.map(async (element) => {
      //     // console.log(element.track.name);
      //     const songID = element.track.id;
      //     const songName = element.track.name;
      //     const artistName = element.track.artists[0].name;

      //     const parameters = new URLSearchParams([
      //       ["trackName", songName],
      //       ["artistName", artistName]
      //     ]);

      //     const gpt4Response = await fetch(
      //       `${GPT_SUMMARY_ENDPOINT}?${parameters.toString()}`,
      //       {
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json"
      //         },
      //         cache: "no-store"
      //       }
      //     );

      //     if (gpt4Response.ok) {
      //       const summary = await gpt4Response.text();
      //       if (summary) {
      //         // console.log("songID", songID);
      //         // console.log("songName", songName);
      //         // console.log("summary", summary);
      //         const firstLetter = summary.slice(13, 14);
      //         const restOfSummary = summary.slice(14);
      //         allSummaries.set(
      //           element.track.id,
      //           firstLetter.toUpperCase() + restOfSummary
      //         );
      //       } else {
      //         allSummaries.set(
      //           element.track.id,
      //           // "Description currently unavailable."
      //           "Click to generate description!"
      //         );
      //       }
      //     }
      //   })
      // );

      // setSummaries((prev) =>
      //   prev ? new Map([...prev, ...allSummaries]) : allSummaries
      // );
      // console.log(summaries);
      // setReady(true);
    } catch (e) {
      console.log(e);
      errorMessage = JSON.stringify(e);
      errorMessage = e.code;
    }
  };

  useEffect(() => {
    setTopSongs(null);
    setReady(false);
    setSummaries(null);
    setCurrentOffset(0);

    getSongs();
  }, [playlist]);

  useEffect(() => {
    console.log("summaries");
    console.log(summaries);
    console.log("topSongs", topSongs);
  }, [summaries]);

  useEffect(() => {
    console.log("topSongs", topSongs);
  }, [topSongs]);

  useEffect(() => {
    if (currentOffset === 0) return;
    if (currentOffset === limit) {
      const footer = document.querySelector("footer");

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const button = document.getElementById("scroll-to-top-button");
          console.log("Reached bottom of page");
          button.style.visibility = "visible";
          button.style.opacity = 1;
        }
      });

      observer.observe(footer);
    }

    getSongs(currentOffset);
  }, [currentOffset]);

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {(topSongs &&
          topSongs.length > 0 &&
          topSongs.map((item, index) => (
            <div
              id={index}
              className="flex m-[10px] transition-all sm:max-w-[400px] duration-300 w-full items-center justify-center sm:overflow-visible overflow-hidden"
              key={index}
            >
              <SongCard
                id={item.track.id}
                imageURL={item.track.album.images[2].url}
                name={item.track.name}
                artistName={item.track.artists[0].name}
                // summary={
                //   summaries && summaries.has(item.track.id)
                //     ? summaries.get(item.track.id)
                //     : "loading"
                // }
                summary="loading"
                spotifyURL={item.track.external_urls.spotify}
                isLast={index === topSongs.length - 1}
                newLimit={() => setCurrentOffset(currentOffset + limit)}
              />
            </div>
          ))) || (
          <>
            <div className="flex flex-wrap items-center justify-center w-full">
              {new Array(20).fill().map((item, index) => (
                <div
                  className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[225px] items-center justify-center"
                  key={index}
                >
                  <div className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center flex-grow">
                    <div className="flex items-center justify-center w-full gap-2 p-2 overflow-x-hidden">
                      <Skeleton className="w-16 h-16" />
                      <div className="flex flex-col items-center w-[70%] gap-2">
                        <Skeleton className="w-full h-7" />
                        <Skeleton className="w-[70%] h-5" />
                      </div>
                    </div>
                    <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
                    <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
                    <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Button
        id="scroll-to-top-button"
        variant="outline"
        onClick={(e) => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          e.target.style.visibility = "hidden";
          e.target.style.opacity = 0;
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          transition: "opacity 1s, visibility 1s",
          visibility: currentOffset === 0 ? "hidden" : "visible",
          opacity: currentOffset === 0 ? 0 : 1
        }}
      >
        Scroll to Top
      </Button>
    </section>
  );
};

export default Playlist;
