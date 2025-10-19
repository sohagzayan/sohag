import {
    calculateReadTime,
    errorResponse,
    notFoundError,
    successResponse,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/blogs/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return notFoundError('Blog post');
    }

    // Increment views
    await prisma.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return successResponse({ ...blog, views: blog.views + 1 });
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return errorResponse('Failed to fetch blog post', 500, error.message);
  }
}

// PUT /api/v1/blogs/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Recalculate read time if content changed
    const readTime = body.content ? calculateReadTime(body.content) : undefined;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        tags: body.tags,
        published: body.published,
        featured: body.featured,
        readTime,
        author: body.author,
        publishedAt: body.published && !body.publishedAt ? new Date() : body.publishedAt,
      },
    });

    return successResponse(blog, 'Blog post updated successfully');
  } catch (error: any) {
    console.error('Error updating blog:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Blog post');
    }
    
    return errorResponse('Failed to update blog post', 500, error.message);
  }
}

// DELETE /api/v1/blogs/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id },
    });

    return successResponse(null, 'Blog post deleted successfully');
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    
    if (error.code === 'P2025') {
      return notFoundError('Blog post');
    }
    
    return errorResponse('Failed to delete blog post', 500, error.message);
  }
}

