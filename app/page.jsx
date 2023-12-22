import TopSongsSnippets from "@/components/TopSongsSnippets";
import TopSongsSnippetsSkeleton from "@/components/TopSongsSnippetsSkeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 p-10 text-base text-center align-bottom">
        <img src="/this_song.svg" alt="This Song logo" width={200} />
        <h1 className="text-xl">
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
          <h2 className="px-2 mt-2 text-lg text-center md:mt-10">
            Or check out what AI has to say about the songs everybody&apos;s
            talking about:
          </h2>
          <p className="text-sm">(Select a song to learn more)</p>
          <Suspense fallback={<TopSongsSnippetsSkeleton />}>
            <TopSongsSnippets />
          </Suspense>
        </div>
      </div>
      <footer class="bg-secondary">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="text-center sm:text-end grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-2 lg:pt-16 mb-10">
            <div></div>

            <div>
              <p class="font-medium text-gray-900">This Song</p>

              <ul class="text-sm">
                <li>
                  <a
                    href="mailto:atopala7@gmail.com"
                    class="text-gray-700 transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a href="#" class="text-gray-700 transition hover:opacity-75">
                    {/* About */}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-end">
            <p class="text-xs text-muted">
              All songs, lyrics, and images are property of their respective
              owners.
            </p>
            <p class="text-xs text-muted">
              &copy; 2023. This Song. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
