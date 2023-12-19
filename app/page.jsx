import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 text-base text-center align-bottom">
      <img src="/this_song.svg" alt="This Song logo" width={200} />
      <p>
        Discover the meaning behind your favorite songs through AI-enhanced
        lyric analysis!
      </p>
      <a
        href="song"
        className="inline-block px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110"
      >
        Click here to begin!
      </a>
    </div>
  );
};

export default Page;
