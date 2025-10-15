import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/projects/[id] - Get a single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch project',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        link: body.link,
        tags: body.tags,
        featured: body.featured,
        order: body.order,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update project',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete project',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

