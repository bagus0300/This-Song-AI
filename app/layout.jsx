import "./globals.css";
import { inter } from "@/components/ui/fonts";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
// import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "This Song",
  description: "Displays information and lyrics about songs on Spotify."
};

export default function RootLayout({ session, children }) {
  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <SessionProvider session={session}>
            <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
              <div className="flex-none w-full md:w-64">
                <Sidebar />
              </div>
              <div className="flex-grow px-4 overflow-y-auto md:p-2">
                {children}
              </div>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
