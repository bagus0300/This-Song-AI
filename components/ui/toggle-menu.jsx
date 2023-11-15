import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function MenuToggle({ showMenu, clickFunction }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:hidden"
      onClick={() => {
        clickFunction();
      }}
    >
      <Menu
        className={clsx(
          "h-[1.2rem] w-[1.2rem] transition-all duration-200",
          showMenu && "rotate-180 scale-0"
        )}
      />
      <X
        className={clsx(
          "absolute h-[1.2rem] w-[1.2rem] transition-all duration-200",
          !showMenu && "-rotate-180 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
