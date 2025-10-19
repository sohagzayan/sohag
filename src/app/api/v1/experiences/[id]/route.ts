import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/experiences/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({
      where: { id: id },
    });

    if (!experience) {
      return notFoundError('Experience');
    }

    return successResponse(experience);
  } catch (error: any) {
    console.error('Error fetching experience:', error);
    return errorResponse('Failed to fetch experience', 500, error.message);
  }
}

// PUT /api/v1/experiences/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const experience = await prisma.experience.update({
      where: { id: id },
      data: {
        company: body.company,
        position: body.position,
        description: body.description,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current,
        location: body.location,
        logo: body.logo,
        order: body.order,
      },
    });

    return successResponse(experience, 'Experience updated successfully');
  } catch (error: any) {
    console.error('Error updating experience:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Experience');
    }
    
    return errorResponse('Failed to update experience', 500, error.message);
  }
}

// DELETE /api/v1/experiences/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.experience.delete({
      where: { id: id },
    });

    return successResponse(null, 'Experience deleted successfully');
  } catch (error: any) {
    console.error('Error deleting experience:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Experience');
    }
    
    return errorResponse('Failed to delete experience', 500, error.message);
  }
}

