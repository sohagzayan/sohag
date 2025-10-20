import BlogPostDetail from "@/components/sections/blog/BlogPostDetail";
import RelatedPosts from "@/components/sections/blog/RelatedPosts";
import { PrismaClient } from "@/generated/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({
    where: { slug, published: true },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      author: true,
      publishedAt: true,
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || `Read ${post.title} by ${post.author || "Anonymous"}`,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author || "Anonymous"}`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author ? [post.author] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author || "Anonymous"}`,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    const post = await prisma.blog.findUnique({
      where: { slug, published: true },
    });

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogPostDetail post={post} />
          </div>
          
          {/* Related Posts */}
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedPosts currentPostId={post.id} limit={4} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}
