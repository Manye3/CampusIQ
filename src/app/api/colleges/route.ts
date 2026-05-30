import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const search = searchParams.get('search');
    const state = searchParams.get('state');
    const type = searchParams.get('type');
    const minFees = searchParams.get('minFees');
    const maxFees = searchParams.get('maxFees');
    const minRating = searchParams.get('minRating');
    const sortBy = searchParams.get('sortBy');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10)));

    const where: Record<string, unknown> = {};
    const conditions: Record<string, unknown>[] = [];

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (state) {
      conditions.push({ state });
    }

    if (type) {
      conditions.push({ type });
    }

    if (minFees) {
      conditions.push({ fees: { gte: parseFloat(minFees) } });
    }

    if (maxFees) {
      conditions.push({ fees: { lte: parseFloat(maxFees) } });
    }

    if (minRating) {
      conditions.push({ rating: { gte: parseFloat(minRating) } });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    let orderBy: Record<string, string>;

    switch (sortBy) {
      case 'fees_asc':
        orderBy = { fees: 'asc' };
        break;
      case 'fees_desc':
        orderBy = { fees: 'desc' };
        break;
      case 'rating_desc':
        orderBy = { rating: 'desc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      default:
        orderBy = { rating: 'desc' };
    }

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch colleges:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
