'use client';

import { useState } from 'react';
import CollegeOverview from '@/components/college/CollegeOverview';
import CoursesTable from '@/components/college/CoursesTable';
import PlacementStats from '@/components/college/PlacementStats';
import ReviewsSection from '@/components/college/ReviewsSection';
import { GraduationCap, MapPin, Calendar, Building, Globe } from 'lucide-react';
import type { College } from '@/types';

interface CollegeDetailTabsProps {
  college: College;
}

type TabType = 'overview' | 'courses' | 'placements' | 'reviews';

export default function CollegeDetailTabs({ college }: CollegeDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'placements', label: 'Placements' },
    { id: 'reviews', label: `Reviews (${college.reviews?.length || 0})` },
  ];

  return (
    <div>
      {/* College Hero Header */}
      <div className="mb-8 rounded-2xl bg-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                <Building className="h-3 w-3" />
                {college.type}
              </span>
              {college.established && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-gray-300">
                  <Calendar className="h-3 w-3" />
                  Est. {college.established}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {college.name}
            </h1>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-300">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{college.location}</span>
            </div>
          </div>

          {college.website && (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100 sm:self-center"
            >
              <Globe className="h-4 w-4 text-gray-500" />
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Tabs bar */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panel Content */}
      <div className="mt-8">
        {activeTab === 'overview' && <CollegeOverview college={college} />}
        {activeTab === 'courses' && <CoursesTable courses={college.courses || []} />}
        {activeTab === 'placements' && <PlacementStats placements={college.placements || []} />}
        {activeTab === 'reviews' && (
          <ReviewsSection reviews={college.reviews || []} overallRating={college.rating} />
        )}
      </div>
    </div>
  );
}
