import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function GET(request, { params }) {
  console.log("Token request received.");
  console.log("CLIENT_ID", CLIENT_ID);
  console.log("CLIENT_SECRET", CLIENT_SECRET);
  console.log(Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"));

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials"
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`
      }
    });

    const data = await res.json();

    console.log("data", data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
