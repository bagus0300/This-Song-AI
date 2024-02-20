import React, { useEffect, useRef, useState } from "react";
import ArtistItem from "./artist-item";
import { set } from "react-hook-form";

const RelatedArtists = ({ artistID, offset = 5 }) => {
  const [artists, setArtists] = useState(null);
  const [artistOffset, setArtistOffset] = useState(offset);
  const [hasNext, setHasNext] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleArtistOffset = () => {
    setArtistOffset((prev) => prev + 5);
  };

  useEffect(() => {
    const getArtists = async () => {
      try {
        const artistsResponse = await fetch(
          `/api/artists/${artistID}/related-artists`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const artistsJSON = await artistsResponse.json();

        if (artistsJSON.next === null) {
          setHasNext(false);
        }

        console.log("artistsJSON", artistsJSON);

        setArtists(artistsJSON);
      } catch (e) {
        console.log(e);
      }
    };

    getArtists();

    return () => {};
  }, []);

  return (
    (artists && (
      <div className="flex flex-col gap-1 py-2">
        {artists.map(
          (item, index) =>
            index < artistOffset && (
              <div
                className="animate-slide-in border-2 w-[300px] rounded-md hover:bg-card p-1"
                key={index}
                style={{
                  transform: "translateX(30px)",
                  opacity: 0,
                  animationDuration: "500ms",
                  animationDelay: `${(index - artistOffset + offset) * 100}ms`
                }}
              >
                <ArtistItem
                  key={index}
                  item={item}
                  // path={pathname}
                  // onClick={onClick}
                />
              </div>
            )
        )}
        {artists && artistOffset < artists.length && (
          <p
            className="text-right cursor-pointer text-muted"
            onClick={handleArtistOffset}
          >
            More...
          </p>
        )}
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

export default RelatedArtists;
