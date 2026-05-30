import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { College } from '@/types';

interface CompareStore {
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (collegeId: string) => void;
  clearAll: () => void;
  isSelected: (collegeId: string) => boolean;
}

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedColleges: [],
      addCollege: (college) =>
        set((state) => {
          if (state.selectedColleges.length >= 3) return state;
          if (state.selectedColleges.some((c) => c.id === college.id)) return state;
          return { selectedColleges: [...state.selectedColleges, college] };
        }),
      removeCollege: (collegeId) =>
        set((state) => ({
          selectedColleges: state.selectedColleges.filter((c) => c.id !== collegeId),
        })),
      clearAll: () => set({ selectedColleges: [] }),
      isSelected: (collegeId) =>
        get().selectedColleges.some((c) => c.id === collegeId),
    }),
    {
      name: 'campusiq-compare',
    }
  )
);
