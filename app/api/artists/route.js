import { NextResponse } from "next/server";
import axios from "axios";
import { getClientToken } from "@/lib/clientToken";

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const artistID = searchParams.get("artistID");

  console.log("artistID", artistID);

  try {
    const tokenResponse = await getClientToken();
    const token = tokenResponse.access_token;

    const artistResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const artistData = await artistResponse.json();

    const newArtist = {
      id: artistID,
      name: artistData.name,
      imageURL: artistData.images ? artistData.images[0].url : null,
      externalURL: artistData.external_urls.spotify,
      genres: artistData.genres,
      followers: artistData.followers.total,
      popularity: artistData.popularity
    };

    return NextResponse.json(newArtist);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
