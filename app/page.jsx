import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";

import Footer from "@/components/ui/Footer";
import Playlist from "@/components/Playlist";
import Search from "@/components/search";
import MainSearch from "@/components/main-search";
import MainPage from "@/components/ui/main-page";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-2 text-base text-center align-bottom md:gap-5 md:pb-5 xl:px-0">
        <MainPage />
      </div>
      <Footer />
    </>
  );
};

export default Page;
