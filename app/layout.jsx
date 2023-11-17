import "./globals.css";
import { inter } from "@/components/ui/fonts";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProvider } from "@/context/ContextProvider";
// import { accessToken, logout } from "@/lib/spotify";
// import SongData from "@/components/song-data";
import Main from "@/components/ui/main";

export const metadata = {
  title: "This Song",
  description: "Displays information and lyrics about songs on Spotify."
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ContextProvider>
            <div className="flex flex-col h-full lg:flex-row">
              <div className="fixed top-0 left-0 w-full h-fit lg:w-64 lg:min-w-[16rem] z-20 lg:p-2">
                <Sidebar />
              </div>
              <div className="relative top-[56px] lg:top-0 lg:left-[256px] lg:w-[calc(99dvw-256px-8px)]">
                <Main children={children} />
              </div>
            </div>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
