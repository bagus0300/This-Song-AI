import axios from "axios";

const PORT = 8000;

// const BACKEND_URI = "http://192.168.4.158:8000";
const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

// const URL = `${BACKEND_URI}/musixmatch`;
const URL = `${BACKEND_URI}/gpt`;

// const URL = `http://192.168.4.158:${PORT}/genius`;

export const getGPTResponse = async (trackName, artist, albumName) => {
  console.log(`Getting lyrics for ${trackName} by ${artist}`);
  const lyrics = [];

  const response = await axios({
    method: "POST",
    url: URL,
    headers: {
      "Content-Type": "application/json"
    },
    params: parameters
  });

  return response;
};
