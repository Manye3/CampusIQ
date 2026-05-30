'use client';

import { Heart, GitCompareArrows, MapPin, Star, IndianRupee } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { formatFees } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { College } from '@/types';

interface CollegeCardProps {
  college: College;
  onCompare?: () => void;
  isInCompare?: boolean;
}

const TYPE_STYLES: Record<College['type'], string> = {
  Government: 'bg-green-50 text-green-700 border-green-200',
  Private: 'bg-blue-50 text-blue-700 border-blue-200',
  Deemed: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function CollegeCard({
  college,
  onCompare,
  isInCompare = false,
}: CollegeCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [savePending, setSavePending] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    let cancelled = false;
    async function checkSaved() {
      try {
        const res = await fetch('/api/saved');
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const saved = Array.isArray(data.saved) ? data.saved : data;
        const found = saved.some(
          (item: { collegeId?: string; id?: string }) =>
            (item.collegeId ?? item.id) === college.id
        );
        setIsSaved(found);
      } catch {
        // Silently ignore – non-critical
      }
    }
    checkSaved();
    return () => {
      cancelled = true;
    };
  }, [session?.user, college.id]);

  const toggleSave = useCallback(async () => {
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    if (savePending) return;

    const previousState = isSaved;
    setIsSaved(!previousState);
    setSavePending(true);

    try {
      const res = await fetch('/api/saved', {
        method: previousState ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId: college.id }),
      });

      if (!res.ok) {
        setIsSaved(previousState);
      }
    } catch {
      setIsSaved(previousState);
    } finally {
      setSavePending(false);
    }
  }, [session?.user, isSaved, savePending, college.id, router]);

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link
            href={`/colleges/${college.slug}`}
            className="line-clamp-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600"
          >
            {college.name}
          </Link>
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium',
            TYPE_STYLES[college.type]
          )}
        >
          {college.type}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <IndianRupee className="h-4 w-4 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {formatFees(college.fees)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-amber-500">
            {college.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={toggleSave}
          disabled={savePending}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
            isSaved
              ? 'border-red-200 bg-red-50 text-red-500'
              : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-red-400'
          )}
          aria-label={isSaved ? 'Unsave college' : 'Save college'}
        >
          <Heart
            className={cn('h-4 w-4', isSaved && 'fill-red-500')}
          />
        </button>
        {onCompare && (
          <button
            type="button"
            onClick={onCompare}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
              isInCompare
                ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-indigo-500'
            )}
            aria-label={
              isInCompare ? 'Remove from compare' : 'Add to compare'
            }
          >
            <GitCompareArrows className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
