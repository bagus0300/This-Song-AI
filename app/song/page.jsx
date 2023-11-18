"use client";
import React from "react";

const Page = () => {
  // return <div>Song Page</div>;
  if (window !== "undefined") window.location.href = "/song/current";
};

export default Page;
