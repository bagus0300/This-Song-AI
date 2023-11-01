import React from "react";
import { ModeToggle } from "./ui/toggle-mode";
import Link from "next/link";
import { MenuToggle } from "./ui/toggle-menu";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full px-3 py-4 md:px-2">
      <div className="flex items-center justify-between p-4 mb-2 rounded-md bg-zinc-600 h-14">
        <Link href="/">
          <div className="text-white">This Song</div>
        </Link>
        <section id="toggle-buttons" className="flex gap-2">
          <ModeToggle />
          <MenuToggle />
        </section>
      </div>
      <div className="flex flex-row justify-between space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <div className="hidden w-full h-auto rounded-md grow bg-gray-50 md:block"></div>
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
