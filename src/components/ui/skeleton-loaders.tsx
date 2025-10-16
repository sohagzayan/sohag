
// Skeleton loader for project cards
export function ProjectCardSkeleton() {
  return (
    <div className="group relative">
      <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm animate-pulse">
        <div className="relative p-6 space-y-5">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Skeleton */}
              <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0"></div>
              
              <div className="flex-1 space-y-2">
                {/* Title Skeleton */}
                <div className="h-6 bg-muted rounded-md w-3/4"></div>
                {/* Type Skeleton */}
                <div className="h-4 bg-muted rounded-md w-1/2"></div>
              </div>
            </div>
            
            {/* Badge Skeleton */}
            <div className="w-20 h-6 bg-muted rounded-full"></div>
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md w-full"></div>
            <div className="h-4 bg-muted rounded-md w-5/6"></div>
            <div className="h-4 bg-muted rounded-md w-4/6"></div>
          </div>
          
          {/* Technologies Skeleton */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="h-7 bg-muted rounded-full w-16"
              ></div>
            ))}
          </div>
          
          {/* Action Links Skeleton */}
          <div className="flex gap-3 pt-2">
            <div className="h-5 bg-muted rounded w-20"></div>
            <div className="h-5 bg-muted rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for experience cards
export function ExperienceCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Company Logo Skeleton */}
        <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
        
        <div className="flex-1 space-y-3">
          {/* Company Name Skeleton */}
          <div className="h-6 bg-muted rounded-md w-1/3"></div>
          
          {/* Position Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full"></div>
            <div className="h-5 bg-muted rounded-md w-1/2"></div>
          </div>
          
          {/* Employment Period Skeleton */}
          <div className="h-4 bg-muted rounded-md w-1/4"></div>
          
          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md w-full"></div>
            <div className="h-4 bg-muted rounded-md w-3/4"></div>
            <div className="h-4 bg-muted rounded-md w-1/2"></div>
          </div>
          
          {/* Skills Skeleton */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="h-6 bg-muted rounded-full w-16"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Chevron Skeleton */}
        <div className="w-6 h-6 bg-muted rounded-md"></div>
      </div>
    </div>
  );
}

// Skeleton loader for skills
export function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="h-4 bg-muted rounded-md w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton loader for recommendations
export function RecommendationSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
        
        <div className="flex-1 space-y-3">
          {/* Name and Role Skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded-md w-1/3"></div>
            <div className="h-4 bg-muted rounded-md w-1/4"></div>
          </div>
          
          {/* Quote Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md w-full"></div>
            <div className="h-4 bg-muted rounded-md w-5/6"></div>
            <div className="h-4 bg-muted rounded-md w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for hero section
export function HeroSkeleton() {
  return (
    <div className="text-center space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-16 bg-muted rounded-lg w-3/4 mx-auto"></div>
        <div className="h-6 bg-muted rounded-md w-1/2 mx-auto"></div>
      </div>
      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="h-4 bg-muted rounded-md w-full"></div>
        <div className="h-4 bg-muted rounded-md w-5/6 mx-auto"></div>
        <div className="h-4 bg-muted rounded-md w-4/6 mx-auto"></div>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="h-12 bg-muted rounded-lg w-32"></div>
        <div className="h-12 bg-muted rounded-lg w-32"></div>
      </div>
    </div>
  );
}

// Animated skeleton with shimmer effect
export function ShimmerSkeleton({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    </div>
  );
}
