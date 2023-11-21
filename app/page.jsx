"use client";

import { MenuContext, TokenContext } from "@/context/ContextProvider";
import React, { useContext } from "react";

const Page = () => {
  const { token } = useContext(TokenContext);
  const { menu, setMenu } = useContext(MenuContext);

  console.log("Token: ", token);

  if (token) {
    window.location.replace("/song");
  }

  if (token === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-10 text-base text-center align-bottom">
        <img src="/this_song.svg" alt="This Song logo" width={200} />
        <p>
          Discover the meaning behind your favorite songs through AI-enhanced
          lyric analysis!
        </p>
        <button
          className="inline-block lg:hidden px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110"
          onClick={() => setMenu(true)}
        >
          Click here to begin!
        </button>
      </div>
    );
  } else if (token === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-10 text-base text-center align-bottom">
        Loading...
      </div>
    );
  }
};

export default Page;
