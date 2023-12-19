"use client";
import React, { useEffect, useState } from "react";
import LoginButton from "./ui/login-button";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TokenContext } from "@/context/ContextProvider";
import { useContext } from "react";
import {
  checkToken,
  getAccessToken,
  getCurrentUserProfile,
  logout
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { token, setToken } = useContext(TokenContext);

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  console.log("Rendering user-profile.jsx");

  useEffect(() => {
    const getToken = () => {
      const accessToken = getAccessToken();
      setToken(accessToken);
    };
    catchErrors(getToken());
  }, [setToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        // console.log("Getting user profile...");
        try {
          const res = await getCurrentUserProfile();
          if (res.status === 200) {
            const profile = {
              id: res.data.id,
              display_name: res.data.display_name,
              images: res.data.images,
              link: res.data.external_urls.spotify
            };

            setProfile(profile);
          } else {
            console.error(`Failed to get user profile! (${res.status})`);
          }
        } catch (err) {
          // console.log("Logging in...");
        }
      }
    };

    if (token) catchErrors(fetchData());
    // console.log("Pathname: " + pathname);
    if (searchParams.has("access_token")) {
      replace(`${pathname}`);
      // window.location.href = "/song";
      // redirect("/song");
    }
  }, [token, pathname, replace, searchParams]);

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
          <DropdownMenuItem
            onClick={() => {
              setProfile(null);
              setToken(null);
              logout();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (token) {
    return (
      <div className="flex items-center justify-center w-full gap-2 p-1 rounded-sm bg-primary">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-36 h-9" />
      </div>
    );
  } else {
    const LOGIN_URI =
      process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
        ? "http://192.168.4.158:8000/login"
        : "https://spotify-node1313-f6ce692711e7.herokuapp.com/login";
    return (
      <>
        <a href={LOGIN_URI}>
          <LoginButton />
        </a>
      </>
    );
  }
};

export default UserProfile;
