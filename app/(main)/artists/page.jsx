import ArtistSearch from "@/components/ui/ArtistSearch";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import React from "react";

const ArtistPage = () => {
  return (
    <section
      className={clsx(
        rajdhani.className,
        "flex flex-col items-center justify-center text-center pt-2 pb-5"
      )}
    >
      {/* <h1 className="text-2xl font-bold">Welcome to This Song!</h1> */}
      <p className="mt-2 text-2xl">
        <span className="font-bold">This Song</span> can help you unravel an
        artist&apos;s ouvre, song by song.
      </p>
      {/* <p className="mt-2 text-base">Search for an album:</p> */}
      <div>
        <ArtistSearch />
      </div>
    </section>
  );
};

export default ArtistPage;
