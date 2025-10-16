"use client";

import { fallbackExperiences, fallbackProjects, fallbackSkills } from "@/data/fallback-data";
import { useEffect, useState } from "react";

// Instant loading hook - shows fallback data immediately, updates with real data in background
export function useInstantProjects() {
  const [data, setData] = useState(fallbackProjects);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRealData = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch('/api/v1/projects');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error('Invalid response format');
      }

      // Transform and update with real data
      const realProjects = result.data.map((dbProject: any) => ({
        id: dbProject.id,
        title: dbProject.title,
        description: dbProject.description,
        type: getProjectType(dbProject.tags),
        website: parseLink(dbProject.link).website,
        github: parseLink(dbProject.link).github,
        technologies: dbProject.tags || [],
        status: "Published",
        featured: dbProject.featured,
        created: new Date(dbProject.createdAt).toLocaleDateString(),
        updated: new Date(dbProject.updatedAt).toLocaleDateString(),
        logoFileName: getLogoFileName(dbProject.title),
        screenshotUrl: dbProject.image || undefined,
        gradient: getGradient(dbProject.title),
        stats: { views: 0, likes: 0, feedbacks: 0 },
        highlights: []
      }));

      setData(realProjects);
    } catch (err) {
      console.warn('Failed to fetch real projects data, using fallback:', err);
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // Fetch real data in background after a short delay
    const timer = setTimeout(fetchRealData, 100);
    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    fetchRealData();
  };

  return {
    data,
    loading: false, // Never show loading - always have data
    isUpdating, // Indicates if background update is happening
    error,
    refetch,
  };
}

export function useInstantExperiences() {
  const [data, setData] = useState(fallbackExperiences);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRealData = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch('/api/v1/experiences');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error('Invalid response format');
      }

      setData(result.data);
    } catch (err) {
      console.warn('Failed to fetch real experiences data, using fallback:', err);
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchRealData, 100);
    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    fetchRealData();
  };

  return {
    data,
    loading: false,
    isUpdating,
    error,
    refetch,
  };
}

export function useInstantSkills() {
  const [data, setData] = useState(fallbackSkills);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRealData = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch('/api/v1/skills');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error('Invalid response format');
      }

      setData(result.data);
    } catch (err) {
      console.warn('Failed to fetch real skills data, using fallback:', err);
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchRealData, 100);
    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    fetchRealData();
  };

  return {
    data,
    loading: false,
    isUpdating,
    error,
    refetch,
  };
}

// Helper functions
function getProjectType(tags: string[]) {
  if (tags.some(tag => tag.toLowerCase().includes('saas'))) return "SaaS Platform";
  if (tags.some(tag => tag.toLowerCase().includes('mobile'))) return "Mobile App";
  if (tags.some(tag => tag.toLowerCase().includes('tool'))) return "Tool";
  if (tags.some(tag => tag.toLowerCase().includes('website'))) return "Website";
  return "Web Application";
}

function parseLink(link: string | null) {
  if (!link) return { website: "", github: undefined };
  
  if (link.includes('github.com')) {
    return { website: "", github: link };
  } else {
    return { website: link, github: undefined };
  }
}

function getGradient(title: string) {
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600", 
    "from-orange-500 to-red-600",
    "from-purple-500 to-pink-600",
    "from-indigo-500 to-blue-600",
    "from-yellow-500 to-orange-600",
  ];
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return gradients[Math.abs(hash) % gradients.length];
}

function getLogoFileName(title: string) {
  const logoMap: Record<string, string> = {
    "Samtax": "samtax.svg",
    "SFB": "sfb.svg", 
    "Gradients CSS": "gradientscss.png",
    "Barber Academy": "barber.svg",
    "NAJ Training Center": "ptit.png",
  };
  return logoMap[title] || "placeholder.svg";
}
