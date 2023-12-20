"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { MenuToggle } from "@/components/ui/toggle-menu";
import clsx from "clsx";
import SidebarTabs from "./sidebar-tabs";
import UserProfile from "../user-profile";
import { MenuContext, TokenContext } from "@/context/ContextProvider";
import { Music4 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const BACKEND_URI = "http://192.168.4.158:8000";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { menu, setMenu } = useContext(MenuContext);

  const { token, setToken } = useContext(TokenContext);

  // useEffect(() => {
  //   setToken("Token!");
  // }, []);

  useEffect(() => {
    if (menu) {
      setShowMenu(true);
      setMenu(false);
    }
  }, [menu, setMenu]);

  return (
    <div className="z-20 flex flex-col">
      <div className="z-20 flex items-center justify-between p-4 transition-none lg:mb-2 lg:rounded-lg bg-card h-14">
        <div className="font-extrabold text-foreground">
          <Link href="/">
            <span className="inline-flex gap-2 align-middle hover:text-[#1fdf64]">
              <Music4 />
              This Song
            </span>
          </Link>
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

        <section id="toggle-buttons" className="flex gap-2">
          <ModeToggle />
          <MenuToggle
            showMenu={showMenu}
            clickFunction={() => setShowMenu((prev) => !prev)}
          />
        </section>
      </div>
      <div className="relative z-10 flex flex-row space-x-2 grow lg:flex-col lg:space-x-0 lg:space-y-2">
        <div
          className={clsx(
            "lg:static lg:h-[calc(100dvh-80px)] h-[calc(100dvh-56px)] lg:mt-0 origin-top absolute w-full lg:rounded-lg grow lg:block transition-all duration-300 ease-out bg-card lg:duration-0 lg:opacity-100",
            // If the menu is open, set its height to the dynamic viewport height minus the header height.
            // showMenu ? "h-[calc(100dvh-56px)] scale-y-100" : "scale-y-0"
            showMenu ? "h-[calc(100dvh-56px)] mt-0" : "-mt-[100vh]"
          )}
        >
          <div
            className={clsx(
              "h-full lg:flex flex-col justify-between p-1 flex"
              // showMenu ? "flex" : "hidden"
            )}
          >
            <SidebarTabs setShowMenu={setShowMenu} />
            {/* <Link href={`${BACKEND_URI}/login`}> */}
            {/* <UserProfile /> */}
            <AuthButton />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
