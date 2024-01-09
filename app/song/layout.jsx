// import Sidebar from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import { ContextProvider } from "@/context/ContextProvider";
import NavMenu from "@/components/ui/NavMenu";
import clsx from "clsx";
import { rajdhani } from "@/components/ui/fonts";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Song Information",
  description: "AI-enhanced analysis of lyrics for songs on Spotify."
};

export default async function SongLayout({ children }) {
  const session = await getServerSession();

  // return session?.user?.name ? session.user.name : "No session";

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider session={session}>
        <ContextProvider>
          <div className="flex flex-col h-full min-h-[100vh]">
            <nav className="fixed top-0 left-0 z-20 w-full bg-background h-fit lg:py-2 lg:px-2">
              <NavMenu />
            </nav>
            <section className="relative mt-[56px] lg:mt-[72px] lg:w-full flex-grow">
              {children}
            </section>
            <Footer />
          </div>
        </ContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
