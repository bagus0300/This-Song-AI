import "./globals.css";
import { inter } from "@/components/ui/fonts";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProvider } from "@/context/ContextProvider";
import { accessToken, logout } from "@/lib/spotify";
import SongData from "@/components/song-data";
import Main from "@/components/ui/main";

export const metadata = {
  title: "This Song",
  description: "Displays information and lyrics about songs on Spotify."
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ContextProvider>
            <div className="flex flex-col h-full lg:flex-row">
              <div className="sticky top-0 w-full h-full lg:w-64">
                <Sidebar />
              </div>
              <Main children={children} />
            </div>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
