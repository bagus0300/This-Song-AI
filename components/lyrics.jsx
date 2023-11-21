"use client";
import { SongContext } from "@/context/ContextProvider";
// import { getLyrics } from "@/lib/musicmatch";
// import { getLyrics } from "@/lib/lyrics";
import { getLyrics } from "@/lib/genius";
import { catchErrors } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import musixmatchLogo from "@/public/images/musixmatch_logo.svg";
import clsx from "clsx";
import { Bars } from "react-loader-spinner";

const Lyrics = ({ songName, artistName, albumName }) => {
  /**
   * STATE VARIABLES
   * Info is the data retured by the Musixmatch API when given the (first, if multiple) artist's name
   */
  const [lyrics, setLyrics] = useState(null);
  const [status, setStatus] = useState(null);

  const [showGPT, setShowGPT] = useState(false);

  const [GPTInterpretation, setGPTInterpretation] = useState(null);

  const GPT_ENDPOINT =
    process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
      ? "http://192.168.4.158:8000/gpt"
      : "https://spotify-node1313-f6ce692711e7.herokuapp.com/gpt";

  // const { song } = useContext(SongContext);

  // The useEffect hook will run whenever the song changes
  useEffect(() => {
    // Clear the previous state variables
    setLyrics(null);
    setStatus(null);

    setGPTInterpretation(null);

    const fetchData = async () => {
      const songLyricsResponse = await getLyrics(
        songName,
        artistName,
        albumName
      );
      console.log(songLyricsResponse);
      const statusCode =
        songLyricsResponse.data.message?.header?.status_code ||
        songLyricsResponse.status;
      setStatus(statusCode);

      console.log("Lyrics status code: " + statusCode);

      if (statusCode == 200) {
        const songLyrics =
          songLyricsResponse.data.message?.body?.lyrics ||
          songLyricsResponse.data;
        // console.log(songLyrics);
        // setLyrics(formatLyrics(songLyrics));
        setLyrics(testLyrics(songLyrics));
      } else {
        setLyrics(null);
      }
    };

    // If a song exists, fetch the corresponding data
    if (songName) catchErrors(fetchData());
    else setLyrics(null);
  }, [songName, artistName, albumName]);

  const testLyrics = (lyricsData) => {
    return {
      body: lyricsData,
      copyright: "",
      trackingURL: ""
    };
  };

  useEffect(() => {
    const fetchGPTResponse = async () => {
      if (!lyrics) return;
      console.log(`Asking GPT about ${songName} by ${artistName}...`);
      console.log("Lyrics: ", lyrics);

      const response = await fetch(GPT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          trackName: songName,
          artistName: artistName,
          lyrics: lyrics.body.replace(/\n/g, " ")
        })
      });

      console.log("Response body: ", response.body);

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        console.log("Received: ", value);
        setGPTInterpretation((prev) => (prev ? prev : "") + value);
      }

      // const response = await axios({
      //   method: "POST",
      //   url: URL,
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   params: parameters
      // });

      // return response;
    };

    fetchGPTResponse();
  }, [lyrics]);

  const formatLyrics = (lyricsData) => {
    // console.log("Lyrics: " + lyricsData.lyrics_body);

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
    <div className="px-4 md:p-2">
      {(lyrics && (
        <div className="flex flex-col-reverse items-start justify-center gap-10 align-top lg:flex-row">
          <div
            className={clsx(
              "h-full flex flex-col lg:w-fit w-full gap-2 items-center text-center min-w-[350px]"
            )}
          >
            <div className="text-base whitespace-pre-line">
              {lyrics.body}
              {/* {GPTInterpretation} */}
              <script
                type="text/javascript"
                src={lyrics.trackingURL}
                defer
              ></script>
            </div>
            <div className="text-xs italic">{lyrics.copyright}</div>
            <a
              href="https://www.musixmatch.com/"
              target="_blank"
              className="w-[calc(384px/3)]"
            >
              <Image src={musixmatchLogo} alt="Musicxmatch logo" />
            </a>
          </div>
          <div
            className={clsx(
              "h-full transition-all duration-1000 whitespace-break-spaces",
              GPTInterpretation ? "lg:w-[500px] xl:w-[700px]" : "w-[500px]"
            )}
          >
            <section className="pb-10 text-base lg:pb-0">
              {/* <h2 className="items-center p-2 text-lg text-center">
                Interpretation of lyrics:
              </h2> */}
              <div className="items-center text-left">
                {GPTInterpretation ? (
                  GPTInterpretation
                ) : (
                  <div className="items-center justify-center text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Bars
                        height="70"
                        width="70"
                        color="#1fdf64"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                      <p>Generating interpretation...</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      )) ||
        (status && (
          <p>
            {/* Unable to get lyrics from Musixmatch (response status code {status}) */}
            No lyrics found.
          </p>
        )) ||
        (songName && (
          <div className="flex flex-col items-center text-center">
            <Bars
              height="140"
              width="140"
              color="#1fdf64"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p>Loading data for {songName}...</p>
          </div>
        ))}
    </div>
  );
};

export default Lyrics;
