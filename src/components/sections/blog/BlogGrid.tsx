"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RandomizedTextEffect } from "@/components/ui/text-randomized";
import { motion } from "framer-motion";
import { FileWarning, Loader2 } from "lucide-react";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: any[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onLike: (postId: string) => void;
  onShare: (post: any) => void;
  onComment: (postId: string) => void;
}

export default function BlogGrid({
  posts,
  loading,
  error,
  onRetry,
  onLike,
  onShare,
  onComment,
}: BlogGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-[var(--card-background)] border-[var(--card-border-color)] overflow-hidden">
              {/* Cover Image Skeleton */}
              <div className="h-48 bg-[var(--card-hover)] animate-pulse" />
              
              <CardContent className="p-6">
                {/* Meta Info Skeleton */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-4 w-20 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-16 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-12 bg-[var(--card-hover)] rounded animate-pulse" />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2 mb-3">
                  <div className="h-6 w-3/4 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-6 w-1/2 bg-[var(--card-hover)] rounded animate-pulse" />
                </div>

                {/* Excerpt Skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-[var(--card-hover)] rounded animate-pulse" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-[var(--card-hover)] rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-[var(--card-hover)] rounded-full animate-pulse" />
                  <div className="h-6 w-14 bg-[var(--card-hover)] rounded-full animate-pulse" />
                </div>

                {/* Stats Skeleton */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-4 w-16 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-12 bg-[var(--card-hover)] rounded animate-pulse" />
                  <div className="h-4 w-14 bg-[var(--card-hover)] rounded animate-pulse" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-[var(--card-hover)] rounded animate-pulse" />
                    <div className="h-8 w-20 bg-[var(--card-hover)] rounded animate-pulse" />
                    <div className="h-8 w-12 bg-[var(--card-hover)] rounded animate-pulse" />
                  </div>
                  <div className="h-8 w-24 bg-[var(--card-hover)] rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="w-full max-w-md bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileWarning className="h-8 w-8 text-red-500" />
              <RandomizedTextEffect
                className="text-[var(--paragraph)] text-lg font-medium"
                text="Failed to load posts"
              />
            </div>
            <p className="text-[var(--paragraph)] mb-6">
              We couldn't load the blog posts. Please try again.
            </p>
            <Button onClick={onRetry} className="gap-2">
              <Loader2 className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="w-full max-w-md bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-[var(--headline)] mb-2">
              No posts found
            </h3>
            <p className="text-[var(--paragraph)]">
              Try adjusting your search or filter criteria.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BlogCard
            post={post}
            onLike={onLike}
            onShare={onShare}
            onComment={onComment}
          />
        </motion.div>
      ))}
    </div>
  );
}
