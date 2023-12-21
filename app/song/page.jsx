import { redirect } from "next/navigation";
import React from "react";

const Song = () => {
  redirect("/song/current");
};

export default Song;
