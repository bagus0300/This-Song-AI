import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import React from "react";

const page = () => {
  return (
    <h1
      className={clsx(
        rajdhani.className,
        "text-3xl font-semibold tracking-wider text-center text-foreground"
      )}
    >
      Select a playlist
    </h1>
  );
};

export default page;
