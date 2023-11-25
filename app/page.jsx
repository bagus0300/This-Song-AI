"use client";

import { MenuContext, TokenContext } from "@/context/ContextProvider";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const Page = () => {
  const { token } = useContext(TokenContext);
  const { menu, setMenu } = useContext(MenuContext);

  if (token) {
    // window.location.replace("/song");
    redirect("/song");
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
      <div className="flex flex-col items-center justify-center gap-5 text-base text-center align-bottom">
        <p className="relative top-[56px]">Loading...</p>
      </div>
    );
  }
};

export default Page;
