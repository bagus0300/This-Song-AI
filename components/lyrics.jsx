"use client";
import { SongContext } from "@/context/ContextProvider";
import { getLyrics } from "@/lib/musicmatch";
import { catchErrors } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";

const Lyrics = () => {
  /**
   * STATE VARIABLES
   * Info is the data retured by the Musixmatch API when given the (first, if multiple) artist's name
   */
  const [lyrics, setLyrics] = useState(null);
  const [status, setStatus] = useState(null);

  const { song } = useContext(SongContext);

  // The useEffect hook will run whenever the song changes
  useEffect(() => {
    // Clear the previous state variables
    setLyrics(null);
    setStatus(null);

    const fetchData = async () => {
      const songLyricsResponse = await getLyrics(
        song.songName,
        song.artists,
        song.albumName
      );
      // console.log(songLyricsResponse);
      const statusCode = songLyricsResponse.data.message?.header?.status_code;
      setStatus(statusCode);

      console.log("Lyrics status code: " + statusCode);

      if (statusCode == 200) {
        const songLyrics = songLyricsResponse.data.message?.body?.lyrics;
        // console.log(songLyrics);
        setLyrics(formatLyrics(songLyrics));
      } else {
        setLyrics(null);
      }
    };

    // If a song exists, fetch the corresponding data
    if (song) catchErrors(fetchData());
    else setLyrics(null);
  }, [song]);

  const formatLyrics = (lyricsData) => {
    console.log("Lyrics: " + lyricsData.lyrics_body);

    // The Musixmatch API has an annoying grammatical problem so we'll change that part of its returned data
    const lyricsBody = lyricsData.lyrics_body.replace(
      "This Lyrics is",
      "These lyrics are"
    );
    const lyricsCopyright = lyricsData.lyrics_copyright.replace(
      "This Lyrics is",
      "These lyrics are"
    );

    // The API documentation (https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get) says a tracking script must be placed on the page where the lyrics are displayed
    const scriptTrackingURL = lyricsData.script_tracking_url;

    // Return a simple object with lyrics and copyright information as well as the tracking URL
    return {
      body: lyricsBody,
      copyright: lyricsCopyright,
      trackingURL: scriptTrackingURL
    };
  };

  return (
    <>
      {(lyrics && (
        <div className="flex flex-col gap-2">
          <div className="text-base whitespace-pre-line">
            {lyrics.body}
            <script type="text/javascript" src={lyrics.trackingURL}></script>
          </div>
          <div className="text-xs italic">{lyrics.copyright}</div>
        </div>
      )) ||
        (status && (
          <p>
            Unable to get lyrics from Musixmatch (response status code {status})
          </p>
        )) ||
        (song && <p>Loading data for {song.songName}...</p>)}
    </>
  );
};

export default Lyrics;
