import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/education - Get all education entries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);

    const [education, total] = await Promise.all([
      prisma.education.findMany({
        skip,
        take: limit,
        orderBy: [
          { current: 'desc' },
          { startDate: 'desc' },
        ],
      }),
      prisma.education.count(),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(education, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching education:', error);
    return errorResponse('Failed to fetch education', 500, error.message);
  }
}

// POST /api/v1/education - Create a new education entry
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, [
      'institution',
      'degree',
      'startDate',
    ]);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    const education = await prisma.education.create({
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        location: body.location,
        logo: body.logo,
        grade: body.grade,
        order: body.order || 0,
      },
    });

    return successResponse(education, 'Education entry created successfully');
  } catch (error: any) {
    console.error('Error creating education:', error);
    return errorResponse('Failed to create education entry', 500, error.message);
  }
}

