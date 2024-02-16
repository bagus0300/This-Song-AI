import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const artistID = [params.id];

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset") || 0;

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

    const artistAlbumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?limit=${limit}&offset=${offset}&include_groups=album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const artistAlbumsData = await artistAlbumsResponse.json();

    console.log(artistAlbumsData);

    const newArtistAlbums = {
      id: artistID,
      albums: artistAlbumsData.items,
      total: artistAlbumsData.total,
      limit: artistAlbumsData.limit,
      offset: artistAlbumsData.offset,
      next: artistAlbumsData.next
    };

    return NextResponse.json(newArtistAlbums);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
