import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/contact/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id: params.id },
    });

    if (!contactRequest) {
      return notFoundError('Contact request');
    }

    return successResponse(contactRequest);
  } catch (error: any) {
    console.error('Error fetching contact request:', error);
    return errorResponse('Failed to fetch contact request', 500, error.message);
  }
}

// PUT /api/v1/contact/[id] - Update contact request status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const contactRequest = await prisma.contactRequest.update({
      where: { id: params.id },
      data: {
        status: body.status,
        replied: body.replied,
        repliedAt: body.replied && !body.repliedAt ? new Date() : body.repliedAt,
      },
    });

    return successResponse(contactRequest, 'Contact request updated successfully');
  } catch (error: any) {
    console.error('Error updating contact request:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Contact request');
    }
    
    return errorResponse('Failed to update contact request', 500, error.message);
  }
}

// DELETE /api/v1/contact/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactRequest.delete({
      where: { id: params.id },
    });

    return successResponse(null, 'Contact request deleted successfully');
  } catch (error: any) {
    console.error('Error deleting contact request:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Contact request');
    }
    
    return errorResponse('Failed to delete contact request', 500, error.message);
  }
}

