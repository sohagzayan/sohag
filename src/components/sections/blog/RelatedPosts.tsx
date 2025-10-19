"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    Eye,
    Heart,
    Link as LinkIcon,
    User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  author?: string;
  publishedAt?: string;
  readTime?: number;
  views: number;
  likes: number;
  featured?: boolean;
}

interface RelatedPostsProps {
  currentPostId: string;
  limit?: number;
}

export default function RelatedPosts({ currentPostId, limit = 3 }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(`/api/blogs/${currentPostId}/related?limit=${limit}`);
        if (response.ok) {
          const posts = await response.json();
          setRelatedPosts(posts);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (currentPostId) {
      fetchRelatedPosts();
    }
  }, [currentPostId, limit]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (post: RelatedPost) => {
    if (post.readTime) return `${post.readTime} min read`;
    return "5 min read";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[var(--headline)]">Related Posts</h3>
        <div className="grid gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Card key={index} className="bg-[var(--card-background)] border-[var(--card-border-color)]">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[var(--card-hover)] rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-[var(--card-hover)] rounded animate-pulse" />
                    <div className="h-3 w-full bg-[var(--card-hover)] rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-[var(--card-hover)] rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedPosts.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[var(--headline)]">Related Posts</h3>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-[var(--paragraph)]">No related posts found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LinkIcon className="h-5 w-5 text-[var(--link-color)]" />
        <h3 className="text-xl font-bold text-[var(--headline)]">Related Posts</h3>
      </div>
      
      <div className="grid gap-4">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Cover Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--card-hover)] flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Featured Badge */}
                    {post.featured && (
                      <Badge className="mb-2 text-xs bg-[var(--link-color)] text-white">
                        Featured
                      </Badge>
                    )}

                    {/* Title */}
                    <h4 className="text-sm font-bold text-[var(--headline)] mb-2 line-clamp-2 group-hover:text-[var(--link-color)] transition-colors duration-200">
                      <Link href={`/posts/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h4>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-[var(--paragraph)] mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getReadTime(post)}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-[var(--paragraph)]">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Posts Link */}
      <div className="text-center pt-4">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm text-[var(--link-color)] hover:underline"
        >
          View all posts
          <LinkIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
