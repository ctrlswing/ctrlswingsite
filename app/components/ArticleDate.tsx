import { format } from 'date-fns';

interface ArticleDateProps {
  date: string;
  className?: string;
}

export function ArticleDate({ date, className = '' }: ArticleDateProps) {
  const formattedDate = format(new Date(date), 'MM-dd-yyyy');
  
  return (
    <time 
      dateTime={date}
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      {formattedDate}
    </time>
  );
} 