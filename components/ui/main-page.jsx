"use client";
import React, { useEffect, useState } from "react";
import Playlist from "../Playlist";
import MainSearch from "../main-search";
import clsx from "clsx";
import { rajdhani } from "@/components/ui/fonts";
import { Bars } from "react-loader-spinner";
import SongItem from "./song-item";
import { catchErrors } from "@/lib/utils";
import { getClientAccessToken, searchTracks } from "@/lib/spotify";
import { usePathname } from "next/navigation";
import SongItemMain from "./song-item-main";

const MainPage = () => {
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const pathname = usePathname();

  const searchSongs = (term) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (term) {
      // console.log(`Searching for ${term}...`);

      const fetchData = async () => {
        let token = null;
        let accessToken = null;

        token = await getClientAccessToken();
        console.log("token", token);
        accessToken = token.clientToken;

        console.log("search token", accessToken);

        const searchResults = await searchTracks(term, accessToken);
        setData(searchResults.data.tracks);
        setStatus(searchResults.status);
        // console.log("searchResults", searchResults);
      };

      catchErrors(fetchData());
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full overflow-hidden text-base text-center align-bottom md:gap-5 md:bg-fixed"
        style={{
          backgroundImage: "url(/images/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "100% 100%"
        }}
      >
        <img
          src="images/this-song-logo-white.png"
          alt="This Song"
          width={720}
          height={576}
          id="top-content"
        />
        <div className="mt-[-100px] flex flex-col gap-5 items-center justify-center">
          <h1
            className={clsx(
              rajdhani.className,
              `md:text-3xl text-2xl`,
              "px-10 text-white"
            )}
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Discover the meaning behind your favorite songs!
          </h1>
          {/* <a
        href="songs"
        className="inline-block font-bold text-lg md:text-xl px-6 py-2 text-white bg-[#1DB954] rounded-full hover:brightness-110"
      >
        Click here to search for a song!
      </a> */}
          <MainSearch
            setSearching={setSearching}
            setSearchTermParent={setSearchTerm}
            searchSongs={searchSongs}
          />
        </div>
        <img
          src="images/border-bottom.png"
          className="w-full md:min-w-[1400px] h-[70px] pointer-events-none"
        />
      </div>
      <div
        className={clsx(
          !searching
            ? "hidden"
            : "flex flex-row flex-wrap justify-center w-full max-w-7xl gap-2 min-h-[100vh]"
        )}
      >
        {(data &&
          data.items.map((item, index) => (
            <div
              className="border-2 w-[300px] rounded-md hover:bg-card"
              key={index}
            >
              <SongItemMain
                // We can't set the key to the song's id because the same song could be in the recently played list multiple times, so we'll use the index instead
                key={index}
                item={item}
                path={pathname}
              />
            </div>
          ))) ||
          (status == 204 && (
            <>
              <p>No content to display.</p>
            </>
          )) ||
          (searchTerm && (
            <div className="flex-col items-start justify-start">
              <p>Searching for {searchTerm}...</p>
              <Bars
                height="50"
                width="50"
                color="#1fdf64"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="mx-auto items-center justify-center"
                visible={true}
                className="w-full"
              />
            </div>
          )) || <></>}
      </div>
      <div className={clsx(searching ? "hidden" : "w-full")}>
        <h2
          className={clsx(
            rajdhani.className,
            "px-2 text-xl font-bold text-center"
          )}
        >
          Trending Songs
        </h2>
        <p className={clsx(rajdhani.className, "text-base mt-1")}>
          (Select a song to learn more)
        </p>
        <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2">
          {/* <Suspense fallback={<TopSongsSnippetsSkeleton />}>
          <TopSongsSnippets limit="24" offset="0" />
        </Suspense> */}
          <Playlist playlist="37i9dQZF1DXcBWIGoYBM5M" limit={12} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
