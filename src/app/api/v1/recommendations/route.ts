import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/recommendations - Get all recommendations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);

    // Get recommendations with pagination
    const [recommendations, total] = await Promise.all([
      prisma.recommendation.findMany({
        skip,
        take: limit,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.recommendation.count(),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(recommendations, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching recommendations:', error);
    return errorResponse('Failed to fetch recommendations', 500, error.message);
  }
}

// POST /api/v1/recommendations - Create a new recommendation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['name', 'position', 'text']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        name: body.name,
        position: body.position,
        company: body.company,
        text: body.text,
        image: body.image,
        linkedin: body.linkedin,
        order: body.order || 0,
      },
    });

    return successResponse(recommendation, 'Recommendation created successfully');
  } catch (error: any) {
    console.error('Error creating recommendation:', error);
    return errorResponse('Failed to create recommendation', 500, error.message);
  }
}

