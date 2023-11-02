import React from "react";

const LoginButton = () => {
  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <button className="inline-block px-6 py-2 font-bold text-white bg-[#1DB954] rounded-full hover:brightness-110">
        Log in to Spotify
      </button>
    </div>
  );
};

export default LoginButton;
