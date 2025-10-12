import { ApiError, ApiResponse, PaginationMeta } from '@/types/api';
import { NextResponse } from 'next/server';

/**
 * Create a success API response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: PaginationMeta
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
    meta,
  });
}

/**
 * Create an error API response
 */
export function errorResponse(
  error: string,
  statusCode: number = 500,
  message?: string
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
      statusCode,
    },
    { status: statusCode }
  );
}

/**
 * Create a validation error response
 */
export function validationError(message: string): NextResponse<ApiError> {
  return errorResponse('Validation Error', 400, message);
}

/**
 * Create a not found error response
 */
export function notFoundError(resource: string = 'Resource'): NextResponse<ApiError> {
  return errorResponse('Not Found', 404, `${resource} not found`);
}

/**
 * Create an unauthorized error response
 */
export function unauthorizedError(message?: string): NextResponse<ApiError> {
  return errorResponse('Unauthorized', 401, message || 'Authentication required');
}

/**
 * Parse pagination parameters from URL search params
 */
export function parsePaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const skip = (page - 1) * limit;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

  return { page, limit, skip, sortBy, sortOrder };
}

/**
 * Calculate pagination metadata
 */
export function calculatePaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  const hasMore = page < totalPages;

  return {
    total,
    page,
    limit,
    totalPages,
    hasMore,
  };
}

/**
 * Parse filter parameters
 */
export function parseFilters(searchParams: URLSearchParams) {
  return {
    search: searchParams.get('search') || undefined,
    featured: searchParams.get('featured') === 'true' ? true : undefined,
    published: searchParams.get('published') === 'true' ? true : undefined,
    category: searchParams.get('category') || undefined,
    tag: searchParams.get('tag') || undefined,
  };
}

/**
 * Handle async route with error catching
 */
export async function handleRoute<T>(
  handler: () => Promise<T>
): Promise<NextResponse<ApiResponse<T>> | NextResponse<ApiError>> {
  try {
    const result = await handler();
    return successResponse(result);
  } catch (error: any) {
    console.error('API Route Error:', error);
    return errorResponse(
      'Internal Server Error',
      500,
      error.message || 'An unexpected error occurred'
    );
  }
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
  data: Record<string, any>,
  fields: string[]
): string[] {
  const missing: string[] = [];
  
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missing.push(field);
    }
  }
  
  return missing;
}

/**
 * Sanitize object by removing undefined values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate read time (words per minute)
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

