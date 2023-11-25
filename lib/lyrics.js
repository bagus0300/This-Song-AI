import axios from "axios";

const PORT = 8000;

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

// const URL = `${BACKEND_URI}/musixmatch`;
const URL = `${BACKEND_URI}/lyrics`;

export const getLyrics = async (trackName, artist, albumName) => {
  // console.log(`Getting lyrics for ${trackName} by ${artist}`);
  const lyrics = [];

  const parameters = new URLSearchParams([
    ["trackName", trackName],
    ["artistName", artist],
    ["albumName", albumName]
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
