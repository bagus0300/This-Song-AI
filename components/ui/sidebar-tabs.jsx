"use client";
import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Search from "../search";
import Recent from "../recent";
import { TokenContext } from "@/context/ContextProvider";

const SidebarTabs = ({ setShowMenu }) => {
  const { token } = useContext(TokenContext);

  return (
    <div>
      <Tabs defaultValue="search">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="recent" disabled={!token}>
            Recently Played
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Search setShowMenu={setShowMenu} />
        </TabsContent>
        <TabsContent
          value="recent"
          className="md:h-[calc(100dvh-56px-40px-48px-16px-32px)] h-[calc(100dvh-40px-56px-48px-16px)] overflow-y-scroll"
        >
          <Recent setShowMenu={setShowMenu} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SidebarTabs;
