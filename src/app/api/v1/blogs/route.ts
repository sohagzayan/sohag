import {
    calculatePaginationMeta,
    calculateReadTime,
    errorResponse,
    generateSlug,
    parsePaginationParams,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/blogs - Get all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const published = searchParams.get('published') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const tag = searchParams.get('tag');

    // Build where clause
    const where: any = {};
    if (searchParams.has('published')) {
      where.published = published;
    }
    if (searchParams.has('featured')) {
      where.featured = featured;
    }
    if (tag) {
      where.tags = { has: tag };
    }

    // Get blogs with pagination
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.blog.count({ where }),
    ]);

    const meta = calculatePaginationMeta(total, page, limit);

    return successResponse(blogs, undefined, meta);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return errorResponse('Failed to fetch blogs', 500, error.message);
  }
}

// POST /api/v1/blogs - Create a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['title', 'content']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.title);

    // Check if slug already exists
    const existing = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existing) {
      return errorResponse(
        'Blog post already exists',
        400,
        `A blog post with slug "${slug}" already exists`
      );
    }

    // Calculate read time
    const readTime = calculateReadTime(body.content);

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        tags: body.tags || [],
        published: body.published || false,
        featured: body.featured || false,
        readTime,
        author: body.author,
        publishedAt: body.published ? new Date() : null,
      },
    });

    return successResponse(blog, 'Blog post created successfully');
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return errorResponse('Failed to create blog post', 500, error.message);
  }
}

