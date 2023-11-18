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
import { Music4 } from "lucide-react";

const BACKEND_URI = "http://192.168.4.158:8000";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken } = useContext(TokenContext);

  // useEffect(() => {
  //   setToken("Token!");
  // }, []);

  return (
    <div className="z-20 flex flex-col">
      <div className="z-20 flex items-center justify-between p-4 transition-none lg:mb-2 lg:rounded-lg bg-card h-14">
        <Link href="/">
          <div className="font-extrabold text-foreground hover:text-[#1fdf64]">
            <span className="inline-flex gap-2 align-middle">
              <Music4 />
              This Song
            </span>
          </div>
        </Link>
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
            "lg:static lg:h-[calc(100dvh-80px)] h-[calc(100dvh-56px)] lg:translate-y-0 origin-top absolute w-full lg:rounded-lg grow lg:block transition-all duration-300 ease-out bg-card lg:duration-0 lg:opacity-100",
            // If the menu is open, set its height to the dynamic viewport height minus the header height.
            // showMenu ? "h-[calc(100dvh-56px)] scale-y-100" : "scale-y-0"
            showMenu
              ? "h-[calc(100dvh-56px)] translate-y-0 opacity-100"
              : "-translate-y-[100%] opacity-0"
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
            <UserProfile />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
