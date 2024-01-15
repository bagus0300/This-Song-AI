"use client";
import SongCard from "@/components/ui/SongCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
  const [summaries, setSummaries] = useState(null);

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

        console.log("album.tracks.items", albumJSON.tracks.items);

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

        return albumJSON;
      } catch (e) {
        console.log(e);
      }
    };

    getAlbum();
  }, []);

  useEffect(() => {
    console.log("album", album);
  }, [album]);

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {(album &&
          summaries &&
          album.tracks &&
          album.tracks.items.map((item, index) => (
            <div
              id={index}
              className="flex m-[10px] transition-all sm:max-w-[400px] duration-300 w-full items-center justify-center text-center sm:overflow-visible overflow-hidden"
              key={index}
            >
              <SongCard
                id={item.id}
                name={
                  (item.track_number ? item.track_number + ". " : "") +
                  item.name
                }
                artistName={item.artists[0].name}
                summary={
                  summaries.has(item.id) ? summaries.get(item.id) : "loading"
                }
                spotifyURL={item.external_urls.spotify}
                // isLast={index === topSongs.length - 1}
                // newLimit={() => setCurrentOffset(currentOffset + limit)}
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
                  <div className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center">
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
    </section>
  );
};

export default AlbumPage;
