import { NextResponse } from "next/server";
import axios from "axios";
import { getClientToken } from "@/lib/clientToken";

export async function GET(request, { params }) {
  const artistID = [params.id];

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset") || 0;

  console.log("artistID", artistID);

  try {
    const tokenResponse = await getClientToken();
    const token = tokenResponse.access_token;

    const artistSongsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const artistSongsData = await artistSongsResponse.json();

    console.log(artistSongsData);

    return NextResponse.json(artistSongsData.tracks);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
