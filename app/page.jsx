"use client";

import { TokenContext } from "@/context/ContextProvider";
import React, { useContext } from "react";

const Page = () => {
  const { token } = useContext(TokenContext);

  if (token) {
    window.location.replace("/song");
  }

  return (
    <div className="text-base">
      Log in with Spotify to see the song you are currently listening to.
    </div>
  );
};

export default Page;
