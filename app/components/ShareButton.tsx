"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ShareButton() {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsShareSupported(!!navigator.share);
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}`;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-gray-400 dark:text-gray-500 hover:text-[#fffba0] dark:hover:text-[#ffec8e] transition-colors duration-200"
    >
      share
    </button>
  );
} 