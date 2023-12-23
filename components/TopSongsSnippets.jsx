import React from "react";
import axios from "axios";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

const TopSongsSnippets = async () => {
  let topSongs = null;
  const summaries = new Map();
  let errorMessage = "";

  try {
    const { data } = await axios.get(`${BACKEND_URI}/client_token`);

    const token = data.access_token;

    console.log("Getting top songs...");
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers["Content-Type"] = "application/json";
    topSongs = await axios.get(
      `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const songs = topSongs.data.items;
    // console.log("songs", songs);

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

        if (gpt4Response.ok) {
          const summary = await gpt4Response.text();
          if (summary) {
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
  } catch (e) {
    console.log(e);
    errorMessage = JSON.stringify(e);
    errorMessage = e.code;
  }

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full my-8">
        {(topSongs &&
          topSongs.data.items.map((item, index) => (
            <div
              className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[200px] items-center justify-center"
              key={index}
            >
              <a href={`/song/${item.track.id}`} className="w-full">
                <div className="w-full md:w-[400px] h-[200px] flex flex-col justify-center">
                  <div className="flex items-center justify-center w-full gap-2 p-2 overflow-x-hidden">
                    <img
                      className="w-16 h-16"
                      src={item.track.album.images[2].url}
                      alt="Album image"
                    />
                    <p className="overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
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
                  <p className="p-2 text-sm text-muted">
                    {summaries.has(item.track.id)
                      ? summaries.get(item.track.id)
                      : "Description currently unavailable."}
                  </p>
                </div>
              </a>
            </div>
          ))) || (
          <>
            <p>Failed to connect to server: {errorMessage}.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default TopSongsSnippets;
