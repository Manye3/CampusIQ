'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCompare } from '@/hooks/useCompare';
import { useEffect, useState, useMemo } from 'react';
import { formatFees, formatLPA } from '@/lib/utils';
import Link from 'next/link';
import { X, ExternalLink, GitCompareArrows, Trash2 } from 'lucide-react';
import type { College } from '@/types';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedColleges, removeCollege, clearAll } = useCompare();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idsFromUrl = searchParams.get('ids');

  useEffect(() => {
    // If we have IDs in the URL, fetch their complete detailed relation data from our API
    if (idsFromUrl) {
      setLoading(true);
      setError(null);
      fetch(`/api/compare?ids=${idsFromUrl}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to load comparison data');
          }
          return res.json();
        })
        .then((data) => {
          setColleges(data.colleges || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'An error occurred while loading comparison data.');
          setLoading(false);
        });
    } else {
      // Otherwise fallback to whatever is currently loaded in our local Zustand compare store
      setColleges(selectedColleges);
    }
  }, [idsFromUrl, selectedColleges]);

  // Sync url with the local store removal if URL is driving the comparison
  const handleRemove = (collegeId: string) => {
    removeCollege(collegeId);
    if (idsFromUrl) {
      const remainingIds = idsFromUrl
        .split(',')
        .filter((id) => id !== collegeId)
        .join(',');
      if (remainingIds) {
        router.push(`/compare?ids=${remainingIds}`);
      } else {
        router.push('/compare');
      }
    }
  };

  const handleClearAll = () => {
    clearAll();
    router.push('/compare');
  };

  // Highlights comparison rows
  const highlights = useMemo(() => {
    if (colleges.length < 2) return null;

    const feesArray = colleges.map((c) => c.fees);
    const ratingsArray = colleges.map((c) => c.rating);
    const avgPackagesArray = colleges.map((c) => c.placements?.[0]?.avgPackage || 0);
    const placementPercentsArray = colleges.map((c) => c.placements?.[0]?.placementPercent || 0);

    return {
      minFees: Math.min(...feesArray),
      maxRating: Math.max(...ratingsArray),
      maxAvgPackage: Math.max(...avgPackagesArray),
      maxPlacementPercent: Math.max(...placementPercentsArray),
    };
  }, [colleges]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="mt-2 text-sm text-gray-500">Loading comparison details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-sm font-semibold text-red-800">{error}</p>
          <Link
            href="/colleges"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Go back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  if (colleges.length < 2) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <GitCompareArrows className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Compare Colleges</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-500">
            Select at least 2 colleges from the explore page to compare them side by side.
          </p>
          <Link
            href="/colleges"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Find Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Compare Colleges
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Analyze fees, placement rates, ratings, and course selections side-by-side.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClearAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          Clear Comparison
        </button>
      </div>

      {/* Comparison Grid container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed divide-y divide-gray-200 border-collapse text-left text-sm text-gray-500">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="w-[200px] shrink-0 border-r border-gray-200 px-6 py-4 font-semibold text-gray-900">
                  Parameters
                </th>
                {colleges.map((college) => (
                  <th
                    key={college.id}
                    scope="col"
                    className="relative min-w-[250px] border-r border-gray-200 px-6 py-4"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemove(college.id)}
                      className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      aria-label={`Remove ${college.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="pr-6">
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="block font-bold text-gray-900 hover:text-indigo-600 hover:underline"
                      >
                        {college.name}
                      </Link>
                      <span className="mt-1 inline-flex rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                        {college.type}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Location */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Location
                </td>
                {colleges.map((college) => (
                  <td key={college.id} className="border-r border-gray-200 px-6 py-4 text-gray-600">
                    {college.location}
                  </td>
                ))}
              </tr>

              {/* Established */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Established
                </td>
                {colleges.map((college) => (
                  <td key={college.id} className="border-r border-gray-200 px-6 py-4">
                    {college.established || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Annual Fees */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Annual Fees
                </td>
                {colleges.map((college) => {
                  const isBest = highlights && college.fees === highlights.minFees;
                  return (
                    <td
                      key={college.id}
                      className={`border-r border-gray-200 px-6 py-4 font-semibold
                        ${isBest ? 'bg-emerald-50/60 text-emerald-800' : 'text-gray-900'}
                      `}
                    >
                      {formatFees(college.fees)}
                    </td>
                  );
                })}
              </tr>

              {/* Overall Rating */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Overall Rating
                </td>
                {colleges.map((college) => {
                  const isBest = highlights && college.rating === highlights.maxRating;
                  return (
                    <td
                      key={college.id}
                      className={`border-r border-gray-200 px-6 py-4 font-semibold
                        ${isBest ? 'bg-emerald-50/60 text-emerald-800' : 'text-gray-900'}
                      `}
                    >
                      {college.rating.toFixed(1)} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Average Placement Package */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Avg. Placement Package
                </td>
                {colleges.map((college) => {
                  const placement = college.placements?.[0];
                  const avgPackage = placement?.avgPackage || 0;
                  const isBest = highlights && avgPackage === highlights.maxAvgPackage && avgPackage > 0;
                  return (
                    <td
                      key={college.id}
                      className={`border-r border-gray-200 px-6 py-4
                        ${isBest ? 'bg-emerald-50/60 font-semibold text-emerald-800' : ''}
                      `}
                    >
                      {avgPackage > 0 ? formatLPA(avgPackage) : 'N/A'}
                    </td>
                  );
                })}
              </tr>

              {/* Highest Package */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Highest Package
                </td>
                {colleges.map((college) => {
                  const placement = college.placements?.[0];
                  const highestPackage = placement?.highestPackage || 0;
                  return (
                    <td key={college.id} className="border-r border-gray-200 px-6 py-4 font-medium text-gray-900">
                      {highestPackage > 0 ? formatLPA(highestPackage) : 'N/A'}
                    </td>
                  );
                })}
              </tr>

              {/* Placement % */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Placement Rate
                </td>
                {colleges.map((college) => {
                  const placement = college.placements?.[0];
                  const placementPercent = placement?.placementPercent || 0;
                  const isBest = highlights && placementPercent === highlights.maxPlacementPercent && placementPercent > 0;
                  return (
                    <td
                      key={college.id}
                      className={`border-r border-gray-200 px-6 py-4
                        ${isBest ? 'bg-emerald-50/60 font-semibold text-emerald-800' : ''}
                      `}
                    >
                      {placementPercent > 0 ? `${placementPercent.toFixed(0)}%` : 'N/A'}
                    </td>
                  );
                })}
              </tr>

              {/* Number of Courses */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Number of Courses
                </td>
                {colleges.map((college) => (
                  <td key={college.id} className="border-r border-gray-200 px-6 py-4 text-gray-900 font-medium">
                    {college.courses?.length || 0} courses
                  </td>
                ))}
              </tr>

              {/* Top Recruiters */}
              <tr>
                <td className="border-r border-gray-200 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
                  Top Recruiters
                </td>
                {colleges.map((college) => {
                  const placement = college.placements?.[0];
                  let recruiters: string[] = [];
                  if (placement?.topRecruiters) {
                    try {
                      recruiters = JSON.parse(placement.topRecruiters);
                    } catch {
                      recruiters = placement.topRecruiters.split(',').map((r) => r.trim());
                    }
                  }
                  return (
                    <td key={college.id} className="border-r border-gray-200 px-6 py-4">
                      {recruiters.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {recruiters.map((r, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
