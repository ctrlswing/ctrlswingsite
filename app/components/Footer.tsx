import EmailOptIn from "./EmailOptIn";

export function Footer() {
  const links = [{ name: "github", url: "https://github.com/jackson" }];

  return (
    <footer className="mt-12 space-y-8">
      <EmailOptIn />
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
