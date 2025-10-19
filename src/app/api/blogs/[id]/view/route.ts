import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prismaResult = new PrismaClient();

// POST /api/blogs/[id]/view - Increment view count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if blog exists
    const blog = await prismaResult.blog.findUnique({
      where: { id },
      select: { id: true, views: true },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Increment view count
    const updatedBlog = await prismaResult.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
      select: { id: true, views: true },
    });

    return NextResponse.json({
      success: true,
      views: updatedBlog.views,
    });
  } catch (error) {
    console.error("Error updating blog views:", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 }
    );
  }
}
