'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';

interface CollegesErrorProps {
  error: Error;
  reset: () => void;
}

export default function CollegesError({ error, reset }: CollegesErrorProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-xl bg-white shadow-sm border border-red-100 p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Something went wrong loading colleges
        </h2>
        <p className="text-sm text-gray-500">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
