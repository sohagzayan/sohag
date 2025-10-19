"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    ExternalLink,
    Eye,
    Heart,
    MessageCircle,
    Share2,
    User
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    tags: string[];
    author?: string;
    publishedAt?: string;
    readTime?: number;
    views: number;
    likes: number;
    comments?: number;
    slug: string;
    featured?: boolean;
  };
  onLike?: (postId: string) => void;
  onShare?: (post: any) => void;
  onComment?: (postId: string) => void;
}

export default function BlogCard({ 
  post, 
  onLike, 
  onShare, 
  onComment 
}: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);

  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
    setIsLiked(!isLiked);
    setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (onShare) {
      onShare(post);
    } else {
      // Default share functionality
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            text: post.excerpt || post.content?.substring(0, 100) + "...",
            url: `${window.location.origin}/posts/${post.slug}`,
          });
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
          await navigator.clipboard.writeText(`${window.location.origin}/posts/${post.slug}`);
          // You could show a toast notification here
        } catch (error) {
          console.error("Clipboard error:", error);
        }
      }
    }
  };

  const handleComment = () => {
    if (onComment) {
      onComment(post.id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = () => {
    if (post.readTime) return `${post.readTime} min read`;
    if (post.content) {
      const wordsPerMinute = 200;
      const wordCount = post.content.split(' ').length;
      const readTime = Math.ceil(wordCount / wordsPerMinute);
      return `${readTime} min read`;
    }
    return "5 min read";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full bg-[var(--card-background)] border-[var(--card-border-color)] overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-[var(--link-color)] text-white">
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <CardContent className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-[var(--paragraph)] mb-3">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{getReadTime()}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[var(--headline)] mb-3 group-hover:text-[var(--link-color)] transition-colors duration-200 line-clamp-2">
            <Link href={`/posts/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {(post.excerpt || post.content) && (
            <p className="text-[var(--paragraph)] mb-4 line-clamp-3">
              {post.excerpt || post.content?.substring(0, 150) + "..."}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-[var(--paragraph)] mb-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{localLikes.toLocaleString()} likes</span>
            </div>
            {post.comments !== undefined && (
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments} comments</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-[var(--card-background)] text-[var(--paragraph)] border border-[var(--card-border-color)] hover:bg-[var(--card-hover)]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{localLikes}</span>
              </motion.button>

              <motion.button
                onClick={handleComment}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--card-background)] text-[var(--paragraph)] border border-[var(--card-border-color)] hover:bg-[var(--card-hover)] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments || 0}</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--card-background)] text-[var(--paragraph)] border border-[var(--card-border-color)] hover:bg-[var(--card-hover)] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Read More Button */}
            <Link href={`/posts/${post.slug}`}>
              <Button
                variant="outline"
                size="sm"
                className="group/btn flex items-center gap-2"
              >
                <span>Read More</span>
                <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
