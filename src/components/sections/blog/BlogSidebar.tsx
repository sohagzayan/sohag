"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
    Calendar,
    Eye,
    Filter,
    Heart,
    Search,
    SortAsc,
    SortDesc,
    TrendingUp
} from "lucide-react";
import { useState } from "react";

interface BlogSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalPosts: number;
}

export default function BlogSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalPosts,
}: BlogSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const sortOptions = [
    { value: "newest", label: "Newest First", icon: SortDesc },
    { value: "oldest", label: "Oldest First", icon: SortAsc },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
    { value: "likes", label: "Most Liked", icon: Heart },
    { value: "views", label: "Most Viewed", icon: Eye },
  ];

  const filterOptions = [
    { value: "all", label: "All Posts", count: totalPosts },
    { value: "featured", label: "Featured", count: 0 },
    { value: "recent", label: "Recent (7 days)", count: 0 },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-80 space-y-6"
    >
      {/* Search Section */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--paragraph)]" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-[var(--card-background)] border-[var(--card-border-color)]"
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[var(--headline)] flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Sort by
          </Label>
        </div>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <motion.button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    sortBy === option.value
                      ? "bg-[var(--link-color)]/10 border border-[var(--link-color)]/20 text-[var(--link-color)]"
                      : "bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <Separator className="bg-[var(--border)]" />

      {/* Categories Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[var(--headline)] flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Categories
          </Label>
          <Badge variant="secondary" className="text-xs">
            {categories.length}
          </Badge>
        </div>
        
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {/* All Categories */}
            <motion.button
              onClick={() => onCategorySelect("all")}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-[var(--link-color)]/10 border border-[var(--link-color)]/20 text-[var(--link-color)]"
                  : "bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">All Posts</span>
              <Badge variant="outline" className="text-xs">
                {totalPosts}
              </Badge>
            </motion.button>

            {/* Individual Categories */}
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[var(--link-color)]/10 border border-[var(--link-color)]/20 text-[var(--link-color)]"
                    : "bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium capitalize">{category}</span>
                <Badge variant="outline" className="text-xs">
                  {Math.floor(Math.random() * 20) + 1}
                </Badge>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator className="bg-[var(--border)]" />

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[var(--headline)] flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Quick Filters
        </Label>
        <div className="space-y-2">
          {filterOptions.map((filter) => (
            <motion.button
              key={filter.value}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)] transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">{filter.label}</span>
              <Badge variant="outline" className="text-xs">
                {filter.count}
              </Badge>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 p-4 rounded-lg bg-[var(--card-background)] border border-[var(--card-border-color)]">
        <Label className="text-sm font-medium text-[var(--headline)]">
          Blog Stats
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--link-color)]">{totalPosts}</div>
            <div className="text-xs text-[var(--paragraph)]">Total Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--link-color)]">{categories.length}</div>
            <div className="text-xs text-[var(--paragraph)]">Categories</div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
