"use client";
import React from "react";
import LoginButton from "./ui/login-button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Avatar = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "loading") {
    return <button>Loading...</button>;
  }

  if (status === "authenticated") {
    console.log(session);

    return (
      <div className="flex items-center justify-center text-center align-middle">
        <img
          src={session.user.image}
          width={36}
          height={36}
          className="rounded-full"
          alt="Next.js logo"
        />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      <a onClick={() => signIn("spotify")}>
        <LoginButton />
      </a>
    </>
  );

  return;
};

export default Avatar;
