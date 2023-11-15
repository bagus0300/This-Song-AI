"use client";
import "./globals.css";
import { inter } from "@/components/ui/fonts";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProvider } from "@/context/ContextProvider";
import { accessToken, logout } from "@/lib/spotify";
import SongData from "@/components/song-data";
import { useRef } from "react";

// export const metadata = {
//   title: "This Song",
//   description: "Displays information and lyrics about songs on Spotify."
// };

export default function RootLayout({ children }) {
  const ref = useRef(null);

  const getScrollYPercent = () => {
    const totalScrollHeight =
      ref.current.scrollHeight - ref.current.clientHeight;

    return 1 - (totalScrollHeight - ref.current.scrollTop) / totalScrollHeight;
    // return ref.current.scrollTop;
    // return ref.current.getBoundingClientRect().height;
    // return ref.current.scrollHeight - ref.current.clientHeight;
  };

  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ContextProvider>
            <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
              <div className="flex-none w-full md:w-64">
                <Sidebar />
              </div>
              <div className="relative flex-grow overflow-y-auto" ref={ref}>
                <div class="sticky top-0">
                  <SongData
                    container={ref}
                    getScrollYPercent={getScrollYPercent}
                  />
                </div>
                <div>{children}</div>
              </div>
            </div>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
