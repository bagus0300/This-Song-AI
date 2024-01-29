import "./globals.css";
import { inter } from "@/components/ui/fonts";

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
      <head>
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <main className="gap-2 mx-auto">{children}</main>
      </body>
    </html>
  );
}
