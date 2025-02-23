import Link from "next/link";

export function Footer() {
  const links = [
    { name: "x", url: "https://x.com/ctrlswing" },
    { name: "github", url: "https://github.com/jackson" }
  ];

  return (
    <footer className="mt-12 space-y-8">
      <div className="text-left">
        <Link
          href="/subscribe"
          className="text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800"
        >
          click me 
        </Link> 
      </div>

      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
