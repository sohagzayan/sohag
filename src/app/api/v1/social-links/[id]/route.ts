import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/social-links/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const link = await prisma.socialLink.findUnique({
      where: { id: id },
    });

    if (!link) {
      return notFoundError('Social link');
    }

    return successResponse(link);
  } catch (error: any) {
    console.error('Error fetching social link:', error);
    return errorResponse('Failed to fetch social link', 500, error.message);
  }
}

// PUT /api/v1/social-links/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const link = await prisma.socialLink.update({
      where: { id: id },
      data: {
        name: body.name,
        platform: body.platform,
        url: body.url,
        icon: body.icon,
        order: body.order,
        visible: body.visible,
      },
    });

    return successResponse(link, 'Social link updated successfully');
  } catch (error: any) {
    console.error('Error updating social link:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Social link');
    }
    
    return errorResponse('Failed to update social link', 500, error.message);
  }
}

// DELETE /api/v1/social-links/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.socialLink.delete({
      where: { id: id },
    });

    return successResponse(null, 'Social link deleted successfully');
  } catch (error: any) {
    console.error('Error deleting social link:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Social link');
    }
    
    return errorResponse('Failed to delete social link', 500, error.message);
  }
}

