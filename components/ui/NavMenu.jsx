"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Banner from "./Banner";
import { ModeToggle } from "./toggle-mode";
import LoginButton from "./login-button";
import { MenuToggle } from "./toggle-menu";
import { useState } from "react";
import clsx from "clsx";
import { rajdhani } from "@/components/ui/fonts";

const ACTIVE_ROUTE = "py-1 px-2 rounded-md text-green-500";
const INACTIVE_ROUTE = "py-1 px-2 rounded-md bg-transparent text-foreground";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <LoginButton onClick={signIn} />
      {/* <button onClick={() => signIn()}>Sign in</button> */}
    </>
  );
};

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  console.log("Rendering NavMenu.jsx");

  const menuLinks = (mobile = null) => (
    <ul className={mobile ? "flex flex-col items-center text-3xl" : "flex"}>
      {[
        { title: "Song", path: "/song" },
        { title: "Protected", path: "/song/protected" },
        { title: "Current", path: "/song/current" },
        { title: "ID", path: "/song/id" }
      ].map(({ title, path }) => (
        <Link key={path} href={path} onClick={() => setShowMenu(false)}>
          <li className={pathname === path ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            {title}
          </li>
        </Link>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="z-20 flex items-center justify-between p-4 lg:rounded-lg bg-card h-14">
        <Banner />
        <div className={"flex items-center gap-2 font-semibold tracking-wider"}>
          <span
            className={clsx("hidden lg:flex-row lg:flex ", rajdhani.className)}
          >
            {menuLinks()}
          </span>
          <AuthButton />
          <span className="hidden lg:inline">
            <ModeToggle />
          </span>
          <span className="inline lg:hidden">
            <MenuToggle
              showMenu={showMenu}
              clickFunction={() => setShowMenu((prev) => !prev)}
            />
          </span>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={clsx(
          "lg:hidden h-[calc(100dvh-56px)] origin-top absolute w-full grow transition-all duration-300 ease-out bg-card -z-10",
          // If the menu is open, set its height to the dynamic viewport height minus the header height.
          showMenu ? "h-[calc(100dvh-56px)]" : "-mt-[100vh]"
        )}
      >
        <div
          className={clsx(
            "h-full lg:flex flex-col justify-between items-center p-1 flex font-semibold",
            rajdhani.className
            // showMenu ? "flex" : "hidden"
          )}
        >
          {menuLinks(true)}
          <ModeToggle text="Toggle theme" />
        </div>
      </div>
    </div>
  );
}
