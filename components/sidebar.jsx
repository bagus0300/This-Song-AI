import React from "react";
import { ModeToggle } from "./ui/toggle-mode";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full px-3 py-4 md:px-2">
      <Link
        className="flex items-end justify-start h-20 p-4 mb-2 bg-blue-600 rounded-md md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">This Song</div>
      </Link>
      <div className="flex flex-row justify-between space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <div className="hidden w-full h-auto rounded-md grow bg-gray-50 md:block"></div>
        {/* <form>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Sidebar;
