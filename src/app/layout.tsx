import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/nav-bar/nav-bar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nekomovies",
  description: "Watch Online Movies and TV Shows for Free",
  keywords: [
    "watch movies online",
    "watch tv shows online",
    "watch movies online free",
    "watch tv shows online free",
    "watch movies online free",
    "watch tv shows online free",
  ],
  // Open Graph
  // openGraph: {
  //   title: "nekomovies",
  //   description: "Watch Online Movies and TV Shows for Free",
  //   type: "website",
  //   url: "https://nekomovies.xyz",
  //   siteName: "nekomovies",
  //   locale: "en_US",
  //   // images: [
  //   //   {
  //   //     url: "https://nekomovies.xyz/logo.png",
  //   //     width: 800,
  //   //     height: 600,
  //   //     alt: "nekomovies",
  //   //   },
  //   // ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-background m-0 p-0 h-full overflow-x-hidden caret-transparent"
        )}
      >
        <Providers>
          <NavBar />
          {children}
          <Toaster />
        </Providers>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-4CK2W6W7SQ" />
        )}
      </body>
    </html>
  );
}
