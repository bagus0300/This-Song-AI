"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// TokenContext is used to hold a client access token for Spotify
export const TokenContext = createContext();
export const SongContext = createContext();
export const MenuContext = createContext();

export const ContextProvider = ({ children }) => {
  const [clientToken, setClientToken] = useState(null);
  const [songID, setSongID] = useState(null);
  const [menu, setMenu] = useState(false);

  return (
    <TokenContext.Provider value={{ clientToken, setClientToken }}>
      <SongContext.Provider value={{ songID, setSongID }}>
        <MenuContext.Provider value={{ menu, setMenu }}>
          {children}
        </MenuContext.Provider>
      </SongContext.Provider>
    </TokenContext.Provider>
  );
};
