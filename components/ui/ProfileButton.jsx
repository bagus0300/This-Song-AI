import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { rajdhani } from "@/components/ui/fonts";

const ProfileButton = ({ name, img, signOutCallback }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center gap-2 p-2 text-sm font-medium text-center align-middle rounded-full h-[40px] w-[40px] bg-primary text-primary-foreground hover:bg-primary/90">
          <Avatar>
            <AvatarImage src={img || ""} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          {/* Signed in as {session?.user?.name} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <span className={rajdhani.className}>{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOutCallback}>
          <span className={rajdhani.className}>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
