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
      <p className="mt-2 text-lg">
        Search for a song or use the menu to explore popular tracks.
      </p>
    </section>
  );
};

export default Song;
