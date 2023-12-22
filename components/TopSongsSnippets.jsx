import { getClientAccessToken } from "@/lib/spotify";
import React from "react";
import SongItem from "./ui/song-item";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

const TopSongsSnippets = async () => {
  const { data } = await axios.get(`${BACKEND_URI}/client_token`);

  const token = data.access_token;
  console.log("token", token);

  console.log("Getting top songs...");
  axios.defaults.baseURL = "https://api.spotify.com/v1";
  axios.defaults.headers["Content-Type"] = "application/json";
  const topSongs = await axios.get(
    `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  // console.log("topSongs", topSongs);
  const songs = topSongs.data.items;
  // console.log("songs", songs);

  const summaries = new Map();

  await Promise.all(
    songs.map(async (element) => {
      // console.log(element.track.name);
      const songID = element.track.id;
      const songName = element.track.name;

      const gpt4Response = await fetch(GPT_SUMMARY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          songID: songID,
          trackName: songName
        })
      });

      // console.log("GPT-4 fetch response: ", gpt4Response);
      if (gpt4Response.ok) {
        const summary = await gpt4Response.text();
        if (summary) {
          // console.log("GPT-4 summary response: ", summary);
          const firstLetter = summary.slice(13, 14);
          const restOfSummary = summary.slice(14);
          summaries.set(
            element.track.id,
            firstLetter.toUpperCase() + restOfSummary
          );
        }
      }
    })
  );

  // console.log("summaries", summaries);

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {(topSongs &&
          topSongs.data.items.map((item, index) => (
            <div
              className="flex py-4 m-4 transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[200px] items-center justify-center"
              key={index}
            >
              <a href={`/song/${item.track.id}`}>
                <div className="w-full md:w-[400px] h-[200px] flex flex-col items-center justify-center">
                  <div className="flex items-center w-full gap-2 p-2 overflow-x-hidden">
                    <img
                      className="w-16 h-16"
                      src={item.track.album.images[2].url}
                      alt="Album image"
                    />
                    <p className="justify-end flex-1 overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                      {item.track.name}
                      <br />
                      <span className="inline-flex justify-between text-muted">
                        {/* <span>Popularity: {item.track.popularity}</span> */}
                        <span>{item.track.artists[0].name}</span>
                      </span>
                      <br />
                      {/* <span className="text-foreground">{item.album.name}</span> */}
                    </p>
                  </div>
                  <p className="text-sm text-muted">
                    {summaries.has(item.track.id)
                      ? summaries.get(item.track.id)
                      : "Click to generate description!"}
                  </p>
                </div>
              </a>
            </div>
          ))) ||
          (status == 204 && (
            <>
              <p>No content to display.</p>
            </>
          )) ||
          (songs === "recent" && !session && (
            <>
              <p>Not signed in.</p>
            </>
          )) ||
          new Array(10).fill(0).map((item, index) => (
            <div className="py-2" key={index}>
              <div className="flex flex-row items-start justify-start w-full gap-1 align-middle">
                <Skeleton className="min-w-[64px] min-h-[64px] w-[64px] h-[64px]" />
                <div className="flex flex-col items-start justify-start gap-2">
                  <Skeleton className="w-[200px] h-[16px]" />
                  <Skeleton className="w-[100px] h-[16px]" />
                  <Skeleton className="w-[150px] h-[16px]" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TopSongsSnippets;
