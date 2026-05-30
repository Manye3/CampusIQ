'use client';

import { useCompare } from '@/hooks/useCompare';
import { X, GitCompareArrows } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CompareBar() {
  const { selectedColleges, removeCollege, clearAll } = useCompare();

  if (selectedColleges.length === 0) return null;

  const compareUrl = `/compare?ids=${selectedColleges.map((c) => c.id).join(',')}`;
  const canCompare = selectedColleges.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <GitCompareArrows className="h-4 w-4" />
            <span className="hidden sm:inline">Compare</span>
            <span className="text-indigo-600">({selectedColleges.length}/3)</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedColleges.map((college) => (
              <span
                key={college.id}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 py-1 pl-3 pr-1.5 text-sm text-indigo-700"
              >
                <span className="max-w-[120px] truncate sm:max-w-[180px]">
                  {college.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeCollege(college.id)}
                  className="rounded-full p-0.5 hover:bg-indigo-100"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="ml-4 flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Clear
          </button>
          <Link
            href={canCompare ? compareUrl : '#'}
            onClick={(e) => {
              if (!canCompare) e.preventDefault();
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              canCompare
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
            )}
            aria-disabled={!canCompare}
          >
            <GitCompareArrows className="h-4 w-4" />
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
