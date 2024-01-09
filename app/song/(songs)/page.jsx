import React from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";

const Song = () => {
  return (
    <section
      className={clsx(
        rajdhani.className,
        "flex flex-col items-center justify-center pt-2"
      )}
    >
      <h1 className="text-2xl font-bold">Welcome to This Song!</h1>
      <p className="mt-2 text-lg">
        This Song is a tool providing AI-enhanced analysis of song lyrics.
      </p>
      <p className="mt-2 text-base">
        Search for a song, or use the menu to explore popular tracks.
      </p>
    </section>
  );
};

export default Song;
