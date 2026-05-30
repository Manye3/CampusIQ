import { prisma } from '@/lib/prisma';
import CollegeCard from '@/components/ui/CollegeCard';
import { Building2, MapPin, BookOpen, Users, Search, GitCompareArrows, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { College } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Query top 6 colleges directly on the server for optimal performance and SEO
  const topCollegesRaw = await prisma.college.findMany({
    orderBy: {
      rating: 'desc',
    },
    take: 6,
  });

  const featuredColleges: College[] = topCollegesRaw.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString() as any,
    updatedAt: c.updatedAt.toISOString() as any,
    type: c.type as College['type'],
  }));

  return (
    <div className="bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-indigo-50/20 to-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
            India's Leading College Hub
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-heading">
            Find Your Perfect <span className="text-indigo-600">College</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            Search, compare, and shortlist from top colleges and universities across India. Explore courses, packages, placements, reviews and more.
          </p>

          {/* Native HTML5 GET Search Bar */}
          <div className="mx-auto mt-10 max-w-2xl px-4">
            <form action="/colleges" method="GET" className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                required
                placeholder="Search colleges by name, city, or state..."
                className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-28 text-sm shadow-md placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
            >
              Explore Colleges
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Compare Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">40+</p>
              <p className="text-xs text-gray-500">Top Colleges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">15+</p>
              <p className="text-xs text-gray-500">States Covered</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">100+</p>
              <p className="text-xs text-gray-500">Course Choices</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">10,000+</p>
              <p className="text-xs text-gray-500">Student Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-heading">
              Top Rated Colleges
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore leading institutions in India based on actual ratings and packages.
            </p>
          </div>
          <Link
            href="/colleges"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-heading">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            A comprehensive, simple workflow to make your career discovery smooth and secure.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">1. Search</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Quickly find universities matching your preferred locations, tuition budgets, types, and courses.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <GitCompareArrows className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">2. Compare</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Select and compare up to 3 colleges side-by-side to view detailed parameter matches easily.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">3. Shortlist</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Shortlist and save your favorite selections dynamically inside your protected account profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
