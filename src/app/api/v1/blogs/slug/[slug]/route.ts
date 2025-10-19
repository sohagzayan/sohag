import {
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/blogs/slug/[slug] - Get blog by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return notFoundError('Blog post');
    }

    // Increment views
    await prisma.blog.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return successResponse({ ...blog, views: blog.views + 1 });
  } catch (error: any) {
    console.error('Error fetching blog by slug:', error);
    return errorResponse('Failed to fetch blog post', 500, error.message);
  }
}

