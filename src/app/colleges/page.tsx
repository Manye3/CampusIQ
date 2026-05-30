import { prisma } from '@/lib/prisma';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import Pagination from '@/components/ui/Pagination';
import CollegesGridClient from './CollegesGridClient';
import { Prisma } from '@prisma/client';
import type { College } from '@/types';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    search?: string;
    state?: string;
    type?: string;
    minFees?: string;
    maxFees?: string;
    minRating?: string;
    sortBy?: string;
    page?: string;
    limit?: string;
  };
}

export default async function CollegesPage({ searchParams }: PageProps) {
  const search = searchParams.search;
  const state = searchParams.state;
  const type = searchParams.type;
  const minFees = searchParams.minFees;
  const maxFees = searchParams.maxFees;
  const minRating = searchParams.minRating;
  const sortBy = searchParams.sortBy;
  const page = searchParams.page;
  const limit = searchParams.limit;

  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '12');
  const skip = (pageNum - 1) * limitNum;

  const where: Prisma.CollegeWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { state: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (state) {
    where.state = state;
  }

  if (type) {
    where.type = type;
  }

  if (minFees || maxFees) {
    where.fees = {};
    if (minFees) where.fees.gte = parseInt(minFees);
    if (maxFees) where.fees.lte = parseInt(maxFees);
  }

  if (minRating) {
    where.rating = { gte: parseFloat(minRating) };
  }

  let orderBy: Prisma.CollegeOrderByWithRelationInput = { rating: 'desc' };
  if (sortBy === 'fees_asc') {
    orderBy = { fees: 'asc' };
  } else if (sortBy === 'fees_desc') {
    orderBy = { fees: 'desc' };
  } else if (sortBy === 'rating_desc') {
    orderBy = { rating: 'desc' };
  } else if (sortBy === 'name_asc') {
    orderBy = { name: 'asc' };
  }

  let colleges: College[] = [];
  let total = 0;

  try {
    const [collegesRaw, totalCount] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.college.count({ where }),
    ]);

    colleges = collegesRaw.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString() as any,
      updatedAt: c.updatedAt.toISOString() as any,
      type: c.type as College['type'],
    }));
    total = totalCount;
  } catch (error) {
    console.warn('Database not yet configured. Displaying fallback colleges:', error);
    colleges = [
      {
        id: 'fallback-1',
        name: 'IIT Bombay',
        slug: 'iit-bombay',
        location: 'Mumbai, Maharashtra',
        city: 'Mumbai',
        state: 'Maharashtra',
        type: 'Government',
        fees: 200000,
        rating: 4.9,
        established: 1958,
        imageUrl: null,
        description: 'Indian Institute of Technology Bombay is a premier public technical and research university located in Powai, Mumbai.',
        website: 'https://www.iitb.ac.in',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      },
      {
        id: 'fallback-2',
        name: 'IIT Delhi',
        slug: 'iit-delhi',
        location: 'New Delhi, Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        type: 'Government',
        fees: 200000,
        rating: 4.8,
        established: 1961,
        imageUrl: null,
        description: 'Indian Institute of Technology Delhi is a public engineering and research institute located in Hauz Khas, New Delhi.',
        website: 'https://www.iitd.ac.in',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      },
      {
        id: 'fallback-3',
        name: 'IIT Madras',
        slug: 'iit-madras',
        location: 'Chennai, Tamil Nadu',
        city: 'Chennai',
        state: 'Tamil Nadu',
        type: 'Government',
        fees: 200000,
        rating: 4.9,
        established: 1959,
        imageUrl: null,
        description: 'Indian Institute of Technology Madras is a public engineering university located in Chennai, Tamil Nadu.',
        website: 'https://www.iitm.ac.in',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      },
      {
        id: 'fallback-4',
        name: 'BITS Pilani',
        slug: 'bits-pilani',
        location: 'Pilani, Rajasthan',
        city: 'Pilani',
        state: 'Rajasthan',
        type: 'Deemed',
        fees: 500000,
        rating: 4.6,
        established: 1964,
        imageUrl: null,
        description: 'Birla Institute of Technology and Science, Pilani is a highly regarded deemed university focused on engineering and sciences.',
        website: 'https://www.bits-pilani.ac.in',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      },
      {
        id: 'fallback-5',
        name: 'IIM Ahmedabad',
        slug: 'iim-ahmedabad',
        location: 'Ahmedabad, Gujarat',
        city: 'Ahmedabad',
        state: 'Gujarat',
        type: 'Government',
        fees: 2300000,
        rating: 4.9,
        established: 1961,
        imageUrl: null,
        description: 'Indian Institute of Management Ahmedabad is India’s premier business school, highly acclaimed globally for its MBA programs.',
        website: 'https://www.iima.ac.in',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      },
      {
        id: 'fallback-6',
        name: 'AIIMS Delhi',
        slug: 'aiims-delhi',
        location: 'New Delhi, Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        type: 'Government',
        fees: 6000,
        rating: 4.9,
        established: 1956,
        imageUrl: null,
        description: 'All India Institute of Medical Sciences Delhi is the top-ranking medical school and public hospital in India.',
        website: 'https://www.aiims.edu',
        createdAt: new Date().toISOString() as any,
        updatedAt: new Date().toISOString() as any,
      }
    ];
    total = colleges.length;
  }

  const totalPages = Math.ceil(total / limitNum);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Explore Colleges
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Find, compare, and shortlist from top institutions in India
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-64 lg:shrink-0">
          <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
            <FilterPanel />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <SearchBar />
          </div>

          <CollegesGridClient colleges={colleges} />

          <div className="mt-8 border-t border-gray-200 pt-6">
            <Pagination
              currentPage={pageNum}
              totalPages={totalPages}
              total={total}
              limit={limitNum}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
