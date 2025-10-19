import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/blogs - Get all published blogs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "newest";
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build where clause
    const where: any = {
      published: true,
    };

    if (category && category !== "all") {
      where.tags = {
        has: category,
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    // Build orderBy clause
    let orderBy: any = {};
    switch (sortBy) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "popular":
        orderBy = { views: "desc" };
        break;
      case "likes":
        orderBy = { likes: "desc" };
        break;
      case "views":
        orderBy = { views: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        author: true,
        publishedAt: true,
        readTime: true,
        views: true,
        likes: true,
        featured: true,
        createdAt: true,
      },
    });

    const total = await prisma.blog.count({ where });

    return NextResponse.json({
      blogs,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      author,
      readTime,
      featured = false,
      published = false,
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags: tags || [],
        author,
        readTime,
        featured,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
