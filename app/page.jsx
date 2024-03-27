import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import Footer from "@/components/ui/Footer";
import Playlist from "@/components/Playlist";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-base text-center align-bottom md:gap-5 xl:px-0">
        <div
          className="flex flex-col items-center justify-center w-full overflow-hidden text-base text-center align-bottom md:gap-5 md:bg-fixed"
          style={{
            backgroundImage: "url(/images/banner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "100% 100%"
          }}
        >
          <img
            src="images/this-song-logo-white.png"
            alt="This Song"
            width={720}
            height={576}
          />
          <div className="mt-[-100px] flex flex-col gap-5 items-center justify-center">
            <h1
              className={clsx(
                rajdhani.className,
                `md:text-3xl text-2xl`,
                "px-10 text-white"
              )}
              style={{ textShadow: "1px 1px 2px black" }}
            >
              Discover the meaning behind your favorite songs!
            </h1>
            <a
              href="songs"
              className="inline-block font-bold text-lg md:text-xl px-6 py-2 text-white bg-[#1DB954] rounded-full hover:brightness-110"
            >
              Click here to search for a song!
            </a>
          </div>
          <img
            src="images/border-bottom.png"
            className="w-full md:min-w-[1400px] h-[70px] pointer-events-none"
          />
        </div>
        <div className="w-full">
          <h2
            className={clsx(
              rajdhani.className,
              "px-2 text-xl font-bold text-center"
            )}
            id="top-content"
          >
            Trending Songs
          </h2>
          <p className={clsx(rajdhani.className, "text-base mt-1")}>
            (Select a song to learn more)
          </p>
          <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2">
            {/* <Suspense fallback={<TopSongsSnippetsSkeleton />}>
              <TopSongsSnippets limit="24" offset="0" />
            </Suspense> */}
            <Playlist playlist="37i9dQZF1DXcBWIGoYBM5M" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
