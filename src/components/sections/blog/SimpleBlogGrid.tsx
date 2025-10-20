"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  readTime: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export default function SimpleBlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/v1/blogs");
        const data = await response.json();
        
        if (data.success) {
          setPosts(data.data);
          setFilteredPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Simple Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--paragraph)]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[var(--card-border-color)] bg-[var(--card-background)] text-[var(--headline)] placeholder-[var(--paragraph)] focus:outline-none focus:border-[var(--link-color)] transition-colors"
          />
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <p className="text-center text-[var(--paragraph)]">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group blog-card bg-[var(--card-background)] border-[var(--card-border-color)] hover:border-[var(--link-color)]/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[var(--link-color)]/10">
            <CardContent className="p-0">
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span class="text-white text-2xl font-bold">${post.title.charAt(0)}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                )}
                {post.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[var(--link-color)] text-white">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-[var(--card-hover)] text-[var(--paragraph)]"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[var(--card-hover)] text-[var(--paragraph)]"
                    >
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[var(--headline)] mb-3 line-clamp-2 group-hover:text-[var(--link-color)] transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[var(--paragraph)] text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-[var(--paragraph)] mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[var(--link-color)] hover:text-[var(--link-color)]/80 font-medium text-sm transition-colors group/link cursor-pointer"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      </div>
    </div>
  );
}
