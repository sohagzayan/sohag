"use client";

import { useLoading } from "@/contexts/loading-context";
import { useCallback, useEffect, useState } from "react";

// Cache interface
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Global cache storage
const cache = new Map<string, CacheItem<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache utility functions
function getCachedData<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION,
  });
}

// Generic optimized fetch hook
export function useOptimizedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setLoading: setGlobalLoading } = useLoading();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setGlobalLoading(key, true);
      setError(null);

      // Check cache first
      const cachedData = getCachedData<T>(key);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        setGlobalLoading(key, false);
        return;
      }

      // Fetch fresh data
      const result = await fetchFn();
      setData(result);
      setCachedData(key, result);
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setGlobalLoading(key, false);
    }
  }, [key, fetchFn, setGlobalLoading]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = useCallback(() => {
    cache.delete(key); // Clear cache to force fresh fetch
    fetchData();
  }, [key, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

// Optimized projects hook
export function useOptimizedProjects() {
  return useOptimizedFetch(
    'projects',
    async () => {
      const response = await fetch('/api/v1/projects');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Invalid response format');
      }
      return data.data;
    }
  );
}

// Optimized experiences hook
export function useOptimizedExperiences() {
  return useOptimizedFetch(
    'experiences',
    async () => {
      const response = await fetch('/api/v1/experiences');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Invalid response format');
      }
      return data.data;
    }
  );
}

// Optimized skills hook
export function useOptimizedSkills() {
  return useOptimizedFetch(
    'skills',
    async () => {
      const response = await fetch('/api/v1/skills');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Invalid response format');
      }
      return data.data;
    }
  );
}

// Optimized recommendations hook
export function useOptimizedRecommendations() {
  return useOptimizedFetch(
    'recommendations',
    async () => {
      const response = await fetch('/api/v1/recommendations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Invalid response format');
      }
      return data.data;
    }
  );
}

// Parallel data fetching hook for homepage
export function useHomepageData() {
  const [allData, setAllData] = useState<{
    projects: any[] | null;
    experiences: any[] | null;
    skills: any[] | null;
    recommendations: any[] | null;
  }>({
    projects: null,
    experiences: null,
    skills: null,
    recommendations: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setGlobalLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [projectsRes, experiencesRes, skillsRes, recommendationsRes] = await Promise.allSettled([
          fetch('/api/v1/projects').then(res => res.json()),
          fetch('/api/v1/experiences').then(res => res.json()),
          fetch('/api/v1/skills').then(res => res.json()),
          fetch('/api/v1/recommendations').then(res => res.json()),
        ]);

        const newData = {
          projects: projectsRes.status === 'fulfilled' && projectsRes.value.success ? projectsRes.value.data : null,
          experiences: experiencesRes.status === 'fulfilled' && experiencesRes.value.success ? experiencesRes.value.data : null,
          skills: skillsRes.status === 'fulfilled' && skillsRes.value.success ? skillsRes.value.data : null,
          recommendations: recommendationsRes.status === 'fulfilled' && recommendationsRes.value.success ? recommendationsRes.value.data : null,
        };

        setAllData(newData);

        // Check for any errors
        const errors = [projectsRes, experiencesRes, skillsRes, recommendationsRes]
          .filter(result => result.status === 'rejected')
          .map(result => (result as PromiseRejectedResult).reason);

        if (errors.length > 0) {
          console.warn('Some data failed to load:', errors);
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
        setGlobalLoading(false);
      }
    };

    fetchAllData();
  }, [setGlobalLoading]);

  return {
    ...allData,
    loading,
    error,
  };
}
