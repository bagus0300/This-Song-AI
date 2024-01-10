import { NextResponse } from "next/server";
import { playlistIDs } from "@/lib/data";
import axios from "axios";

export async function GET() {
  const BACKEND_URI =
    process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
      ? "http://192.168.4.158:8000"
      : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

  const playlistsList = [];

  const { data } = await axios.get(`${BACKEND_URI}/client_token`);
  const token = data.access_token;

  for (let playlistID of playlistIDs) {
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const playlistData = await playlistResponse.json();

    const newPlaylist = {
      id: playlistID,
      name: playlistData.name,
      imageURL: playlistData.images ? playlistData.images[0].url : null,
      description: playlistData.description,
      externalURL: playlistData.external_urls.spotify
    };

    playlistsList.push(newPlaylist);
  }

  return NextResponse.json(playlistsList);
}
