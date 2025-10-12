import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/skills - Get all skills
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip, sortBy, sortOrder } = parsePaginationParams(searchParams);
    const category = searchParams.get('category');

    // Build where clause
    const where: any = {};
    if (category) {
      where.category = category;
    }

    // Get skills with pagination
    const [skills, total] = await Promise.all([
      prisma.skill.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.skill.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(skills, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    return errorResponse('Failed to fetch skills', 500, error.message);
  }
}

// POST /api/v1/skills - Create a new skill
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['name', 'category']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    // Check if skill already exists
    const existing = await prisma.skill.findUnique({
      where: { name: body.name },
    });

    if (existing) {
      return errorResponse(
        'Skill already exists',
        400,
        `A skill with name "${body.name}" already exists`
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category,
        level: body.level || 0,
        icon: body.icon,
        order: body.order || 0,
      },
    });

    return successResponse(skill, 'Skill created successfully');
  } catch (error: any) {
    console.error('Error creating skill:', error);
    return errorResponse('Failed to create skill', 500, error.message);
  }
}

