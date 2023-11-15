"use client";
import React, { useEffect, useRef } from "react";
import SongData from "../song-data";

const Main = ({ children }) => {
  const ref = useRef(null);

  return (
    <div className="flex-grow px-4 overflow-y-auto md:p-2" ref={ref}>
      <SongData parent={ref} />
      {children}
    </div>
  );
};

export default Main;
