"use client";

import { useExperiences } from "@/hooks/use-experiences";
import { useEffect, useState } from "react";
import { ExperienceItemType, WorkExperience } from "../../ui/work-experience";

export default function WorkSection() {
  const { experiences: dbExperiences, loading: isLoading, error: fetchError, refetch } = useExperiences();
  const [experiences, setExperiences] = useState<ExperienceItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dbExperiences && dbExperiences.length > 0) {
      const uiExperiences = dbExperiences.map((exp) => {
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
        };

        const formatEmploymentPeriod = (startDate: string, endDate: string | undefined, current: boolean) => {
          const start = formatDate(startDate);
          const end = current ? "Present" : (endDate ? formatDate(endDate) : "Present");
          return `${start} – ${end}`;
        };

        // Determine employment type based on company and position
        const getEmploymentType = (company: string, position: string) => {
          if (company.includes("University") || position.includes("Education")) return "Education";
          if (company.includes("Freelance")) return "Contract";
          if (position.includes("Intern")) return "Internship";
          return "Full-time";
        };

        // Determine icon based on position/company
        const getIcon = (position: string, company: string) => {
          if (position.includes("Security") || position.includes("Database")) return "security";
          if (company.includes("University") || position.includes("Education")) return "education";
          return "code";
        };

        return {
          id: exp._id,
          companyName: exp.company,
          companyLogo: undefined, // Logo would need to be added to database schema
          isCurrentEmployer: exp.current,
          positions: [
            {
              id: `${exp._id}-1`,
              title: exp.title,
              employmentPeriod: formatEmploymentPeriod(exp.startDate, exp.endDate, exp.current),
              employmentType: getEmploymentType(exp.company, exp.title),
              description: exp.description,
              icon: getIcon(exp.title, exp.company),
              skills: exp.skills || [],
              location: exp.location,
              isExpanded: exp.current, // Expand current job by default
            },
          ],
        };
      });
      setExperiences(uiExperiences);
      setError(null);
    } else if (fetchError) {
      setError(fetchError);
    }
  }, [dbExperiences, fetchError]);

  if (isLoading) {
    return (
      <section className="w-full ibmsans">
        <h2 className="section-title">Experience</h2>
        <div className="space-y-6">
          {/* Skeleton Loading Cards - matches the actual experience layout */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 animate-pulse"
            >
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
                    {[1, 2, 3, 4].map((skillIndex) => (
                      <div
                        key={skillIndex}
                        className="h-6 bg-muted rounded-full w-16"
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Chevron Skeleton */}
                <div className="w-6 h-6 bg-muted rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full ibmsans">
        <h2 className="section-title">Experience</h2>
        <div className="text-center py-8">
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              refetch();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full ibmsans">
      <h2 className="section-title">Experience</h2>
      <WorkExperience
        className="rounded-lg"
        experiences={experiences}
      />
    </section>
  );
}
