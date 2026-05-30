export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  savedColleges?: SavedCollege[];
}

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: "Government" | "Private" | "Deemed";
  fees: number;
  rating: number;
  imageUrl: string | null;
  established: number | null;
  description: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
  courses?: Course[];
  placements?: Placement[];
  reviews?: Review[];
  savedBy?: SavedCollege[];
  _count?: {
    savedBy: number;
  };
}

export interface Course {
  id: string;
  collegeId: string;
  name: string;
  duration: number;
  fees: number;
  seats: number | null;
  eligibility: string | null;
}

export interface Placement {
  id: string;
  collegeId: string;
  year: number;
  avgPackage: number;
  highestPackage: number;
  placementPercent: number;
  topRecruiters: string;
}

export interface Review {
  id: string;
  collegeId: string;
  authorName: string;
  rating: number;
  content: string;
  pros: string | null;
  cons: string | null;
  createdAt: Date;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  savedAt: Date;
  user?: User;
  college?: College;
}

export interface CollegeListResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CollegeFilters {
  search?: string;
  state?: string;
  type?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  sortBy?: "fees_asc" | "fees_desc" | "rating_desc" | "name_asc";
  page?: number;
  limit?: number;
}
