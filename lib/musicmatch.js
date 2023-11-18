import axios from "axios";

const PORT = 8000;

const URL = `http://192.168.4.158:${PORT}/musixmatch`;
// const URL = "https://mysterious-garden-90298-d115e921537b.herokuapp.com/musixmatch";

export const getLyrics = async (trackName, artist, albumName) => {
  console.log(`Getting lyrics for ${trackName} by ${artist}`);
  const lyrics = [];

  const parameters = new URLSearchParams([
    ["trackName", trackName],
    ["artistName", artist],
    ["albumName", albumName]
  ]);

  console.log("Parameters: ", parameters.toString());

  // Await the completion of the `/musixmatch` endpoint from the Node app
  const response = await axios({
    method: "get",
    url: URL,
    params: parameters
  });

  return response;
};
