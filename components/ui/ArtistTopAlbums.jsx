import React, { useEffect, useRef, useState } from "react";
import AlbumItem from "./album-item";
import { set } from "react-hook-form";

const ArtistTopAlbums = ({ artistID, limit = 10, offset = 0 }) => {
  const [albums, setAlbums] = useState(null);
  const [albumOffset, setAlbumOffset] = useState(offset);
  const [hasNext, setHasNext] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleAlbumOffset = () => {
    setLoadingMore(true);
    setAlbumOffset((prev) => prev + 10);
  };

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const albumResponse = await fetch(
          `/api/artists/${artistID}/albums?limit=${limit}&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const albumJSON = await albumResponse.json();

        if (albumJSON.next === null) {
          setHasNext(false);
        }

        console.log(albumJSON.albums);

        setAlbums(albumJSON.albums);
      } catch (e) {
        console.log(e);
      }
    };

    getAlbums();

    return () => {};
  }, []);

  useEffect(() => {
    const getMoreAlbums = async () => {
      try {
        const albumResponse = await fetch(
          `/api/artists/${artistID}/albums?limit=${limit}&offset=${albumOffset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const albumJSON = await albumResponse.json();

        if (albumJSON.next === null) {
          setHasNext(false);
        }

        console.log(albumJSON.albums);

        setAlbums((prev) => prev.concat(albumJSON.albums));
        setLoadingMore(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (albumOffset > 0) getMoreAlbums();
  }, [albumOffset]);

  return (
    (albums && (
      <div className="flex flex-col gap-1 py-2">
        {albums.map((item, index) => (
          <div
            className="animate-slide-in border-2 w-[300px] rounded-md hover:bg-card"
            key={index}
            style={{
              transform: "translateX(30px)",
              opacity: 0,
              animationDuration: "500ms",
              animationDelay: `${(index - albumOffset) * 100}ms`
            }}
          >
            <AlbumItem
              key={index}
              item={item}
              info="year"
              // path={pathname}
              // onClick={onClick}
            />
          </div>
        ))}
        {hasNext &&
          ((!loadingMore && (
            <p
              className="text-right cursor-pointer text-muted"
              onClick={handleAlbumOffset}
            >
              More...
            </p>
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

export default ArtistTopAlbums;
