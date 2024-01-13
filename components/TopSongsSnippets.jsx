import React from "react";
import axios from "axios";
import { initialSongs } from "@/lib/data";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

const TopSongsSnippets = async ({ limit = 10, offset = 0 }) => {
  let topSongs = null;
  const summaries = new Map();
  let errorMessage = "";
  let parsedSongs = null;

  try {
    // Get a client token to make sure the backend server wakes from its idle state
    const response = axios.get(`${BACKEND_URI}/client_token`);

    // Simulate waiting for data fetch
    // If the server isn't idle, getting the data should take about a second
    // When it's idle it can take much longer, so for now this page is just getting its data directly from a file rather than from the server, so that users won't have to wait a long time if they visit the site when the server happens to be idle
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    parsedSongs = initialSongs.map((song) => JSON.parse(song));

    // console.log(
    //   songs.map((element) => {
    //     return JSON.stringify({
    //       id: element.track.id,
    //       name: element.track.name,
    //       artist: element.track.artists[0].name,
    //       album: element.track.album.name,
    //       popularity: element.track.popularity,
    //       image: element.track.album.images[2].url,
    //       url: element.track.external_urls.spotify,
    //       summary: summaries.get(element.track.id)
    //     });
    //   })
    // );
  } catch (e) {
    console.log(e);
    errorMessage = JSON.stringify(e);
    errorMessage = e.code;
  }

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full overflow-hidden">
        {(parsedSongs &&
          parsedSongs.map((item, index) => (
            <div
              className="animate-slide-in flex m-[10px] max-w-[400px] transition-all duration-300 border-[1px] rounded-lg cursor-pointer md:w-[400px] w-full items-center justify-center overflow-hidden"
              style={{
                transform: "translateX(30px)",
                opacity: 0,
                animationDuration: "500ms",
                animationDelay: `${index * 200}ms`
              }}
              key={index}
            >
              <div className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center">
                <a
                  href={`/song/${item.id}`}
                  className="flex-grow w-full h-full"
                >
                  <div className="w-full md:w-[400px] h-full flex flex-col group hover:bg-card justify-center pb-2">
                    <div className="flex items-center justify-center flex-grow max-h-[100px] w-full gap-2 px-3 overflow-hidden">
                      <img
                        className="w-16 h-16"
                        src={item.image}
                        alt="Album image"
                      />
                      <p className="overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                        {item.name}
                        <br />
                        <span className="inline-flex justify-between text-muted">
                          {/* <span>Popularity: {item.track.popularity}</span> */}
                          <span>{item.artist}</span>
                        </span>
                        <br />
                        {/* <span className="text-foreground">{item.album.name}</span> */}
                      </p>
                    </div>
                    <div className="px-2 max-h-[120px] overflow-auto text-sm duration-300 text-muted group-hover:text-primary text-ellipsis">
                      {item.summary}
                    </div>
                  </div>
                </a>
                <a className="w-full" href={item.url} target="_blank">
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
            </div>
          ))) || (
          <>
            <p>Failed to connect to server: {errorMessage}.</p>
          </>
        )}
      </div>
      {parsedSongs && (
        <p
          className="mt-8 mb-4 animate-fade-in"
          style={{
            opacity: 0,
            animationDuration: "500ms",
            animationDelay: `${parsedSongs.length * 200}ms`
          }}
        >
          <a
            href="song/playlist"
            className="inline-block font-bold text-lg md:text-xl px-6 py-2 text-white bg-[#1DB954] rounded-full hover:brightness-110"
          >
            Explore more playlists
          </a>
        </p>
      )}
    </section>
  );
};

export default TopSongsSnippets;
