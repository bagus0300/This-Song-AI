// import Sidebar from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import { ContextProvider } from "@/context/ContextProvider";
import NavMenu from "@/components/ui/NavMenu";
import clsx from "clsx";
import { rajdhani } from "@/components/ui/fonts";

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
          <div className="flex flex-col h-full">
            <nav className="fixed top-0 left-0 z-20 w-full bg-background h-fit lg:py-2 lg:px-2">
              <NavMenu />
            </nav>
            <section className="relative mt-[56px] lg:w-full">
              {children}
            </section>
            <footer className={clsx(rajdhani.className, "bg-secondary")}>
              <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 pt-8 mb-10 text-center sm:text-end sm:grid-cols-2 lg:grid-cols-2">
                  <div></div>
                  <div>
                    <p className="text-lg font-semibold tracking-widest text-gray-900">
                      This Song
                    </p>

                    <ul className="text-base">
                      <li>
                        <a
                          href="mailto:admin@thissong.app"
                          className="text-gray-700 transition hover:opacity-75"
                        >
                          Contact
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-gray-700 transition hover:opacity-75"
                        >
                          {/* About */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-end">
                  <p className="text-sm text-muted">
                    All songs, lyrics, and images are property of their
                    respective owners.
                  </p>
                  <p className="text-sm text-muted">
                    &copy; 2024. This Song. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
