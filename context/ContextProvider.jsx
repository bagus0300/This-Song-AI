"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
