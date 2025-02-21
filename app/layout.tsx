import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { unstable_ViewTransition as ViewTransition } from "react";
import EmailOptIn from "./components/EmailOptIn";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ctrlswing.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "ctrlswing",
    template: "%s | ctrlswing",
  },
  description: "Personal blog by jackson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            <ViewTransition name="test">{children}</ViewTransition>
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
