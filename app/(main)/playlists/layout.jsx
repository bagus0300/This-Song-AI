"use client";
import Playlist from "@/components/Playlist";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import React, { Suspense, useEffect, useState } from "react";

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
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import { rajdhani } from "@/components/ui/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const PlaylistPage = ({ children }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(
    "37i9dQZF1DWXRqgorJj26U"
  );

  const pathname = usePathname();

  const [playlists, setPlaylists] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const playlistResponse = await fetch("/api/playlists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("playlistResponse", playlistResponse);
        const playlistsList = await playlistResponse.json();

        console.log("playlistsList", playlistsList);

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
    ready &&
    playlists && (
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
                  className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-1">
                    <Card
                      className={clsx(
                        "bg-card hover:brightness-125",
                        pathname &&
                          pathname.split("/")[2] == playlist.id &&
                          "border-[#1fdf64]"
                      )}
                    >
                      <Link href={`/playlists/${playlist.id}`}>
                        <CardContent
                          className="relative p-0 overflow-hidden text-center rounded-md cursor-pointer aspect-square group"
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
                          {/* <span
                          className="absolute bottom-0 left-0 w-full pb-2 text-lg text-center transition-all duration-300 opacity-0 text-[#1fdf64] group-hover:opacity-100"
                          style={{
                            textShadow:
                              "2px 2px 2px rgba(0, 0, 0, 1), 0px 0px 2px rgba(0, 0, 0, 1)"
                          }}
                        >
                          {playlist.name}
                        </span> */}
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Suspense fallback={<TopSongsSnippetsSkeleton />}>
            <div className="flex flex-col items-center justify-center w-full mt-5 text-base text-center align-bottom xl:px-0">
              <h1
                className={clsx(
                  rajdhani.className,
                  "text-3xl font-semibold tracking-wider text-center text-foreground"
                )}
              >
                {playlists &&
                  pathname.split("/")[2] &&
                  playlists.find(
                    (playlist) => playlist.id == pathname.split("/")[2]
                  ).name}
              </h1>
              {children}
              {/* <Playlist playlist={selectedPlaylist} /> */}
            </div>
          </Suspense>
        </div>
      </>
    )
  );
};

export default PlaylistPage;
