import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Search from "../search";
import Recent from "../recent";
import { TokenContext } from "@/context/ContextProvider";

const SidebarTabs = () => {
  const { token } = useContext(TokenContext);

  console.log("SidebarTabs token", token);

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
          <Search />
        </TabsContent>
        <TabsContent value="recent">
          <Recent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SidebarTabs;
