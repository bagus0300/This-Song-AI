"use client";
import { SongContext } from "@/context/ContextProvider";
import { getLyrics } from "@/lib/lyrics";
import { catchErrors } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Bars, ThreeCircles } from "react-loader-spinner";

const Lyrics = ({ songID, songName, artistName, albumName }) => {
  /**
   * STATE VARIABLES
   * lyrics: the lyrics of the song
   * status: the status code of the API response
   * GPTInterpretation the interpretation of the lyrics by GPT-3.5
   */
  const [lyrics, setLyrics] = useState(null);
  const [status, setStatus] = useState(null);
  const [GPTInterpretation, setGPTInterpretation] = useState(null);

  const musixmatchLogo = "/images/musixmatch_logo.svg";

  const GPT_ENDPOINT =
    process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
      ? "http://192.168.4.158:8000/gpt"
      : "https://spotify-node1313-f6ce692711e7.herokuapp.com/gpt";

  const GPT_INTERPRETATION_ENDPOINT =
    process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
      ? "http://192.168.4.158:8000/interpretation"
      : "https://spotify-node1313-f6ce692711e7.herokuapp.com/interpretation";

  // The useEffect hook will run whenever the song changes and fetch the lyrics for that song
  useEffect(() => {
    // Clear the previous state variables
    setLyrics(null);
    setStatus(null);
    setGPTInterpretation(null);

    const fetchData = async () => {
      const songLyricsResponse = await getLyrics(
        songID,
        songName,
        artistName,
        albumName
      );
      // console.log(songLyricsResponse);
      const statusCode =
        songLyricsResponse.data.message?.header?.status_code ||
        songLyricsResponse.status;
      setStatus(statusCode);

      // console.log("Lyrics status code: " + statusCode);

      if (statusCode == 200) {
        const songLyrics =
          songLyricsResponse.data.message?.body?.lyrics ||
          songLyricsResponse.data;
        // console.log(songLyrics);
        // setLyrics(formatLyrics(songLyrics));
        setLyrics(createLyrics(songLyrics));
      } else {
        setLyrics(null);
      }
    };

    // If a song exists, fetch the corresponding data
    if (songName) catchErrors(fetchData());
    else setLyrics(null);
  }, [songName, artistName, albumName]);

  const createLyrics = (lyricsData) => {
    return {
      body: lyricsData
    };
  };

  // This hook will run whenever the lyrics change and fetch the interpretation of the lyrics
  useEffect(() => {
    const fetchGPTResponse = async () => {
      if (!lyrics || lyrics.body == "No lyrics found") return;
      console.log(`Asking GPT about ${songName} by ${artistName}...`);

      // See if we can get a response from GPT-4
      try {
        const gpt4Response = await fetch(GPT_INTERPRETATION_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            songID: songID,
            trackName: songName
          })
        });

        console.log("GPT-4 fetch response: ", gpt4Response);
        if (gpt4Response.ok) {
          const interpretation = await gpt4Response.text();
          if (interpretation) {
            console.log("GPT-4 interpretation response: ", interpretation);
            // console.log("Interpretation: ", interpretation);
            setGPTInterpretation(interpretation);
            return;
          }
        }
      } catch (error) {
        console.log("Error fetching GPT interpretation from database: ", error);
      }

      // If we can't get a response from GPT-4, ask GPT-3.5 and stream the response
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

      // console.log("Response body: ", response.body);

      // Create a ReadableStream to read the response body
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      // Read each chunk of the response body and append it to the GPTInterpretation state variable
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        // console.log("Received: ", value);
        setGPTInterpretation((prev) => (prev ? prev : "") + value);
      }
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
            </div>
            {/* <Image src={musixmatchLogo} alt="Musicxmatch logo" /> */}
            {/* <img src={musixmatchLogo} alt="Musicxmatch logo" width="200px" /> */}
          </div>
          <div
            className={clsx(
              "h-full transition-all duration-1000 whitespace-break-spaces w-full",
              GPTInterpretation ? "lg:w-[400px] xl:w-[600px]" : "lg:w-[200px]",
              lyrics.body == "No lyrics found" && "w-0 lg:w-0 xl:w-0"
            )}
          >
            <section className="pb-10 text-base lg:pb-0">
              {/* <h2 className="items-center p-2 text-lg text-center">
                Interpretation of lyrics:
              </h2> */}
              <div className="items-center text-left">
                {GPTInterpretation
                  ? GPTInterpretation
                  : lyrics &&
                    lyrics.body != "No lyrics found" && (
                      <div className="items-center justify-center text-center">
                        <div className="flex flex-col items-center justify-center text-center">
                          <ThreeCircles
                            height="100"
                            width="100"
                            color="#1fdf64"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="three-circles-rotating"
                            outerCircleColor=""
                            innerCircleColor=""
                            middleCircleColor=""
                          />
                          <p>Generating AI analysis...</p>
                        </div>
                      </div>
                    )}
              </div>
            </section>
          </div>
        </div>
      )) ||
        (status && <p>No lyrics found.</p>) ||
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
