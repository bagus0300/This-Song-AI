import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>This Song</h1>
      <section>
        <a className="App-link" href="http://localhost:8888/login">
          Log in to Spotify
        </a>
      </section>
    </main>
  );
}
