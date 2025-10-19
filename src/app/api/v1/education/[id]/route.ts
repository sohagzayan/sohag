import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/education/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const education = await prisma.education.findUnique({
      where: { id: id },
    });

    if (!education) {
      return notFoundError('Education entry');
    }

    return successResponse(education);
  } catch (error: any) {
    console.error('Error fetching education:', error);
    return errorResponse('Failed to fetch education entry', 500, error.message);
  }
}

// PUT /api/v1/education/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const education = await prisma.education.update({
      where: { id: id },
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        description: body.description,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current,
        location: body.location,
        logo: body.logo,
        grade: body.grade,
        order: body.order,
      },
    });

    return successResponse(education, 'Education entry updated successfully');
  } catch (error: any) {
    console.error('Error updating education:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Education entry');
    }
    
    return errorResponse('Failed to update education entry', 500, error.message);
  }
}

// DELETE /api/v1/education/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.education.delete({
      where: { id: id },
    });

    return successResponse(null, 'Education entry deleted successfully');
  } catch (error: any) {
    console.error('Error deleting education:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Education entry');
    }
    
    return errorResponse('Failed to delete education entry', 500, error.message);
  }
}

