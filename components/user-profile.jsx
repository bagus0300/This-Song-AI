"use client";
import React, { useEffect, useState } from "react";
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
import { TokenContext } from "@/context/ContextProvider";
import { useContext } from "react";
import { accessToken, getCurrentUserProfile, logout } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { token, setToken } = useContext(TokenContext);

  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const profile = await getCurrentUserProfile();
        if (profile) {
          setProfile(profile.data);
          replace(`${pathname}`);
        }
      }
    };

    catchErrors(fetchData());
  }, [token]);

  if (profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center w-full gap-2 p-1 text-sm font-medium text-center align-middle rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
            <Avatar>
              <AvatarImage
                src={profile.images.length ? profile.images[0].url : ""}
              />
              <AvatarFallback>{profile.display_name[0]}</AvatarFallback>
            </Avatar>
            Signed in as {profile.display_name}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{profile.display_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <a href="http://192.168.4.158:8000/login">
        <LoginButton />
      </a>
    </>
  );

  return;
};

export default UserProfile;
