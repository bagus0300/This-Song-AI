"use client";
import React from "react";
import LoginButton from "./ui/login-button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const UserProfile = () => {
  // const { data: session, status } = useSession();
  // const userEmail = session?.user?.email;

  // if (status === "loading") {
  //   return <button>Loading...</button>;
  // }

  // if (status === "authenticated") {
  //   console.log(session);

  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger>
  //         <div className="flex items-center justify-center w-full gap-2 p-1 text-sm font-medium text-center align-middle rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
  //           <Avatar>
  //             <AvatarImage src={session.user.image} />
  //             <AvatarFallback>{session.user.name[0]}</AvatarFallback>
  //           </Avatar>
  //           Signed in as {session.user.name}
  //         </div>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem onClick={() => signOut()}>
  //           Sign out
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //     // {/* <button onClick={() => signOut()}>Sign out</button> */}
  //   );
  // }

  return (
    <>
      <a onClick={() => signIn("spotify")}>
        <LoginButton />
      </a>
    </>
  );

  return;
};

export default UserProfile;
