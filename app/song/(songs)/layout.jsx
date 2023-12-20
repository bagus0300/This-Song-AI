"use client";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import clsx from "clsx";
import SidebarTabs from "@/components/ui/sidebar-tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { useState } from "react";
import Recent from "@/components/recent";
import ConditionalModal from "@/components/ConditionalModal";

// export const metadata = {
//   title: "Song Information",
//   description:
//     "AI-enhanced analysis of lyrics for the song currently playing on Spotify."
// };

export default function SongLayout({ children }) {
  const [activeItem, setActiveItem] = useState("Search");
  const [modalOpen, setModalOpen] = useState(false);
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
        id="sidebar"
        className="fixed left-0 lg:w-72 w-full lg:h-[calc(100dvh-80px)] lg:m-2 lg:rounded-lg bg-card"
      >
        <div
          className={clsx(
            "h-full justify-between p-1"
            // showMenu ? "flex" : "hidden"
          )}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="hidden lg:block">
              {activeItem === "Search" && <Search />}
              {activeItem === "Recently Played" && <Recent />}
              {activeItem === "Top Songs (user)" && <p>Top Songs (user)</p>}
              {activeItem === "Top Songs (global)" && <p>Top Songs (global)</p>}
            </div>
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="lg:w-[280px] w-[100dvw]">
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
            <div className="flex lg:hidden">
              {/* {activeItem === "Search" && <Search />}
              {activeItem === "Recently Played" && <Recent />}
              {activeItem === "Top Songs (user)" && <p>Top Songs (user)</p>}
              {activeItem === "Top Songs (global)" && <p>Top Songs (global)</p>} */}
              {/* {items.map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveItem(item);
                    setModalOpen(true);
                  }}
                >
                  {item}
                </Button>
              ))} */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Search
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Recently Played
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Top Songs
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      // setActiveItem(item);
                    }}
                  >
                    User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      // setActiveItem(item);
                    }}
                  >
                    Global
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Top Songs
              </Button> */}
            </div>
          </div>
          {/* <SidebarTabs /> */}
          {/* <Link href={`${BACKEND_URI}/login`}> */}
          {/* <UserProfile /> */}
          {/* </Link> */}
        </div>
      </div>
      <div id="content" className="px-2 mt-12 lg:mt-0 lg:ml-72">
        {children}
      </div>
    </>
  );
}
