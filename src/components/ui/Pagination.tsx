'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      rangeStart = 2;
      rangeEnd = 4;
    } else if (currentPage >= totalPages - 2) {
      rangeStart = totalPages - 3;
      rangeEnd = totalPages - 1;
    }

    if (rangeStart > 2) pages.push('ellipsis');

    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);

    if (rangeEnd < totalPages - 1) pages.push('ellipsis');

    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-gray-600">
        Showing{' '}
        <span className="font-medium">{start}</span>
        –
        <span className="font-medium">{end}</span>
        {' '}of{' '}
        <span className="font-medium">{total}</span>
        {' '}colleges
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={isFirstPage}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded border text-sm transition-colors',
            isFirstPage
              ? 'cursor-not-allowed border-gray-200 text-gray-300 opacity-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              )}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded border text-sm transition-colors',
            isLastPage
              ? 'cursor-not-allowed border-gray-200 text-gray-300 opacity-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
