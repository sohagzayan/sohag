import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/blogs/[id]/related - Get related blog posts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const limit = parseInt(new URL(request.url).searchParams.get("limit") || "3");

    // Get the current blog post
    const currentBlog = await prisma.blog.findUnique({
      where: { id },
      select: { tags: true, id: true },
    });

    if (!currentBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Find related posts based on shared tags
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        id: { not: id },
        published: true,
        tags: {
          hasSome: currentBlog.tags,
        },
      },
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
      },
      orderBy: [
        { featured: "desc" },
        { views: "desc" },
        { likes: "desc" },
        { publishedAt: "desc" },
      ],
      take: limit,
    });

    // If we don't have enough related posts, fill with recent posts
    if (relatedBlogs.length < limit) {
      const additionalBlogs = await prisma.blog.findMany({
        where: {
          id: { notIn: [id, ...relatedBlogs.map(blog => blog.id)] },
          published: true,
        },
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
        },
        orderBy: { publishedAt: "desc" },
        take: limit - relatedBlogs.length,
      });

      relatedBlogs.push(...additionalBlogs);
    }

    return NextResponse.json(relatedBlogs);
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch related blogs" },
      { status: 500 }
    );
  }
}
