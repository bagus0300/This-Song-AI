import React, { useEffect, useRef, useState } from "react";
import SongItem from "./song-item";
import { set } from "react-hook-form";
import SongCard from "./SongCard";

const ArtistTopSongs = ({ artistID, limit = 10, offset = 0 }) => {
  const [songs, setSongs] = useState(null);
  const [songOffset, setSongOffset] = useState(offset);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleSongOffset = () => {
    setLoadingMore(true);
    setSongOffset((prev) => prev + 10);
  };

  useEffect(() => {
    const getSongs = async () => {
      try {
        const songResponse = await fetch(
          `/api/artists/${artistID}/top-tracks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const songJSON = await songResponse.json();

        console.log(songJSON);

        setSongs(songJSON);
      } catch (e) {
        console.log(e);
      }
    };

    getSongs();

    return () => {};
  }, []);

  return (
    (songs && (
      <div className="flex flex-row flex-wrap justify-center gap-1 py-2">
        {songs.map((item, index) => (
          <div
            id={index}
            className="animate-slide-in flex m-[10px] transition-all sm:max-w-[400px] duration-300 w-full items-center justify-center text-center sm:overflow-visible overflow-hidden"
            key={index}
            style={{
              transform: "translateX(30px)",
              opacity: 0,
              animationDuration: "500ms",
              animationDelay: `${index * 100}ms`
            }}
          >
            <SongCard
              id={item.id}
              imageURL={item.album.images[2].url}
              name={item.name}
              artistName={item.artists[0].name}
              displayArtist={false}
              summary="loading"
              spotifyURL={item.external_urls.spotify}
              previewURL={item.preview_url}
              // isLast={index === topSongs.length - 1}
              // newLimit={() => setCurrentOffset(currentOffset + limit)}
            />
          </div>
        ))}
      </div>
    )) || (
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
    )
  );
};

export default ArtistTopSongs;
