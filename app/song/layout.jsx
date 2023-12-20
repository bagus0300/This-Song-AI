// import Sidebar from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import { ContextProvider } from "@/context/ContextProvider";
import NavMenu from "@/components/ui/NavMenu";

export const metadata = {
  title: "Song Information",
  description:
    "AI-enhanced analysis of lyrics for the song currently playing on Spotify."
};

export default async function SongLayout({ children }) {
  const session = await getServerSession();

  // return session?.user?.name ? session.user.name : "No session";

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider session={session}>
        <ContextProvider>
          <div className="flex flex-col h-full lg:flex-row lg:px-2">
            <div className="fixed top-0 left-0 z-20 w-full bg-white h-fit lg:pt-2 lg:px-2">
              <NavMenu />
            </div>
            <div className="relative mt-[56px] lg:mt-[64px] lg:w-full">
              {children}
            </div>
          </div>
        </ContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
