import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Example API route demonstrating various Prisma operations
 * 
 * This file shows common database patterns and best practices
 * for working with Prisma and MongoDB in Next.js
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const example = searchParams.get('example');

  try {
    let result;

    switch (example) {
      case 'create-project':
        // Example: Create a new project
        result = await prisma.project.create({
          data: {
            title: 'Example Project',
            description: 'This is an example project created via API',
            tags: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB'],
            featured: true,
            order: 1,
          },
        });
        break;

      case 'bulk-create':
        // Example: Create multiple records at once
        result = await prisma.project.createMany({
          data: [
            {
              title: 'Project 1',
              description: 'First project',
              tags: ['React'],
              order: 1,
            },
            {
              title: 'Project 2',
              description: 'Second project',
              tags: ['Vue'],
              order: 2,
            },
          ],
        });
        break;

      case 'filter-search':
        // Example: Advanced filtering
        result = await prisma.project.findMany({
          where: {
            AND: [
              { featured: true },
              { tags: { hasSome: ['Next.js', 'React'] } },
            ],
          },
          select: {
            id: true,
            title: true,
            tags: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        });
        break;

      case 'aggregation':
        // Example: Count and grouping
        const [total, featured, byTag] = await Promise.all([
          prisma.project.count(),
          prisma.project.count({ where: { featured: true } }),
          prisma.project.findMany({
            select: { tags: true },
          }),
        ]);

        // Count unique tags
        const allTags = byTag.flatMap(p => p.tags);
        const uniqueTags = [...new Set(allTags)];
        const tagCounts = uniqueTags.map(tag => ({
          tag,
          count: allTags.filter(t => t === tag).length,
        }));

        result = {
          totalProjects: total,
          featuredProjects: featured,
          tagStats: tagCounts.sort((a, b) => b.count - a.count),
        };
        break;

      case 'update-many':
        // Example: Bulk update
        result = await prisma.project.updateMany({
          where: { featured: false },
          data: { featured: true },
        });
        break;

      case 'upsert':
        // Example: Update if exists, create if not
        result = await prisma.content.upsert({
          where: { key: 'site_title' },
          update: { value: 'Sohag Zayan - Updated' },
          create: {
            key: 'site_title',
            value: 'Sohag Zayan',
            type: 'text',
          },
        });
        break;

      case 'transaction':
        // Example: Transaction (all or nothing)
        result = await prisma.$transaction([
          prisma.project.create({
            data: {
              title: 'Transaction Project 1',
              description: 'Part of transaction',
              tags: [],
            },
          }),
          prisma.project.create({
            data: {
              title: 'Transaction Project 2',
              description: 'Part of transaction',
              tags: [],
            },
          }),
        ]);
        break;

      case 'pagination':
        // Example: Cursor-based pagination
        const pageSize = 10;
        const cursor = searchParams.get('cursor');

        result = await prisma.project.findMany({
          take: pageSize,
          ...(cursor && {
            skip: 1,
            cursor: { id: cursor },
          }),
          orderBy: { createdAt: 'desc' },
        });

        const nextCursor = result.length === pageSize ? result[result.length - 1].id : null;

        return NextResponse.json({
          success: true,
          data: result,
          pagination: {
            nextCursor,
            hasMore: result.length === pageSize,
          },
        });

      case 'search':
        // Example: Text search (works with MongoDB)
        const query = searchParams.get('q') || '';
        result = await prisma.project.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
        });
        break;

      case 'clean':
        // Example: Delete all test data
        result = await prisma.project.deleteMany({
          where: {
            OR: [
              { title: { contains: 'Example' } },
              { title: { contains: 'Transaction' } },
            ],
          },
        });
        break;

      default:
        return NextResponse.json({
          success: true,
          message: 'Available examples',
          examples: [
            { name: 'create-project', description: 'Create a single project' },
            { name: 'bulk-create', description: 'Create multiple projects at once' },
            { name: 'filter-search', description: 'Advanced filtering with tags' },
            { name: 'aggregation', description: 'Count and group data' },
            { name: 'update-many', description: 'Bulk update records' },
            { name: 'upsert', description: 'Update or create' },
            { name: 'transaction', description: 'Atomic operations' },
            { name: 'pagination', description: 'Cursor-based pagination' },
            { name: 'search', description: 'Text search (add ?q=query)' },
            { name: 'clean', description: 'Delete test data' },
          ],
          usage: '/api/examples?example=create-project',
        });
    }

    return NextResponse.json({
      success: true,
      example,
      data: result,
    });
  } catch (error: any) {
    console.error(`Error in example '${example}':`, error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        example,
      },
      { status: 500 }
    );
  }
}

