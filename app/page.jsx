"use client";

import { TokenContext } from "@/context/ContextProvider";
import React, { useContext } from "react";

const Page = () => {
  const { token } = useContext(TokenContext);

  console.log("Token: ", token);

  if (token) {
    window.location.replace("/song");
  }

  if (token === false) {
    return (
      <div className="text-base">
        Log in with Spotify to see the song you are currently listening to.
      </div>
    );
  } else if (token === null) {
    return <div className="text-base">Loading...</div>;
  }
};

export default Page;
