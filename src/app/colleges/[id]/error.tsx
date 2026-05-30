'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';

interface CollegeDetailErrorProps {
  error: Error;
  reset: () => void;
}

export default function CollegeDetailError({ error, reset }: CollegeDetailErrorProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-xl bg-white shadow-sm border border-red-100 p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          College not found or an error occurred
        </h2>
        <p className="text-sm text-gray-500">
          {error.message || 'We couldn\'t load this college. It may have been removed or the link is incorrect.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
