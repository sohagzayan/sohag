import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/projects - Get all projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const projects = await prisma.project.findMany({
      where: featured ? { featured: featured === 'true' } : undefined,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Title and description are required',
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image || null,
        link: body.link || null,
        tags: body.tags || [],
        featured: body.featured || false,
        order: body.order || 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: project,
        message: 'Project created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create project',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

