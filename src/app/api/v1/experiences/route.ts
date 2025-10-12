import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/experiences - Get all experiences
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const current = searchParams.get('current') === 'true';

    // Build where clause
    const where: any = {};
    if (current !== undefined) {
      where.current = current;
    }

    // Get experiences with pagination
    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { current: 'desc' },
          { startDate: 'desc' },
        ],
      }),
      prisma.experience.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(experiences, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching experiences:', error);
    return errorResponse('Failed to fetch experiences', 500, error.message);
  }
}

// POST /api/v1/experiences - Create a new experience
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, [
      'company',
      'position',
      'description',
      'startDate',
    ]);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    const experience = await prisma.experience.create({
      data: {
        company: body.company,
        position: body.position,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        location: body.location,
        logo: body.logo,
        order: body.order || 0,
      },
    });

    return successResponse(experience, 'Experience created successfully');
  } catch (error: any) {
    console.error('Error creating experience:', error);
    return errorResponse('Failed to create experience', 500, error.message);
  }
}

