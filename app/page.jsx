import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import Footer from "@/components/ui/Footer";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 text-base text-center align-bottom xl:px-0">
        <div className="flex flex-col items-center justify-center w-full gap-5 pb-10 text-base text-center align-bottom xl:px-0 bg-secondary">
          {/* <video width="540" height="360" autoPlay loop>
            <source src="videos/this-song.mp4" type="video/mp4" /> */}
          <img src="images/this-song.png" alt="This Song" />
          {/* </video> */}
          <h1 className={clsx(rajdhani.className, `text-2xl`, "px-10")}>
            Discover the meaning behind your favorite songs!
          </h1>
          <a
            href="song/current"
            className="inline-block px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110"
          >
            Click here to search for a song!
          </a>
        </div>
        <div className="w-full">
          <h2
            className={clsx(
              rajdhani.className,
              "px-2 mt-2 text-lg text-center md:mt-10"
            )}
          >
            These are the songs everybody&apos;s talking about. Check out what
            they mean:
          </h2>
          <p className={clsx(rajdhani.className, "text-base mt-5")}>
            (Select a song to learn more)
          </p>
          <div className="max-w-[1680px] mx-auto py-8">
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
