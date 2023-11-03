import { React, useState, useEffect } from "react";
import { getRecentlyPlayed } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";

const Recent = () => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getRecentSongs();
  }, []);

  // Awaits the songs that have been recently played and sets state variables accordingly
  const getRecentSongs = () => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    console.log("Getting recent songs...");
    const fetchData = async () => {
      const recentSongs = await getRecentlyPlayed();
      console.log("recentSongs", recentSongs);
      setData(recentSongs.data);
      setStatus(recentSongs.status);
    };

    catchErrors(fetchData());
  };

  return <div>Recent</div>;
};

export default Recent;
