import Link from "next/link";
import { ShareButton } from "./ShareButton";

interface FooterLink {
  name: string;
  url: string;
  isInternal?: boolean;
}

const FOOTER_LINKS: FooterLink[] = [
  { name: "subscribe", url: "/subscribe", isInternal: true },
  { name: "follow", url: "https://x.com/ctrlswing" }
];

const LINK_STYLES = "text-gray-400 dark:text-gray-500 hover:text-[#fffba0] dark:hover:text-[#ffec8e] transition-colors duration-200";

function FooterLink({ name, url, isInternal }: FooterLink) {
  if (name === "subscribe") {
    return (
      <Link 
        href={url} 
        className="px-4 py-2 bg-[#fee283] text-gray-900 rounded-md hover:bg-[#f6d484] 
                 transition-colors duration-200 text-sm font-medium"
      >
        {name}
      </Link>
    );
  }

  if (isInternal) {
    return (
      <Link href={url} className={LINK_STYLES}>
        {name}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_STYLES}
    >
      {name}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-12">
      <div className="max-w-[60ch] mx-auto w-full">
        <div className="flex items-center space-x-4 tracking-tight">
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link.name} {...link} />
          ))}
          <ShareButton />
        </div>
      </div>
    </footer>
  );
}
