import axios from "axios";

import { BACKEND_URL } from "./backendURL";

const PORT = 8000;

// const BACKEND_URI =
//   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
//     ? "http://192.168.4.158:8000"
//     : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

// const BACKEND_URI = process.env.BACKEND;

// const URL = `${BACKEND_URI}/musixmatch`;
const URL = `${BACKEND_URL}/api/v1/lyrics`;

export const getLyrics = async (trackName, artistName) => {
  // console.log(`Getting lyrics for ${trackName} by ${artist}`);
  const lyrics = [];

  const parameters = new URLSearchParams([
    ["trackName", trackName],
    ["artistName", artistName]
  ]);

  // console.log("Parameters: ", parameters.toString());

  // Await the completion of the `/lyrics` endpoint from the Node app
  const response = await axios({
    method: "get",
    url: URL,
    params: parameters
  });

  return response;
};
