import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CollegeDetailTabs from './CollegeDetailTabs';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    id: string;
  };
}

async function getCollege(idOrSlug: string) {
  const college = await prisma.college.findFirst({
    where: {
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug },
      ],
    },
    include: {
      courses: true,
      placements: {
        orderBy: { year: 'desc' },
        take: 2,
      },
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: {
        select: { savedBy: true },
      },
    },
  });

  if (!college) return null;

  // Convert Date properties to ISO strings to avoid hydration errors
  return {
    ...college,
    createdAt: college.createdAt.toISOString() as any,
    updatedAt: college.updatedAt.toISOString() as any,
    reviews: college.reviews.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString() as any,
    })),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const college = await prisma.college.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id },
      ],
    },
  });

  if (!college) {
    return {
      title: 'College Not Found — CampusIQ',
    };
  }

  return {
    title: `${college.name} — Admission, Fees, Placements | CampusIQ`,
    description: college.description || `Explore admission, courses, fees, packages, placement statistics, and reviews for ${college.name}.`,
  };
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const college = await getCollege(params.id);

  if (!college) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CollegeDetailTabs college={college as any} />
    </div>
  );
}
