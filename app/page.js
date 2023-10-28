"use client";
import Image from "next/image";

import { accessToken, logout } from "@/lib/spotify";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>This Song</h1>
      <section>
        <a className="App-link" href="http://localhost:8000/login">
          Log in to Spotify
        </a>
      </section>
    </main>
  );
}
