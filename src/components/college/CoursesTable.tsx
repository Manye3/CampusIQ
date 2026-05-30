'use client';

import { useState, useMemo } from 'react';
import { formatFees } from '@/lib/utils';
import { ArrowUpDown, BookOpen } from 'lucide-react';
import type { Course } from '@/types';

interface CoursesTableProps {
  courses: Course[];
}

type SortOrder = 'none' | 'asc' | 'desc';

export default function CoursesTable({ courses }: CoursesTableProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const toggleSort = () => {
    setSortOrder((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const sortedCourses = useMemo(() => {
    if (sortOrder === 'none') return courses;

    return [...courses].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fees - b.fees;
      } else {
        return b.fees - a.fees;
      }
    });
  }, [courses, sortOrder]);

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
        <BookOpen className="h-8 w-8 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses listed</h3>
        <p className="mt-1 text-sm text-gray-500">
          No courses have been added for this college yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3.5">
                Duration
              </th>
              <th scope="col" className="px-6 py-3.5">
                <button
                  type="button"
                  onClick={toggleSort}
                  className="group inline-flex items-center gap-1 hover:text-gray-900"
                >
                  Annual Fees
                  <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3.5">
                Seats
              </th>
              <th scope="col" className="px-6 py-3.5">
                Eligibility
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedCourses.map((course, idx) => (
              <tr
                key={course.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {course.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {course.duration} {course.duration > 1 ? 'years' : 'year'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                  {formatFees(course.fees)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {course.seats ? course.seats.toLocaleString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {course.eligibility || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
