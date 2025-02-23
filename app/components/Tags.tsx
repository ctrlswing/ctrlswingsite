import Link from 'next/link';

interface TagsProps {
  tags: string[];
  className?: string;
}

export function Tags({ tags, className = '' }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300 
                   bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded-md transition-colors duration-200"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
} 