import Playlist from "@/components/Playlist";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import React from "react";

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

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

export const metadata = {
  title: "This Song | Playlist Information",
  description: "AI-enhanced analysis of lyrics for songs on Spotify."
};

const PlaylistPage = ({ params }) => {
  const { id } = params;

  return (
    <>
      <div className="max-w-[1680px] mx-auto pb-8 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full gap-2 mt-5 text-base text-center align-bottom md:gap-5 xl:px-0">
          <Playlist playlist={id} />
        </div>
        {/* </Suspense> */}
      </div>
    </>
  );
};

export default PlaylistPage;
