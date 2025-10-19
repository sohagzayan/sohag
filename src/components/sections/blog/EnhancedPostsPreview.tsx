"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Filter,
    Grid3X3,
    List,
    RefreshCw,
    Search
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BlogGrid from "./BlogGrid";
import BlogSidebar from "./BlogSidebar";
import RelatedPosts from "./RelatedPosts";

interface BlogPost {
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
}

export default function EnhancedPostsPreview() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Filter and search states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Use Dev.to API directly for now
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch posts from Dev.to API
  useEffect(() => {
    const fetchPosts = async () => {
      const startTime = Date.now();
      const minLoadingTime = 1500;

      try {
        const response = await fetch("https://dev.to/api/articles?username=baraa");
        const data = await response.json();
        
        // Transform Dev.to posts to our BlogPost format
        const transformedPosts: BlogPost[] = data.map((post: any) => ({
          id: post.id.toString(),
          title: post.title,
          excerpt: post.description,
          content: post.body_markdown,
          coverImage: post.cover_image || post.social_image,
          tags: post.tag_list || [],
          author: post.user?.name || "Anonymous",
          publishedAt: post.published_at,
          readTime: post.reading_time_minutes,
          views: post.page_views_count || Math.floor(Math.random() * 1000),
          likes: post.public_reactions_count || Math.floor(Math.random() * 100),
          comments: post.comments_count || Math.floor(Math.random() * 20),
          slug: post.slug,
          featured: Math.random() > 0.7,
          createdAt: post.published_at,
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(true);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        setTimeout(() => setLoading(false), remainingTime);
      }
    };

    fetchPosts();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(false);
    // Refetch posts
    window.location.reload();
  };

  const likePost = async (postId: string) => {
    // TODO: Implement like functionality
    console.log("Liked post:", postId);
  };

  const viewPost = async (postId: string) => {
    // TODO: Implement view tracking
    console.log("Viewed post:", postId);
  };

  // Get unique categories from posts
  const categories = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags);
    return Array.from(new Set(allTags)).sort();
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => 
        post.tags.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime();
        case "oldest":
          return new Date(a.publishedAt || "").getTime() - new Date(b.publishedAt || "").getTime();
        case "popular":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const handleLike = (postId: string) => {
    // TODO: Implement like functionality with API
    console.log("Liked post:", postId);
  };

  const handleShare = (post: BlogPost) => {
    // TODO: Implement share functionality
    console.log("Sharing post:", post.title);
  };

  const handleComment = (postId: string) => {
    // TODO: Implement comment functionality
    console.log("Commenting on post:", postId);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-[var(--headline)]">
            Blog Posts
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredPosts.length} posts
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[var(--card-border-color)] rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        {showSidebar && (
          <div className="hidden lg:block">
            <BlogSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalPosts={posts.length}
            />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowSidebar(false)}>
            <div className="absolute left-0 top-0 h-full w-80 bg-[var(--background)] border-r border-[var(--border)] overflow-y-auto">
              <div className="p-4">
                <BlogSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalPosts={posts.length}
                />
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="flex-1">
          {/* Mobile Search */}
          <div className="lg:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--paragraph)]" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--headline)] placeholder:text-[var(--paragraph)] focus:outline-none focus:ring-2 focus:ring-[var(--link-color)]"
              />
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchQuery || sortBy !== "newest") && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-[var(--paragraph)]">Active filters:</span>
              
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="gap-1">
                  Sort: {sortBy}
                  <button
                    onClick={() => setSortBy("newest")}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setSortBy("newest");
                }}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Blog Grid */}
          <BlogGrid
            posts={filteredPosts}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onLike={handleLike}
            onShare={handleShare}
            onComment={handleComment}
          />

          {/* Related Posts Section */}
          {!loading && !error && posts.length > 0 && (
            <div className="mt-12">
              <RelatedPosts currentPostId={posts[0]?.id} limit={3} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
