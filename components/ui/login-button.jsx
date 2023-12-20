import React from "react";

const LoginButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <button
        onClick={onClick}
        className="flex items-center align-middle gap-1 px-2 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110 text-sm"
      >
        <img src="/images/Spotify_Icon_RGB_White.png" className="w-5 h-5" />
        Log in with Spotify
      </button>
    </div>
  );
};

export default LoginButton;
