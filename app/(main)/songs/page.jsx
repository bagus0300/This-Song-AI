import React from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import Playlist from "@/components/Playlist";

const Song = () => {
  const trendingPlaylist = "37i9dQZEVXbMDoHDwVN2tF";

  return (
    <section
      className={clsx(
        "flex flex-col items-center justify-center pt-2 text-center"
      )}
    >
      <p className={clsx(rajdhani.className, "mt-2 text-lg")}>
        Select a song or use the menu to explore popular tracks.
      </p>
      <h2
        id="top-content"
        className={clsx(
          rajdhani.className,
          "text-2xl font-bold text-center pt-9"
        )}
      >
        Trending Songs
      </h2>
      <Playlist playlist={trendingPlaylist} limit={15} />
    </section>
  );
};

export default Song;
