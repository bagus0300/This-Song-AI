import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 p-10 text-base text-center align-bottom xl:px-0 max-w-[1680px] mx-auto">
        <img src="/this_song.svg" alt="This Song logo" width={200} />
        <h1 className={clsx(rajdhani.className, `text-2xl`)}>
          Discover the meaning behind your favorite songs through AI-enhanced
          lyric analysis!
        </h1>
        <a
          href="song"
          className="inline-block px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110"
        >
          Click here to search for a song!
        </a>
        <div>
          <h2
            className={clsx(
              rajdhani.className,
              "px-2 mt-2 text-lg text-center md:mt-10"
            )}
          >
            Or check out what GPT-4 has to say about the songs everybody&apos;s
            talking about:
          </h2>
          <p className={clsx(rajdhani.className, "text-base")}>
            (Select a song to learn more)
          </p>
          <Suspense fallback={<TopSongsSnippetsSkeleton />}>
            <TopSongsSnippets />
          </Suspense>
        </div>
      </div>
      <footer className={clsx(rajdhani.className, "bg-secondary")}>
        <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 pt-8 mb-10 text-center sm:text-end sm:grid-cols-2 lg:grid-cols-2">
            <div></div>
            <div>
              <p className="text-lg font-semibold tracking-widest text-gray-900">
                This Song
              </p>

              <ul className="text-base">
                <li>
                  <a
                    href="mailto:admin@thissong.app"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {/* About */}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-end">
            <p className="text-sm text-muted">
              All songs, lyrics, and images are property of their respective
              owners.
            </p>
            <p className="text-sm text-muted">
              &copy; 2023. This Song. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
