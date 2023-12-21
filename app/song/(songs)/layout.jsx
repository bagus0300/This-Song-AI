"use client";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import clsx from "clsx";
import SidebarTabs from "@/components/ui/sidebar-tabs";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { useState } from "react";
import Recent from "@/components/recent";
import ConditionalModal from "@/components/ConditionalModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { rajdhani } from "@/components/ui/fonts";

// export const metadata = {
//   title: "Song Information",
//   description:
//     "AI-enhanced analysis of lyrics for the song currently playing on Spotify."
// };

export default function SongLayout({ children }) {
  const [activeItem, setActiveItem] = useState("Search");
  // const session = await getServerSession();

  const items = [
    "Search",
    "Recently Played",
    "Top Songs (user)",
    "Top Songs (global)"
  ];

  return (
    <>
      <div
        id="menu"
        className="fixed left-0 lg:w-72 w-full lg:h-[calc(100dvh-80px)] lg:m-2 lg:rounded-lg bg-card"
      >
        <div className={clsx("h-full justify-between p-1")}>
          <div className="flex flex-col justify-between h-full">
            {/* Sidebar on large screens */}
            <div className="hidden lg:block">
              {activeItem === "Search" && <Search />}
              {activeItem === "Recently Played" && <Recent />}
              {activeItem === "Top Songs (user)" && <p>Top Songs (user)</p>}
              {activeItem === "Top Songs (global)" && <p>Top Songs (global)</p>}
            </div>
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={clsx(
                      "w-full font-semibold text-lg",
                      rajdhani.className
                    )}
                  >
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={clsx(
                    "lg:w-[280px] w-[100dvw]",
                    rajdhani.className
                  )}
                >
                  {items.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onSelect={() => {
                        setActiveItem(item);
                      }}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Dropdown menu on small screens */}
            <div className={clsx("flex lg:hidden", rajdhani.className)}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-base font-semibold"
                  >
                    Search
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80dvh]">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Search />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-base font-semibold"
                  >
                    Recently Played
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80dvh]">
                  <DialogHeader>
                    <DialogTitle>Recently Played</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-base font-semibold"
                  >
                    Top Songs
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={clsx("w-full", rajdhani.className)}
                      >
                        User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80dvh]">
                      <DialogHeader>
                        <DialogTitle>Top Songs (user)</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={clsx("w-full", rajdhani.className)}
                      >
                        Global
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80dvh]">
                      <DialogHeader>
                        <DialogTitle>Top Songs (global)</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* <SidebarTabs /> */}
          {/* <Link href={`${BACKEND_URI}/login`}> */}
          {/* <UserProfile /> */}
          {/* </Link> */}
        </div>
      </div>
      {/* Content */}
      <div id="content" className={clsx("px-2 mt-12 lg:mt-0 lg:ml-72")}>
        {children}
      </div>
    </>
  );
}
