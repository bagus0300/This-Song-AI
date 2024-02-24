"use client";
import axios from "axios";

const PORT = 8000;
// const BACKEND_URI = "http://192.168.4.158:8000";
// const BACKEND_URI =
//   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
//     ? "http://192.168.4.158:8000"
//     : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const BACKEND_URI = process.env.BACKEND;

// const BACKEND_URI = "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const URL = `${BACKEND_URI}/musixmatch`;
// const URL = "https://mysterious-garden-90298-d115e921537b.herokuapp.com/musixmatch";

export const getLyrics = async (trackName, artist, albumName) => {
  // console.log(`Getting lyrics for ${trackName} by ${artist}`);
  const lyrics = [];

  const parameters = new URLSearchParams([
    ["trackName", trackName],
    ["artistName", artist],
    ["albumName", albumName]
  ]);

  // console.log("Parameters: ", parameters.toString());

  // Await the completion of the `/musixmatch` endpoint from the Node app
  const response = await axios({
    method: "get",
    url: URL,
    params: parameters
  });

  // console.log("Response: ", response);

  return response;
};
