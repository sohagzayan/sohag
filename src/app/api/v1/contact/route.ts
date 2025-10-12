import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/contact - Get all contact requests (admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (type) {
      where.type = type;
    }

    const [requests, total] = await Promise.all([
      prisma.contactRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactRequest.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(requests, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching contact requests:', error);
    return errorResponse('Failed to fetch contact requests', 500, error.message);
  }
}

// POST /api/v1/contact - Submit a contact request
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['name', 'email', 'message']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return validationError('Invalid email format');
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        type: body.type || 'general',
        status: 'pending',
        replied: false,
      },
    });

    return successResponse(
      contactRequest,
      'Thank you for your message! I will get back to you soon.'
    );
  } catch (error: any) {
    console.error('Error creating contact request:', error);
    return errorResponse('Failed to send message', 500, error.message);
  }
}

