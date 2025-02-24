import { ArticleDate } from './ArticleDate';

interface ArticleHeaderProps {
  title: string;
  date: string;
}

export function ArticleHeader({ title, date }: ArticleHeaderProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 pt-12 mb-2">
      <h1 className="font-medium">{title}</h1>
      <ArticleDate date={date} className="shrink-0" />
    </div>
  );
} 