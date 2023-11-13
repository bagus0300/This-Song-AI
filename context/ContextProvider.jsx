"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const TokenContext = createContext();
export const SongContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [song, setSong] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <SongContext.Provider value={{ song, setSong }}>
        {children}
      </SongContext.Provider>
    </TokenContext.Provider>
  );
};
