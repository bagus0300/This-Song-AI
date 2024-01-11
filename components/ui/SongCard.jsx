"use client";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "./skeleton";

const SongCard = ({
  id,
  imageURL,
  name,
  artistName,
  summary,
  spotifyURL,
  newLimit,
  isLast
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        console.log("Last card is intersecting");
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    const animationObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log(entry);
        animationObserver.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
    animationObserver.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center"
      ref={cardRef}
    >
      <a href={`/song/${id}`} className="flex-grow w-full h-full">
        <div className="w-full md:w-[400px] h-full flex flex-col group hover:bg-card justify-center pb-2">
          <div className="flex items-center justify-center flex-grow max-h-[100px] w-full gap-2 px-3 overflow-hidden">
            <img className="w-16 h-16" src={imageURL} alt="Album image" />
            <p className="overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
              {name}
              <br />
              <span className="inline-flex justify-between text-muted">
                {/* <span>Popularity: {item.track.popularity}</span> */}
                <span>{artistName}</span>
              </span>
              <br />
              {/* <span className="text-foreground">{item.album.name}</span> */}
            </p>
          </div>
          <div className="max-h-[125px] px-2 overflow-auto text-sm duration-300 text-muted group-hover:text-primary text-ellipsis">
            {summary ? (
              summary
            ) : (
              <div className="flex flex-col items-center justify-center text-center align-middle">
                <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
                <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
                <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" />
              </div>
            )}
          </div>
        </div>
      </a>
      <a className="w-full" href={spotifyURL} target="_blank">
        <div className="flex gap-2 items-center justify-center w-full h-9 text-base bg-[#1DB954] text-white hover:brightness-110">
          <img
            src="/images/Spotify_Icon_RGB_White.png"
            className="w-5 h-5"
            alt="Listen on Spotify"
          />
          Listen on Spotify
        </div>
      </a>
    </div>
  );
};

export default SongCard;
