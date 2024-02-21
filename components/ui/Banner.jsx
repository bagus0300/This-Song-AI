import { Music4 } from "lucide-react";
import { rajdhani } from "@/components/ui/fonts";

const Banner = () => {
  return (
    <div className="font-extrabold text-foreground w-fit">
      <a href="/">
        <span className="inline-flex gap-2 align-middle text-lg hover:text-[#1fdf64] tracking-wide">
          <Music4 />
          <span className={rajdhani.className}>This Song</span>
        </span>
      </a>
      <a href="https://spotify.com" target="_blank">
        <p className="flex items-center justify-center gap-1 align-middle group">
          <span className="text-xs text-gray-400 group-hover:text-[#1fdf64]">
            Powered by
          </span>
          <img
            src="/images/Spotify_Logo_RGB_Green.png"
            className="w-[70px] group-hover:brightness-125"
          />
        </p>
      </a>
    </div>
  );
};

export default Banner;
