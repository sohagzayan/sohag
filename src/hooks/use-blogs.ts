"use client";

import { useCallback, useEffect, useState } from "react";

interface BlogPost {
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
  createdAt: string;
}

interface BlogFilters {
  category?: string;
  search?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
}

interface UseBlogsReturn {
  blogs: BlogPost[];
  loading: boolean;
  error: boolean;
  total: number;
  hasMore: boolean;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  viewPost: (postId: string) => Promise<void>;
}

export function useBlogs(filters: BlogFilters = {}): UseBlogsReturn {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchBlogs = useCallback(async (reset = true) => {
    try {
      setLoading(true);
      setError(false);

      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      params.append("limit", String(filters.limit || 10));
      params.append("offset", String(reset ? 0 : blogs.length));

      const response = await fetch(`/api/blogs?${params}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      
      if (reset) {
        setBlogs(data.blogs);
      } else {
        setBlogs(prev => [...prev, ...data.blogs]);
      }
      
      setTotal(data.pagination.total);
      setHasMore(data.pagination.hasMore);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filters, blogs.length]);

  const refetch = useCallback(() => fetchBlogs(true), [fetchBlogs]);
  const loadMore = useCallback(() => fetchBlogs(false), [fetchBlogs]);

  const likePost = useCallback(async (postId: string) => {
    try {
      const response = await fetch(`/api/blogs/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "like" }),
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(prev =>
          prev.map(blog =>
            blog.id === postId
              ? { ...blog, likes: data.likes }
              : blog
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }, []);

  const viewPost = useCallback(async (postId: string) => {
    try {
      await fetch(`/api/blogs/${postId}/view`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error recording view:", error);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(true);
  }, [filters.category, filters.search, filters.sortBy]);

  return {
    blogs,
    loading,
    error,
    total,
    hasMore,
    refetch,
    loadMore,
    likePost,
    viewPost,
  };
}

// Hook for fetching related posts
export function useRelatedPosts(postId: string, limit = 3) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/api/blogs/${postId}/related?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch related posts");
        }

        const posts = await response.json();
        setRelatedPosts(posts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [postId, limit]);

  return {
    relatedPosts,
    loading,
    error,
  };
}
