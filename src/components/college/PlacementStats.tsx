'use client';

import { formatLPA } from '@/lib/utils';
import { Award, Briefcase, TrendingUp } from 'lucide-react';
import type { Placement } from '@/types';

interface PlacementStatsProps {
  placements: Placement[];
}

export default function PlacementStats({ placements }: PlacementStatsProps) {
  if (placements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
        <Briefcase className="h-8 w-8 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No placement records</h3>
        <p className="mt-1 text-sm text-gray-500">
          No placement statistics have been added for this college yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {placements.map((placement) => {
        let recruiters: string[] = [];
        try {
          recruiters = JSON.parse(placement.topRecruiters);
        } catch {
          // Handled fallback if not JSON
          recruiters = placement.topRecruiters
            ? placement.topRecruiters.split(',').map((r) => r.trim())
            : [];
        }

        const highest = placement.highestPackage || 1;
        const avg = placement.avgPackage;
        const avgPercent = Math.min(100, Math.round((avg / highest) * 100));

        return (
          <div
            key={placement.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Placement Report — {placement.year}
              </h3>
              <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                <TrendingUp className="h-4 w-4" />
                <span>{placement.placementPercent.toFixed(0)}% Placed</span>
              </div>
            </div>

            {/* Packaging statistics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                {/* Average package */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-500">Average Package</span>
                    <span className="text-gray-900 font-semibold">
                      {formatLPA(placement.avgPackage)}
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100">
                    <div
                      className="h-3 rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${avgPercent}%` }}
                    />
                  </div>
                </div>

                {/* Highest package */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-500">Highest Package</span>
                    <span className="text-indigo-600 font-bold">
                      {formatLPA(placement.highestPackage)}
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100">
                    <div
                      className="h-3 rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Top Recruiters */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <Award className="h-4 w-4 text-indigo-500" />
                  <span>Top Recruiters</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recruiters.map((recruiter, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"
                    >
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
