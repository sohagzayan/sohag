import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/newsletter - Get all newsletter subscribers (admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const subscribed = searchParams.get('subscribed') === 'true';

    const where: any = {};
    if (searchParams.has('subscribed')) {
      where.subscribed = subscribed;
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsletter.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(subscribers, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching newsletter subscribers:', error);
    return errorResponse('Failed to fetch subscribers', 500, error.message);
  }
}

// POST /api/v1/newsletter - Subscribe to newsletter
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['email']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return validationError('Invalid email format');
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      if (existing.subscribed) {
        return errorResponse(
          'Already subscribed',
          400,
          'This email is already subscribed to the newsletter'
        );
      } else {
        // Resubscribe
        const updated = await prisma.newsletter.update({
          where: { email: body.email },
          data: {
            subscribed: true,
            name: body.name || existing.name,
            confirmedAt: new Date(),
          },
        });
        return successResponse(updated, 'Successfully resubscribed to newsletter!');
      }
    }

    const subscriber = await prisma.newsletter.create({
      data: {
        email: body.email,
        name: body.name,
        subscribed: true,
        confirmedAt: new Date(),
      },
    });

    return successResponse(
      subscriber,
      'Successfully subscribed to newsletter! Thank you!'
    );
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    return errorResponse('Failed to subscribe', 500, error.message);
  }
}

// DELETE /api/v1/newsletter/[email] - Unsubscribe (in a separate file)

