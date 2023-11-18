"use client";
import { TokenContext } from "@/context/ContextProvider";
import { getTrack } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { useScroll, useTransform } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

const Page = ({ params }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  const { token } = useContext(TokenContext);

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  const id = params.id;
  const pathname = usePathname();

  useEffect(() => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);
    setScrolled(false);

    const fetchData = async () => {
      console.log("Getting song...");
      const track = await getTrack(id);
      console.log("track", track);
      setData(track.data);
      setStatus(track.status);
    };
    catchErrors(fetchData());
  }, []);

  return <div>{id}</div>;
};

export default Page;
