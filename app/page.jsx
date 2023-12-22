import TopSongsSnippets from "@/components/TopSongsSnippets";
import Link from "next/link";

const Page = () => {
  return (
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
        <TopSongsSnippets />
      </div>
    </div>
  );
};

export default Page;
