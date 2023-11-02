"use client";
import React, { useState } from "react";
import { ModeToggle } from "./ui/toggle-mode";
import Link from "next/link";
import { MenuToggle } from "./ui/toggle-menu";
import clsx from "clsx";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative flex flex-col md:p-2">
      <div className="flex items-center justify-between p-4 transition-none md:mb-2 md:rounded-md bg-zinc-500 h-14">
        <Link href="/">
          <div className="text-white">This Song</div>
        </Link>
        <section id="toggle-buttons" className="flex gap-2">
          <ModeToggle />
          <MenuToggle clickFunction={() => setShowMenu((prev) => !prev)} />
        </section>
      </div>
      <div className="relative flex flex-row space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
        <div
          className={clsx(
            "md:static md:h-[calc(100dvh-80px)] absolute w-full md:rounded-md grow md:block transition-all duration-200 bg-zinc-500",
            // If the menu is open, set its height to the dynamic viewport height minus the header height.
            showMenu ? "h-[calc(100dvh-56px)]" : "h-0"
          )}
        >
          <div
            className={clsx(
              "h-full md:flex flex-col justify-between",
              showMenu ? "flex" : "hidden"
            )}
          >
            {/* <NavLinks /> */}
            <p>Item</p>
            <p>Item</p>
          </div>
        </div>
        {/* <form>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Sidebar;
