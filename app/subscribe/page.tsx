import Link from 'next/link';
import EmailOptIn from '../components/EmailOptIn';

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-left">
          <h1>
            stay updated
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Every month I share one thought, one output, and one question.
          </p>
        </div>
        
        <EmailOptIn />
        
        <div className="mt-4 flex justify-end">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
} 