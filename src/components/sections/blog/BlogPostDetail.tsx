"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Eye,
    Heart,
    Share2,
    User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPostDetailProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    tags: string[];
    author: string | null;
    publishedAt: Date | null;
    readTime: number | null;
    views: number;
    likes: number;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localViews, setLocalViews] = useState(post.views);

  // Track view on mount
  useEffect(() => {
    const trackView = async () => {
      try {
        const response = await fetch(`/api/blogs/${post.id}/view`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setLocalViews(data.views);
        } else {
          console.error("Failed to track view");
        }
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    // Only track view once per session
    const hasTracked = sessionStorage.getItem(`viewed-${post.id}`);
    if (!hasTracked) {
      trackView();
      sessionStorage.setItem(`viewed-${post.id}`, 'true');
    }
  }, [post.id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blogs/${post.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: isLiked ? "unlike" : "like" }),
      });

      if (response.ok) {
        const data = await response.json();
        setLocalLikes(data.likes);
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt || post.content.substring(0, 100) + "...",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Handle AbortError (user cancelled) silently
        if (error instanceof Error && error.name === 'AbortError') {
          // User cancelled the share dialog - do nothing
          return;
        }
        // Log other errors but don't show them to user
        console.error("Share error:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could show a toast notification here
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  const formatDate = (date?: Date | null) => {
    if (!date) return "Recently";
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = () => {
    if (post.readTime) return `${post.readTime} min read`;
    const wordsPerMinute = 200;
    const wordCount = post.content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-[var(--link-color)] hover:text-[var(--link-color)]/80 hover:underline transition-all duration-200 cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Posts
        </Link>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-8">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {post.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-[var(--link-color)] text-white">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--headline)] mb-4 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-[var(--paragraph)] mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--paragraph)] mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{getReadTime()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{localViews.toLocaleString()} views</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              isLiked
                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                : "bg-[var(--card-background)] text-[var(--paragraph)] border border-[var(--card-border-color)] hover:bg-[var(--card-hover)] hover:border-[var(--link-color)]/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={false}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span>{localLikes} likes</span>
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[var(--card-background)] text-[var(--paragraph)] border border-[var(--card-border-color)] hover:bg-[var(--card-hover)] hover:border-[var(--link-color)]/30 transition-all duration-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={false}
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </motion.button>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-[var(--paragraph)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--paragraph)]">
            Published on {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--paragraph)]">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{localViews.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{localLikes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
