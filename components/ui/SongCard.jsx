"use client";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "./skeleton";
import clsx from "clsx";

const SongCard = ({
  id,
  imageURL = null,
  name,
  artistName,
  summary,
  spotifyURL,
  newLimit = null,
  isLast = false
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
        if (window.scrollY < 100) {
          entry.target.classList.remove("duration-1000");
          entry.target.classList.add("duration-0");
          entry.target.style.transitionDelay = "0s";
        } else {
          // entry.target.style.willChange = "transform, opacity";
        }
        console.log(entry);
        entry.target.classList.remove("opacity-0");
        entry.target.classList.remove("translate-x-[30px]");
        animationObserver.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
    animationObserver.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      className="w-full max-w-[400px] md:w-[400px] h-[225px] flex flex-col items-center justify-center opacity-0 translate-x-[30px] transition-all duration-1000 border-[1px] rounded-lg overflow-hidden rotate-[0.01deg]"
      style={{
        // Add a random transition delay to each card when the window allows more than one card per row
        transitionDelay:
          window && window.innerWidth >= 840 ? `${Math.random() * 0.5}s` : "0s"
        // willChange: "transform, opacity"
      }}
      ref={cardRef}
    >
      <a href={`/songs/${id}`} className="flex-grow w-full h-full">
        <div
          className={clsx(
            "w-full md:w-[400px] h-full flex flex-col group hover:bg-card pb-2",
            imageURL ? "justify-center" : "justify-start"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center  max-h-[100px] w-full gap-2 px-3 overflow-hidden rotate-[0.01deg]",
              imageURL ? "flex-grow" : "pt-4"
            )}
          >
            {imageURL && (
              <img className="w-16 h-16" src={imageURL} alt="Album image" />
            )}
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
          <div
            className={clsx(
              "max-h-[125px] px-2 overflow-auto text-sm duration-300 my-auto text-muted group-hover:text-primary text-ellipsis",
              !imageURL && ""
            )}
          >
            {summary && summary != "loading" ? (
              summary
            ) : (
              <div className="flex flex-col items-center justify-center text-center align-middle">
                {/* <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
                <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
                <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" /> */}
                Loading description...
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
