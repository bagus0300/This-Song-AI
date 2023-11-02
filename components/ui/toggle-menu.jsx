"use client";

import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function MenuToggle({ clickFunction }) {
  const [toggle, setToggle] = useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden"
      onClick={() => {
        setToggle(!toggle);
        clickFunction();
      }}
    >
      <Menu
        className={clsx(
          "h-[1.2rem] w-[1.2rem] transition-all",
          toggle && "rotate-90 scale-0"
        )}
      />
      <X
        className={clsx(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          !toggle && "rotate-90 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
