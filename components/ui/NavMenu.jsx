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
import ProfileButton from "./ProfileButton";

const ACTIVE_ROUTE = "py-1 px-2 rounded-md text-green-500";
const INACTIVE_ROUTE = "py-1 px-2 rounded-md bg-transparent text-foreground";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    // console.log(session);
    return (
      <ProfileButton
        name={session?.user?.name}
        img={session?.user?.image}
        signOutCallback={signOut}
      />
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
      <a href="/" onClick={() => setShowMenu(false)}>
        <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
          Home
        </li>
      </a>
      {[
        { title: "Currently Playing", path: "/song/current" },
        { title: "About Us", path: "/song/about" }
        // { title: "Song", path: "/song/id" },
        // { title: "Protected", path: "/song/protected" }
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
      <div className="z-20 flex items-center justify-between p-4 lg:rounded-lg bg-background h-14">
        <Banner />
        <div
          className={
            "flex items-center gap-2 font-semibold tracking-wider h-14 justify-center align-middle"
          }
        >
          <span
            className={clsx("hidden lg:flex-row lg:flex ", rajdhani.className)}
          >
            {menuLinks()}
          </span>
          <AuthButton />
          <span className="items-center justify-center hidden align-middle lg:flex">
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
          <ModeToggle
            text="Toggle theme"
            clickFunction={() => setShowMenu((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
