"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const TokenContext = createContext();
export const SongContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [songID, setSongID] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <SongContext.Provider value={{ songID, setSongID }}>
        {children}
      </SongContext.Provider>
    </TokenContext.Provider>
  );
};
