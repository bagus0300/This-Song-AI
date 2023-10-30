import React from "react";
import { ModeToggle } from "./ui/toggle-mode";

const Header = () => {
  return (
    <>
      <main>
        {/* Navbar */}
        <nav>
          <section className="flex flex-row items-center gap-8 p-2">
            <h1>Navbar</h1>
            <span>Nav element</span>
            <ModeToggle />
          </section>
        </nav>
      </main>
    </>
  );
};

export default Header;
