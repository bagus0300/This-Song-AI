"use client";
import { SongContext } from "@/context/ContextProvider";
import { getLyrics } from "@/lib/lyrics";
import { catchErrors } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Bars, ThreeCircles } from "react-loader-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { rajdhani } from "./ui/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import emailjs from "@emailjs/browser";
import { TypeAnimation } from "react-type-animation";

import { BACKEND_URL } from "@/lib/backendURL";

const Lyrics = ({ songID, songName, artistName, albumName }) => {
  const emailjsPublicKey = "BRpCzUI0MwvVUI2Vs";
  const emailjsTemplateID = "template_p5nstyt";
  const emailjsServiceID = "service_6a9uc18";

  const formSchema = z.object({
    songID: z.string(),
    songName: z.string(),
    artistName: z.string(),
    albumName: z.string(),
    problem: z.enum(
      [
        "wrong",
        "grammar-or-spelling",
        "offensive",
        "different",
        "not-instrumental"
      ],
      {
        required_error: "Please select a problem."
      }
    ),
    name: z.string().optional(),
    email: z.string().optional()
  });

  function RadioGroupForm() {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        songID: songID,
        songName: songName,
        artistName: artistName,
        albumName: albumName,
        problem: undefined,
        name: "",
        email: ""
      }
    });

    function onSubmit(data) {
      console.log(data);
      setLoading(true);
      emailjs
        .send(
          emailjsServiceID,
          emailjsTemplateID,
          {
            from_name: data.name,
            to_name: "admin",
            reply_to: data.email,
            to_email: "admin@thissong.app",
            message: JSON.stringify(data, null, 2)
          },
          emailjsPublicKey
        )
        .then(
          () => {
            document.getElementById("problem").classList.add("hidden");
            document
              .getElementById("problemReported")
              .classList.remove("hidden");
            setLoading(false);
            if (window.innerWidth >= 1024) {
              window.scrollTo({
                top: -100,
                behavior: "smooth"
              });
            }
            setScrolled(false);
            toast({
              title: "Report sent successfully:",
              description: (
                <p className="mt-2 w-[340px] rounded-md p-4">
                  A report of &quot;
                  {data.problem}&quot; for the song {data.songName} (
                  {data.songID}) by {data.artistName} was sent successfully.
                  <br />
                  <br />
                  {(data.name && "Thank you, " + data.name + "! ") ||
                    "Thank you! "}
                  {(data.email &&
                    "We will notify you at " +
                      data.email +
                      " when the problem is fixed.") ||
                    ""}
                </p>
              )
            });
          },
          (error) => {
            setLoading(false);
            console.log(error);
          }
        );
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[360px] px-2 space-y-7"
        >
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="wrong" disabled={loading} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Interpretation is completely wrong
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="grammar-or-spelling"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Grammar or spelling errors
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="offensive" disabled={loading} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Description is offensive
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="different" disabled={loading} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Description seems to be about a different song
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="not-instrumental"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Description unavailable even though the song should have
                        lyrics
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription className="text-muted">
                  In case you want to be thanked for your help.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@address.com"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription className="text-muted">
                  If you wish to be notified when the problem is fixed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-24">
            {loading ? (
              <span className="w-5 h-5 border-b-2 rounded-full animate-spin border-text" />
            ) : (
              <>
                Submit
                {/* <FaPaperPlane className="text-xs transition-transform duration-500 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1" />{" "} */}
              </>
            )}
          </Button>
        </form>
      </Form>
    );
  }

  /**
   * STATE VARIABLES
   * lyrics: the lyrics of the song
   * status: the status code of the API response
   * GPTInterpretation the interpretation of the lyrics by GPT-3.5
   */
  const [lyrics, setLyrics] = useState(null);
  const [status, setStatus] = useState(null);
  const [GPTInterpretation, setGPTInterpretation] = useState(null);
  const [GPT3Interpretation, setGPT3Interpretation] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sendingError, setSendingError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const musixmatchLogo = "/images/musixmatch_logo.svg";

  // const GPT_ENDPOINT =
  //   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
  //     ? "http://192.168.4.158:8000/api/v1/gpt"
  //     : "https://spotify-node1313-f6ce692711e7.herokuapp.com/api/v1/gpt";

  const GPT_ENDPOINT = `${BACKEND_URL}/api/v1/gpt`;

  // const GPT_INTERPRETATION_ENDPOINT =
  //   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
  //     ? "http://192.168.4.158:8000/api/v1/gpt/interpretation"
  //     : "https://spotify-node1313-f6ce692711e7.herokuapp.com/api/v1/gpt/interpretation";

  const GPT_INTERPRETATION_ENDPOINT = `${BACKEND_URL}/api/v1/gpt/interpretation`;

  // The useEffect hook will run whenever the song changes and fetch the lyrics for that song
  useEffect(() => {
    // Clear the previous state variables
    setLyrics(null);
    setStatus(null);
    setGPTInterpretation(null);
    setGPT3Interpretation(null);

    const fetchData = async () => {
      const songLyricsResponse = await getLyrics(songName, artistName);
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

      const parameters = new URLSearchParams([
        ["trackName", songName],
        ["artistName", artistName]
      ]);

      // See if we can get a response from GPT-4
      try {
        const gpt4Response = await fetch(
          `${GPT_INTERPRETATION_ENDPOINT}?${parameters.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

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
        setGPT3Interpretation((prev) => (prev ? prev : "") + value);
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
    <div id="lyrics-container" className="px-4 md:p-2">
      {(lyrics && (
        <div className="flex flex-col-reverse items-start justify-center gap-10 align-top lg:flex-row">
          {lyrics.body == "No lyrics found" && (
            <p className="items-center justify-center text-center">
              Description unavailable.
            </p>
          )}
          <div
            className={clsx(
              "h-full whitespace-break-spaces w-full",
              GPTInterpretation || GPT3Interpretation
                ? "lg:w-[500px] xl:w-[700px]"
                : "lg:w-[200px]",
              lyrics.body == "No lyrics found" && "w-0 lg:w-0 xl:w-0"
            )}
          >
            <section className="pb-2 text-base">
              {/* <h2 className="items-center p-2 text-lg text-center">
                Interpretation of lyrics:
              </h2> */}
              <div className="items-center text-left">
                {GPTInterpretation ? (
                  <TypeAnimation
                    splitter={(str) => str.split(/(?= )/)}
                    sequence={[GPTInterpretation]}
                    speed={{ type: "keyStrokeDelayInMs", value: 10 }}
                    repeat={0}
                    cursor={false}
                  />
                ) : GPT3Interpretation ? (
                  GPT3Interpretation
                ) : (
                  lyrics &&
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
                        <p>Generating analysis...</p>
                      </div>
                    </div>
                  )
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
      {status && (
        <>
          <div className="flex flex-col items-end pt-10 pb-10">
            <Accordion
              id="problem"
              type="single"
              collapsible
              className="w-[360px] mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger
                  onClick={(e) => {
                    if (scrolled) {
                      if (window.innerWidth >= 1024) {
                        console.log(
                          e.target.offsetTop - (window.innerHeight - 100)
                        );
                        window.scrollTo({
                          top: e.target.offsetTop - (window.innerHeight - 100),
                          behavior: "smooth"
                        });
                      }
                      setScrolled(false);
                    } else {
                      window.scrollTo({
                        top: e.target.offsetTop,
                        left: 0,
                        behavior: "smooth"
                      });
                      setScrolled(true);
                    }
                  }}
                >
                  Report a problem with this description
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroupForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div
              id="problemReported"
              className="hidden w-[360px] mx-auto text-muted text-center"
            >
              Thank you for submitting a report!
            </div>
          </div>
          {/* <div
            className={clsx(
              "flex flex-col items-end w-full max-w-screen-xl pb-2 text-base text-center transition-all duration-500",
              document &&
                document.getElementById("lyrics-container") &&
                window &&
                document.getElementById("lyrics-container").offsetHeight + 500 >
                  window.innerHeight
                ? "opacity-100"
                : "opacity-0"
            )}
          > */}
          <div
            className={clsx(
              "flex flex-col items-end w-full max-w-screen-xl pb-2 text-base text-center transition-all duration-500",
              document &&
                window &&
                document.body.scrollHeight - 196 >= window.innerHeight
                ? "opacity-100"
                : "opacity-0"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={
                !(
                  document &&
                  window &&
                  document.body.scrollHeight - 196 >= window.innerHeight
                )
              }
            >
              {" "}
              Scroll to top
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Lyrics;
