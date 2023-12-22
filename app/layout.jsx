import "./globals.css";
import { inter } from "@/components/ui/fonts";
import { Github } from "lucide-react";

export const metadata = {
  title: {
    template: "This Song | %s",
    default: "This Song - AI-powered lyric analysis"
  },
  description:
    "Discover the meaning behind your favorite songs through AI-enhanced lyric analysis! Search for any song or log in through Spotify to see what's currently playing."
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <main className="gap-2 mx-auto">{children}</main>
        <footer class="bg-secondary">
          <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="text-center sm:text-end grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-2 lg:pt-16 mb-10">
              <div></div>

              <div>
                <p class="font-medium text-gray-900">This Song</p>

                <ul class="text-sm">
                  <li>
                    <a
                      href="mailto:atopala7@gmail.com"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Contact
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      {/* About */}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-end">
              <p class="text-xs text-muted">
                All songs, lyrics, and images are property of their respective
                owners.
              </p>
              <p class="text-xs text-muted">
                &copy; 2023. This Song. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
