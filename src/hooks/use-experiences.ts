"use client";

import { useCallback, useEffect, useState } from "react";

interface DatabaseExperience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  logo: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Experience {
  _id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements?: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseExperiencesOptions {
  current?: boolean;
  limit?: number;
}

interface UseExperiencesReturn {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Transform database experience to UI format
function transformDatabaseToExperience(dbExperience: DatabaseExperience): Experience {
  return {
    _id: dbExperience.id,
    title: dbExperience.position,
    company: dbExperience.company,
    location: dbExperience.location,
    startDate: dbExperience.startDate,
    endDate: dbExperience.endDate || undefined,
    current: dbExperience.current,
    description: dbExperience.description,
    skills: [], // Skills would need to be added to database schema or handled separately
    achievements: [], // Achievements would need to be added to database schema or handled separately
    createdAt: dbExperience.createdAt,
    updatedAt: dbExperience.updatedAt,
  };
}

export function useExperiences(
  options: UseExperiencesOptions = {}
): UseExperiencesReturn {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (options.current !== undefined) {
        params.append('current', options.current.toString());
      }
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await fetch(`/api/v1/experiences?${params.toString()}`, {
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
        const transformedExperiences = data.data.map(transformDatabaseToExperience);
        setExperiences(transformedExperiences);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error loading experiences:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [options.current, options.limit]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
}

// Helper hook for current experience only
export function useCurrentExperience(): UseExperiencesReturn {
  return useExperiences({ current: true, limit: 1 });
}

// Helper hook for all experiences with limit
export function useExperiencesWithLimit(limit: number): UseExperiencesReturn {
  return useExperiences({ limit });
}
