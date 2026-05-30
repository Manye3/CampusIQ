import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: {
          select: {
            name: true,
            location: true,
            fees: true,
            rating: true,
            slug: true,
            type: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ savedColleges });
  } catch (error) {
    console.error('Failed to fetch saved colleges:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json(
        { message: 'Missing required field: collegeId' },
        { status: 400 }
      );
    }

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'College already saved' },
        { status: 409 }
      );
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
    });

    return NextResponse.json(savedCollege, { status: 201 });
  } catch (error) {
    console.error('Failed to save college:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json(
        { message: 'Missing required field: collegeId' },
        { status: 400 }
      );
    }

    const result = await prisma.savedCollege.deleteMany({
      where: {
        userId: session.user.id,
        collegeId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: 'Saved college not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'College unsaved successfully' });
  } catch (error) {
    console.error('Failed to unsave college:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
