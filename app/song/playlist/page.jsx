"use client";
import Playlist from "@/components/Playlist";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import React, { Suspense, useState } from "react";

import { playlistIDs } from "@/lib/data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(
    "37i9dQZF1DWXRqgorJj26U"
  );

  const [playlists, setPlaylists] = useState(null);
  const [ready, setReady] = useState(false);

  const handlePlaylistChange = (event) => {
    setSelectedPlaylist(event.target.value);
  };

  const changePlaylist = (playlistID) => {
    console.log("changePlaylist", playlistID);
    setSelectedPlaylist(playlistID);
  };

  useState(() => {
    const getPlaylists = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URI}/client_token`);

        const token = data.access_token;

        axios.defaults.baseURL = "https://api.spotify.com/v1";
        axios.defaults.headers["Content-Type"] = "application/json";

        const playlistsList = [];

        for (let playlistID of playlistIDs) {
          const playlistResponse = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              cache: "no-store"
            }
          );
          // console.log("playlistResponse", playlistResponse);

          const newPlaylist = {
            id: playlistID,
            name: playlistResponse.data.name,
            imageURL: playlistResponse.data.images[0].url,
            description: playlistResponse.data.description,
            externalURL: playlistResponse.data.external_urls.spotify
          };

          console.log("newPlaylist", newPlaylist);

          playlistsList.push(newPlaylist);
        }

        setPlaylists(playlistsList);
      } catch (e) {
        console.log(e);
      }
    };
    console.log("Rendering OverviewPage.jsx");
    getPlaylists();
    setReady(true);
  }, []);

  return (
    (ready && playlists && (
      <>
        <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2 flex flex-col items-center">
          <Carousel
            opts={{
              align: "start"
            }}
            className="w-[70vw] max-w-3xl md:mx-auto"
          >
            <CarouselContent>
              {playlists.map((playlist, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-1">
                    <Card className="bg-card hover:brightness-125">
                      <CardContent
                        className="relative p-0 overflow-hidden text-center rounded-lg cursor-pointer aspect-square group"
                        onClick={() => changePlaylist(playlist.id)}
                        // style={{
                        //   backgroundImage: `url(${playlist.imageURL})`,
                        //   backgroundSize: "cover",
                        //   backgroundPosition: "center"
                        // }}
                      >
                        <img
                          src={playlist.imageURL}
                          alt={playlist.name}
                          className="block"
                        />
                        <span
                          className="absolute bottom-0 left-0 w-full pb-2 text-lg text-center transition-all duration-300 opacity-0 text-[#1fdf64] group-hover:opacity-100"
                          style={{
                            textShadow:
                              "2px 2px 2px rgba(0, 0, 0, 1), 0px 0px 2px rgba(0, 0, 0, 1)"
                          }}
                        >
                          {playlist.name}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* <Suspense fallback={<TopSongsSnippetsSkeleton />}> */}
          <div className="flex flex-col items-center justify-center w-full gap-2 mt-5 text-base text-center align-bottom md:gap-5 xl:px-0">
            <Playlist playlist={selectedPlaylist} limit="20" offset="0" />
          </div>
          {/* </Suspense> */}
        </div>
      </>
    )) || (
      <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2 flex flex-col items-center">
        <Carousel
          opts={{
            align: "start"
          }}
          className="w-[70vw] max-w-xl md:mx-auto"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <Card className="bg-card hover:brightness-125">
                    <CardContent className="flex items-center justify-center p-0 overflow-hidden text-center rounded-lg cursor-pointer aspect-square">
                      <span className="text-lg font-semibold">
                        Loading playlist...
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* <Suspense fallback={<TopSongsSnippetsSkeleton />}> */}
        {/* <Playlist playlist={selectedPlaylist} limit="20" offset="0" /> */}
        {/* </Suspense> */}
      </div>
    )
  );
};

export default PlaylistPage;
