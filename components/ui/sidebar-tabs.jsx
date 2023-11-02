import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Search from "../search";

const SidebarTabs = () => {
  return (
    <div>
      <Tabs defaultValue="search">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Search />
        </TabsContent>
        <TabsContent value="recent">Recently Played</TabsContent>
      </Tabs>
    </div>
  );
};

export default SidebarTabs;
