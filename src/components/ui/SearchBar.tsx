'use client';

import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const isInitialMount = useRef(true);

  const updateURL = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term.trim()) {
        params.set('search', term.trim());
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      updateURL(value);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClear = () => {
    setValue('');
    updateURL('');
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search colleges by name, city, or state..."
        className="w-full rounded-lg border border-gray-300 px-10 py-3 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
