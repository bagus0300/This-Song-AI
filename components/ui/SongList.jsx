import { React, useState, useEffect, useContext } from "react";
import {
  getClientAccessToken,
  getRecentlyPlayed,
  getTopSongs,
  getTopSongsGlobal,
  hasClientTokenExpired
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";

import SongItem from "@/components/ui/song-item";
import { usePathname } from "next/navigation";
import { Skeleton } from "./skeleton";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { TokenContext } from "@/context/ContextProvider";

const SongList = ({ songs, onClick = null }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const { data: session } = useSession();
  const pathname = usePathname();

  console.log("Rendering SongList.jsx");

  const { clientToken, setClientToken } = useContext(TokenContext);

  useEffect(() => {
    getSongs();
  }, [session?.accessToken]);

  // Awaits the songs that have been recently played and sets state variables accordingly
  const getSongs = () => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    // console.log("Getting recent songs...");
    const fetchData = async () => {
      if (songs === "recent" && session) {
        // console.log(session.accessToken);
        const recentSongs = await getRecentlyPlayed(session.accessToken);
        console.log("recentSongs", recentSongs);
        setData(recentSongs.data);
        setStatus(recentSongs.status);
      } else if (songs === "top-user" && session) {
        // console.log(session.accessToken);
        const topSongs = await getTopSongs(session.accessToken);
        console.log("topSongs", topSongs);
        setData(topSongs.data);
        setStatus(topSongs.status);
      } else if (songs === "top-global") {
        let token = null;
        let accessToken = null;
        if (session && session.accessToken) {
          accessToken = session.accessToken;
        } else {
          token = clientToken;
          if (!token) {
            token = await getClientAccessToken();
            setClientToken(token);
            console.log("token", token);
            console.log("clientToken", clientToken);
            accessToken = token.clientToken;
          } else {
            console.log("Found a token in TokenContext");
            if (hasClientTokenExpired(token)) {
              console.log("Token has expired");
              token = await getClientAccessToken();
              setClientToken(token);
              console.log("token", token);
              console.log("clientToken", clientToken);
            }
            accessToken = token.clientToken;
          }
        }

        console.log("search token", accessToken);

        const topSongs = await getTopSongsGlobal(accessToken);
        console.log("topSongs", topSongs);
        setData(topSongs.data.tracks);
        setStatus(topSongs.status);
      }
    };

    catchErrors(fetchData());
  };

  return (
    <section className="flex flex-col items-center w-full gap-1">
      <div className={clsx("lg:flex items-center justify-center h-10 hidden")}>
        {songs === "recent" && "Recently Played"}
        {songs === "top-user" &&
          session &&
          session?.user?.name + "'s Top Songs"}
        {songs === "top-user" && !session && "Your Top Songs"}
        {songs === "top-global" && "Most Popular Songs"}
      </div>
      <div className="w-full max-w-[85dvw] md:max-w-[462px] lg:h-[calc(100dvh-64px-40px-32px-40px)] h-[calc(80dvh-48px-2px-24px)] overflow-y-scroll">
        {(data &&
          data.items.map((item, index) => (
            <SongItem
              // We can't set the key to the song's id because the same song could be in the recently-played list multiple times, so we'll use the index instead
              key={index}
              item={item.track ?? item}
              path={pathname}
              onClick={onClick}
            />
          ))) ||
          (status == 204 && (
            <>
              <p>No content to display.</p>
            </>
          )) ||
          ((songs === "recent" || songs === "top-user") && !session && (
            <>
              <p>Not signed in.</p>
            </>
          )) ||
          new Array(10).fill(0).map((item, index) => (
            <div className="py-2" key={index}>
              <div className="flex flex-row items-start justify-start w-full gap-1 align-middle">
                <Skeleton className="min-w-[64px] min-h-[64px] w-[64px] h-[64px]" />
                <div className="flex flex-col items-start justify-start gap-2">
                  <Skeleton className="w-[200px] h-[16px]" />
                  <Skeleton className="w-[100px] h-[16px]" />
                  <Skeleton className="w-[150px] h-[16px]" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SongList;
