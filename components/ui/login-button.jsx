import React from "react";

const LoginButton = () => {
  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <button className="flex items-center align-middle gap-1 px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110">
        <img src="/images/Spotify_Icon_RGB_White.png" className="w-8 h-8" />
        Log in with Spotify
      </button>
    </div>
  );
};

export default LoginButton;
