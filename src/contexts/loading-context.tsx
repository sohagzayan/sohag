"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }));
  }, []);

  const setGlobalLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const value = {
    isLoading,
    loadingStates,
    setLoading,
    setGlobalLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Global loading overlay component
export function GlobalLoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-primary/40"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Loading Portfolio</h3>
          <p className="text-sm text-muted-foreground">Preparing your experience...</p>
        </div>
      </div>
    </div>
  );
}
