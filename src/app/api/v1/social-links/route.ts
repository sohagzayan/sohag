import {
    errorResponse,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/social-links - Get all social links
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const visibleOnly = searchParams.get('visible') === 'true';

    const where: any = {};
    if (visibleOnly) {
      where.visible = true;
    }

    const links = await prisma.socialLink.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return successResponse(links);
  } catch (error: any) {
    console.error('Error fetching social links:', error);
    return errorResponse('Failed to fetch social links', 500, error.message);
  }
}

// POST /api/v1/social-links - Create a new social link
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['name', 'platform', 'url']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    const link = await prisma.socialLink.create({
      data: {
        name: body.name,
        platform: body.platform,
        url: body.url,
        icon: body.icon,
        order: body.order || 0,
        visible: body.visible ?? true,
      },
    });

    return successResponse(link, 'Social link created successfully');
  } catch (error: any) {
    console.error('Error creating social link:', error);
    return errorResponse('Failed to create social link', 500, error.message);
  }
}

