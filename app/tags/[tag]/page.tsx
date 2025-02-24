import Link from 'next/link';
import { getArticles } from '@/app/lib/get-articles';
import { BackButton } from '@/app/components/BackButton';

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
        <h1 className="font-medium pt-12 mb-8">articles tagged with "{tag}"</h1>
      </div>

      <div className="space-y-1">
        {articles.map((article) => (
          <div key={article.slug}>
            <Link
              href={`/n/${article.slug}`}
              className="text-gray-500 hover:text-[#fffba0] dark:text-gray-400 dark:hover:text-[#ffec8e] transition-colors duration-200"
            >
              {article.metadata.title.toLowerCase()}
            </Link>
          </div>
        ))}
      </div>

      <BackButton />
    </div>
  );
} 