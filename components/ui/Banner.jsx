import { Music4 } from "lucide-react";

const Banner = () => {
  return (
    <div className="font-extrabold text-foreground w-fit">
      <a href="/">
        <span className="inline-flex gap-2 align-middle hover:text-[#1fdf64]">
          <Music4 />
          This Song
        </span>
      </a>
      <a href="https://spotify.com" target="_blank">
        <p className="flex items-center justify-center gap-1 align-middle group">
          <span className="text-xs text-gray-400 group-hover:text-[#1fdf64]">
            Powered by
          </span>
          <img
            src="/images/Spotify_Logo_RGB_Green.png"
            className="h-5 group-hover:brightness-125"
          />
        </p>
      </a>
    </div>
  );
};

export default Banner;
