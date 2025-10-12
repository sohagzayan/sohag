import {
    calculatePaginationMeta,
    errorResponse,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/projects - Get all projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const featured = searchParams.get('featured') === 'true';
    const tag = searchParams.get('tag');

    // Build where clause
    const where: any = {};
    if (featured !== undefined && searchParams.has('featured')) {
      where.featured = featured;
    }
    if (tag) {
      where.tags = { has: tag };
    }

    // Get projects with pagination
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.project.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(projects, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return errorResponse('Failed to fetch projects', 500, error.message);
  }
}

// POST /api/v1/projects - Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['title', 'description']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        link: body.link,
        tags: body.tags || [],
        featured: body.featured || false,
        order: body.order || 0,
      },
    });

    return successResponse(project, 'Project created successfully');
  } catch (error: any) {
    console.error('Error creating project:', error);
    return errorResponse('Failed to create project', 500, error.message);
  }
}

