import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import Footer from "@/components/ui/Footer";

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
            // backgroundAttachment: "fixed"
          }}
        >
          {/* <video width="540" height="360" autoPlay loop>
            <source src="videos/this-song.mp4" type="video/mp4" /> */}
          {/* <img src="images/this-song-large.png" alt="This Song" /> */}
          {/* <img src="images/this-song-logo.png" alt="This Song" /> */}
          <img src="images/this-song-logo-white.png" alt="This Song" />
          {/* </video> */}
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
              href="song/current"
              className="inline-block font-bold text-lg md:text-xl px-6 py-2 text-white bg-[#1DB954] rounded-full hover:brightness-110"
            >
              Click here to search for a song!
            </a>
          </div>
          <img
            src="images/border-bottom.png"
            className="w-full md:min-w-[1400px] h-[70px] pointer-events-none"
            // className="w-full h-[70px]"
          />
        </div>
        <div className="w-full">
          {/* <h2 className={clsx(rajdhani.className, "px-2 text-lg text-center")}>
            These are the songs everybody&apos;s talking about. Check out what
            they mean:
          </h2> */}
          <h2 className={clsx(rajdhani.className, "px-2 text-lg text-center")}>
            Or start by exploring the world of rock classics:
          </h2>
          <p className={clsx(rajdhani.className, "text-base md:mt-5 mt-2")}>
            (Select a song to learn more)
          </p>
          <div className="max-w-[1680px] mx-auto pb-8 md:pt-5 pt-2">
            <Suspense fallback={<TopSongsSnippetsSkeleton />}>
              <TopSongsSnippets limit="20" offset="0" />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
