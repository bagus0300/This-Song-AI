import { NextResponse } from "next/server";
import { playlistIDs } from "@/lib/data";
import axios from "axios";
import { getClientToken } from "@/lib/clientToken";

export async function GET() {
  const playlistsList = [];

  const tokenResponse = await getClientToken();
  const token = tokenResponse.access_token;

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
        ? playlistData.external_urls.spotify
        : "#"
    };

    playlistsList.push(newPlaylist);
  }

  return NextResponse.json(playlistsList);
}
