"use client";
import React, { useEffect, useRef } from "react";
import SongData from "../song-data";

const Main = ({ children }) => {
  const ref = useRef(null);

  return (
    <div className="flex-grow" ref={ref}>
      <SongData parent={ref} />
      {children}
    </div>
  );
};

export default Main;
