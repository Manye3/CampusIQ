'use client';

import { useSaved } from '@/hooks/useSaved';
import { useCompare } from '@/hooks/useCompare';
import { Star, IndianRupee, TrendingUp, Award, Heart, GitCompareArrows } from 'lucide-react';
import { formatFees, formatLPA } from '@/lib/utils';
import type { College } from '@/types';

interface CollegeOverviewProps {
  college: College;
}

export default function CollegeOverview({ college }: CollegeOverviewProps) {
  const { isSaved, toggleSave, isSaving } = useSaved();
  const { addCollege, removeCollege, isSelected } = useCompare();

  const isSavedState = isSaved(college.id);
  const isInCompare = isSelected(college.id);

  // Derive placement stats from placements if available
  const latestPlacement = college.placements && college.placements.length > 0
    ? college.placements[0]
    : null;

  const placementPercent = latestPlacement ? latestPlacement.placementPercent : 85; // Fallback or standard
  const highestPackage = latestPlacement ? latestPlacement.highestPackage : 0;

  const handleCompareToggle = () => {
    if (isInCompare) {
      removeCollege(college.id);
    } else {
      addCollege(college);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{college.rating.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Rating (0-5)</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <IndianRupee className="h-5 w-5" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatFees(college.fees)}</p>
            <p className="text-xs text-gray-500">Avg. Annual Fees</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{placementPercent}%</p>
            <p className="text-xs text-gray-500">Placement %</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <Award className="h-5 w-5" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {highestPackage > 0 ? formatLPA(highestPackage) : 'N/A'}
            </p>
            <p className="text-xs text-gray-500">Highest Package</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">About College</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {college.description || 'No description available for this college. We are continually updating our database with detailed institutional profiles.'}
          </p>
        </div>
      </div>

      {/* Sidebar - Quick Actions */}
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => toggleSave(college.id)}
              disabled={isSaving}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition-colors
                ${
                  isSavedState
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Heart className={`h-4 w-4 ${isSavedState ? 'fill-red-500' : ''}`} />
              {isSavedState ? 'Saved in Shortlist' : 'Add to Shortlist'}
            </button>

            <button
              type="button"
              onClick={handleCompareToggle}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition-colors
                ${
                  isInCompare
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <GitCompareArrows className="h-4 w-4" />
              {isInCompare ? 'Added to Compare' : 'Add to Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
