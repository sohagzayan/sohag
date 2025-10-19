import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// POST /api/blogs/[id]/like - Like/unlike a blog post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await request.json(); // "like" or "unlike"

    if (!action || !["like", "unlike"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'like' or 'unlike'" },
        { status: 400 }
      );
    }

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, likes: true },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Update likes count
    const newLikes = action === "like" ? blog.likes + 1 : Math.max(0, blog.likes - 1);

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { likes: newLikes },
      select: { id: true, likes: true },
    });

    return NextResponse.json({
      success: true,
      likes: updatedBlog.likes,
      action,
    });
  } catch (error) {
    console.error("Error updating blog likes:", error);
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}
