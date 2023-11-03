import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
// import { clientAccessToken } from "@/lib/spotify";

const Search = () => {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const getAccessToken = async () => {
  //     const accessToken = await clientAccessToken;
  //     setToken(accessToken);
  //   };
  //   getAccessToken();
  // }, []);

  return (
    <div>
      <Input />
    </div>
  );
};

export default Search;
