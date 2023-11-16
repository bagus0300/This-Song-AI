"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { MenuToggle } from "@/components/ui/toggle-menu";
import clsx from "clsx";
import Search from "@/components/search";
import SidebarTabs from "./sidebar-tabs";
import LoginButton from "./login-button";
import UserProfile from "../user-profile";
import { TokenContext } from "@/context/ContextProvider";

const BACKEND_URI = "http://192.168.4.158:8000";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken } = useContext(TokenContext);

  // useEffect(() => {
  //   setToken("Token!");
  // }, []);

  return (
    <div className="z-20 flex flex-col">
      <div className="flex items-center justify-between p-4 transition-none lg:mb-2 lg:rounded-lg bg-zinc-500 h-14">
        <Link href="/">
          <div className="text-white">This Song</div>
        </Link>
        <section id="toggle-buttons" className="flex gap-2">
          <ModeToggle />
          <MenuToggle
            showMenu={showMenu}
            clickFunction={() => setShowMenu((prev) => !prev)}
          />
        </section>
      </div>
      <div className="relative flex flex-row space-x-2 grow lg:flex-col lg:space-x-0 lg:space-y-2">
        <div
          className={clsx(
            "lg:static lg:h-[calc(100dvh-80px)] h-[calc(100dvh-56px)] scale-y-0 lg:scale-y-100 origin-top absolute w-full lg:rounded-lg grow lg:block transition-all duration-200 bg-zinc-500 lg:duration-0",
            // If the menu is open, set its height to the dynamic viewport height minus the header height.
            showMenu ? "h-[calc(100dvh-56px)] scale-y-100" : "scale-y-0"
          )}
        >
          <div
            className={clsx(
              "h-full lg:flex flex-col justify-between p-1",
              showMenu ? "flex" : "hidden"
            )}
          >
            <SidebarTabs setShowMenu={setShowMenu} />
            {/* <Link href={`${BACKEND_URI}/login`}> */}
            <UserProfile />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
