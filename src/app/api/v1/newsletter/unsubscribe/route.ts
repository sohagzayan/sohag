import {
    errorResponse,
    successResponse,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// POST /api/v1/newsletter/unsubscribe - Unsubscribe from newsletter
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) {
      return validationError('Email is required');
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email: body.email },
    });

    if (!subscriber) {
      return errorResponse('Not found', 404, 'Email not found in newsletter list');
    }

    if (!subscriber.subscribed) {
      return errorResponse(
        'Already unsubscribed',
        400,
        'This email is already unsubscribed'
      );
    }

    await prisma.newsletter.update({
      where: { email: body.email },
      data: { subscribed: false },
    });

    return successResponse(null, 'Successfully unsubscribed from newsletter');
  } catch (error: any) {
    console.error('Error unsubscribing from newsletter:', error);
    return errorResponse('Failed to unsubscribe', 500, error.message);
  }
}

