import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProvider } from "@/context/ContextProvider";

export const metadata = {
  title: "This Song",
  description: "Displays information and lyrics about songs on Spotify."
};

export default function SongLayout({ children }) {
  return (
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
  );
}
