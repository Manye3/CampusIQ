import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const idsParam = request.nextUrl.searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json(
        { message: 'Missing required parameter: ids' },
        { status: 400 }
      );
    }

    const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean);

    if (ids.length < 2 || ids.length > 3) {
      return NextResponse.json(
        { message: 'You must compare 2 or 3 colleges' },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        courses: true,
        placements: {
          orderBy: { year: 'desc' },
          take: 2,
        },
        _count: {
          select: { savedBy: true },
        },
      },
    });

    return NextResponse.json({ colleges });
  } catch (error) {
    console.error('Failed to fetch colleges for comparison:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
