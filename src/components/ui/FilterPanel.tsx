'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Filter, Star, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'Kerala',
  'Punjab',
  'Jharkhand',
  'Uttarakhand',
  'Assam',
  'Puducherry',
  'Chandigarh',
] as const;

const COLLEGE_TYPES = ['Government', 'Private', 'Deemed'] as const;

const SORT_OPTIONS = [
  { label: 'Rating (High to Low)', value: 'rating_desc' },
  { label: 'Fees (Low to High)', value: 'fees_asc' },
  { label: 'Fees (High to Low)', value: 'fees_desc' },
  { label: 'Name (A-Z)', value: 'name_asc' },
] as const;

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentState = searchParams.get('state') ?? '';
  const currentType = searchParams.get('type') ?? '';
  const currentMinFees = searchParams.get('minFees') ?? '';
  const currentMaxFees = searchParams.get('maxFees') ?? '';
  const currentMinRating = Number(searchParams.get('minRating') ?? 0);
  const currentSort = searchParams.get('sortBy') ?? '';

  const applyFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    const search = searchParams.get('search');
    if (search) params.set('search', search);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const hasActiveFilters =
    currentState || currentType || currentMinFees || currentMaxFees || currentMinRating || currentSort;

  const filterContent = (
    <div className="space-y-6">
      {/* State Filter */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          State
        </label>
        <div className="relative">
          <select
            value={currentState}
            onChange={(e) => applyFilter('state', e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All States</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* College Type */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          College Type
        </label>
        <div className="flex gap-2">
          {COLLEGE_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                applyFilter('type', currentType === type ? '' : type)
              }
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                currentType === type
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Range */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Fee Range
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              ₹
            </span>
            <input
              type="number"
              placeholder="Min"
              value={currentMinFees}
              onChange={(e) => applyFilter('minFees', e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span className="text-gray-400">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              ₹
            </span>
            <input
              type="number"
              placeholder="Max"
              value={currentMaxFees}
              onChange={(e) => applyFilter('maxFees', e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Min Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() =>
                applyFilter(
                  'minRating',
                  currentMinRating === star ? '' : star.toString()
                )
              }
              className="rounded p-0.5 transition-colors hover:bg-amber-50"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                className={cn(
                  'h-5 w-5 transition-colors',
                  star <= currentMinRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                )}
              />
            </button>
          ))}
          {currentMinRating > 0 && (
            <span className="ml-1 text-sm text-gray-500">& up</span>
          )}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Sort By
        </label>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => applyFilter('sortBy', e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Default</option>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
      >
        <Filter className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
            !
          </span>
        )}
      </button>

      {/* Mobile panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 lg:hidden',
          isOpen ? 'max-h-[2000px] pt-4' : 'max-h-0'
        )}
      >
        {filterContent}
      </div>

      {/* Desktop panel */}
      <div className="hidden lg:block">{filterContent}</div>
    </>
  );
}
