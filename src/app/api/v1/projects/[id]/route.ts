import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/projects/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!project) {
      return notFoundError('Project');
    }

    return successResponse(project);
  } catch (error: any) {
    console.error('Error fetching project:', error);
    return errorResponse('Failed to fetch project', 500, error.message);
  }
}

// PUT /api/v1/projects/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const project = await prisma.project.update({
      where: { id: id },
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

    return successResponse(project, 'Project updated successfully');
  } catch (error: any) {
    console.error('Error updating project:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Project');
    }
    
    return errorResponse('Failed to update project', 500, error.message);
  }
}

// DELETE /api/v1/projects/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id: id },
    });

    return successResponse(null, 'Project deleted successfully');
  } catch (error: any) {
    console.error('Error deleting project:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Project');
    }
    
    return errorResponse('Failed to delete project', 500, error.message);
  }
}

