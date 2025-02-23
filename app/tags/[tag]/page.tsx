import Link from 'next/link';
import { getArticles } from '@/app/lib/get-articles';
import { Tags } from '@/app/components/Tags';

interface Props {
  params: {
    tag: string;
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = params;
  const articles = await getArticles(tag);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-medium pt-12 mb-2">articles tagged with "{tag}"</h1>
        <Tags tags={[tag]} className="mt-2 mb-8" />
      </div>

      <div className="space-y-1">
        {articles.map((article) => (
          <div key={article.slug}>
            <Link
              href={`/n/${article.slug}`}
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {article.metadata.title.toLowerCase()}
            </Link>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          ← back
        </Link>
      </div>
    </div>
  );
} 