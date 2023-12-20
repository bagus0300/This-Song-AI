import Sidebar from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import { ContextProvider } from "@/context/ContextProvider";

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
          <div className="flex flex-col h-full lg:flex-row">
            <div className="fixed top-0 left-0 w-full h-fit lg:w-64 lg:min-w-[16rem] z-20 lg:p-2">
              <Sidebar />
            </div>
            <div className="relative top-[56px] lg:top-0 lg:left-[256px] lg:w-[calc(99dvw-256px-8px)]">
              {children}
            </div>
          </div>
        </ContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
