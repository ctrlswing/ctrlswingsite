import { Analytics } from "@vercel/analytics/react";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
      <main className="max-w-[60ch] mx-auto w-full space-y-6">
        <ViewTransition>{children}</ViewTransition>
      </main>
      <Analytics />
    </div>
  );
} 