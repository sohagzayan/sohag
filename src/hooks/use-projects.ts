"use client";

import { useCallback, useEffect, useState } from "react";

interface DatabaseProject {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  videoUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  technologies: string[];
  featured: boolean;
  status: "Draft" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
}

// Re-export Project type for convenience
export type { Project };

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseProjectsOptions {
  status?: "Draft" | "Published" | "Archived";
  featured?: boolean;
  projectType?: string;
  publishedOnly?: boolean;
}

// Transform database project to UI format
function transformDatabaseToProject(dbProject: DatabaseProject): Project {
  // Extract project type from tags or default to "Web Application"
  const getProjectType = (tags: string[]) => {
    if (tags.some(tag => tag.toLowerCase().includes('saas'))) return "SaaS Platform";
    if (tags.some(tag => tag.toLowerCase().includes('mobile'))) return "Mobile App";
    if (tags.some(tag => tag.toLowerCase().includes('tool'))) return "Tool";
    if (tags.some(tag => tag.toLowerCase().includes('website'))) return "Website";
    return "Web Application";
  };

  // Parse link to determine if it's website or github
  const parseLink = (link: string | null) => {
    if (!link) return { websiteUrl: undefined, githubUrl: undefined };
    
    if (link.includes('github.com')) {
      return { websiteUrl: undefined, githubUrl: link };
    } else {
      return { websiteUrl: link, githubUrl: undefined };
    }
  };

  const { websiteUrl, githubUrl } = parseLink(dbProject.link);

  return {
    _id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    projectType: getProjectType(dbProject.tags),
    images: dbProject.image ? [dbProject.image] : [],
    websiteUrl,
    githubUrl,
    technologies: dbProject.tags,
    featured: dbProject.featured,
    status: "Published", // Database projects are considered published by default
    createdAt: dbProject.createdAt,
    updatedAt: dbProject.updatedAt,
  };
}

export function useProjects(
  options: UseProjectsOptions = {}
): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (options.featured !== undefined) {
        params.append('featured', options.featured.toString());
      }
      if (options.projectType) {
        // Map projectType to tags since database uses tags
        params.append('tag', options.projectType);
      }

      const response = await fetch(`/api/v1/projects?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        let transformedProjects = data.data.map(transformDatabaseToProject);

        // Apply additional filters that aren't handled by the API
        if (options.status) {
          transformedProjects = transformedProjects.filter(
            (project: Project) => project.status === options.status
          );
        }

        if (options.publishedOnly !== false) {
          transformedProjects = transformedProjects.filter(
            (project: Project) => project.status === "Published"
          );
        }

        // Sort by order and creation date
        transformedProjects.sort((a: Project, b: Project) => {
          // First sort by order if available, then by creation date
          const orderA = (data.data.find((p: DatabaseProject) => p.id === a._id)?.order || 0);
          const orderB = (data.data.find((p: DatabaseProject) => p.id === b._id)?.order || 0);
          
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setProjects(transformedProjects);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error loading projects:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [
    options.status,
    options.featured,
    options.projectType,
    options.publishedOnly,
  ]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}

// Helper hook for featured projects only
export function useFeaturedProjects(): UseProjectsReturn {
  return useProjects({ featured: true, publishedOnly: true });
}

// Helper hook for projects by type
export function useProjectsByType(projectType: string): UseProjectsReturn {
  return useProjects({ projectType, publishedOnly: true });
}
