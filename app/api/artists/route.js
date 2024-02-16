import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const artistID = searchParams.get("artistID");

  console.log("artistID", artistID);

  try {
    const BACKEND_URI =
      process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
        ? "http://192.168.4.158:8000"
        : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

    const { data } = await axios.get(
      `${BACKEND_URI}/api/v1/spotify/client_token`
    );
    const token = data.access_token;

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
