'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSaved } from '@/hooks/useSaved';
import CollegeCard from '@/components/ui/CollegeCard';
import { Bookmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { savedColleges, isLoading } = useSaved();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/saved');
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-100 p-5"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Extract the nested college objects from the saved records
  const colleges = savedColleges
    .map((sc: any) => sc.college)
    .filter((c: any) => c !== null && c !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Saved Colleges
          </h1>
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-sm font-semibold text-indigo-700">
            {colleges.length} Shortlisted
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Your personalized shortlist of saved institutions and college profiles.
        </p>
      </div>

      {colleges.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Bookmark className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">No saved colleges yet</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-500 font-medium">
            Start exploring top colleges across India and save the ones you are interested in!
          </p>
          <Link
            href="/colleges"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Explore Colleges
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college: any) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
