import { NextResponse } from "next/server";
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

    const relatedArtistsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("relatedArtistsResponse", relatedArtistsResponse);

    const relatedArtistsData = await relatedArtistsResponse.json();

    console.log("relatedArtistsData", relatedArtistsData);

    return NextResponse.json(relatedArtistsData.artists);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
