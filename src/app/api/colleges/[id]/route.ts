import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const college = await prisma.college.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
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

    if (!college) {
      return NextResponse.json(
        { message: 'College not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error('Failed to fetch college:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
