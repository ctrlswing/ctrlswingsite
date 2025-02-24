import Link from 'next/link';

export function BackButton() {
  return (
    <div className="mt-8 flex justify-end">
      <Link
        href="/"
        className="text-gray-500 hover:text-[#fffba0] dark:text-gray-400 dark:hover:text-[#ffec8e] transition-colors duration-200"
      >
        back
      </Link>
    </div>
  );
} 