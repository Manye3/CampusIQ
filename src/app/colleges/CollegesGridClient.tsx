'use client';

import CollegeCard from '@/components/ui/CollegeCard';
import CompareBar from '@/components/ui/CompareBar';
import { useCompare } from '@/hooks/useCompare';
import type { College } from '@/types';

interface CollegesGridClientProps {
  colleges: College[];
}

export default function CollegesGridClient({ colleges }: CollegesGridClientProps) {
  const { selectedColleges, addCollege, removeCollege, isSelected } = useCompare();

  const handleCompareToggle = (college: College) => {
    if (isSelected(college.id)) {
      removeCollege(college.id);
    } else {
      addCollege(college);
    }
  };

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-900">No colleges found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search terms or filters to find what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onCompare={() => handleCompareToggle(college)}
            isInCompare={isSelected(college.id)}
          />
        ))}
      </div>
      <CompareBar />
    </>
  );
}
