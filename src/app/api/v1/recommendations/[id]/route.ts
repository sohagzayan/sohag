import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/recommendations/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recommendation = await prisma.recommendation.findUnique({
      where: { id: params.id },
    });

    if (!recommendation) {
      return notFoundError('Recommendation');
    }

    return successResponse(recommendation);
  } catch (error: any) {
    console.error('Error fetching recommendation:', error);
    return errorResponse('Failed to fetch recommendation', 500, error.message);
  }
}

// PUT /api/v1/recommendations/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const recommendation = await prisma.recommendation.update({
      where: { id: params.id },
      data: {
        name: body.name,
        position: body.position,
        company: body.company,
        text: body.text,
        image: body.image,
        linkedin: body.linkedin,
        order: body.order,
      },
    });

    return successResponse(recommendation, 'Recommendation updated successfully');
  } catch (error: any) {
    console.error('Error updating recommendation:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Recommendation');
    }
    
    return errorResponse('Failed to update recommendation', 500, error.message);
  }
}

// DELETE /api/v1/recommendations/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.recommendation.delete({
      where: { id: params.id },
    });

    return successResponse(null, 'Recommendation deleted successfully');
  } catch (error: any) {
    console.error('Error deleting recommendation:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Recommendation');
    }
    
    return errorResponse('Failed to delete recommendation', 500, error.message);
  }
}

