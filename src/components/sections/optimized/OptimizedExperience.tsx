"use client";

import { useInstantExperiences } from "@/hooks/use-instant-data";
import { motion } from "framer-motion";
import { WorkExperience } from "../../ui/work-experience";

interface ExperienceItemType {
  id: string;
  companyName: string;
  companyLogo?: string;
  isCurrentEmployer: boolean;
  positions: Array<{
    id: string;
    title: string;
    employmentPeriod: string;
    employmentType: string;
    description: string;
    icon: string;
    skills: string[];
    location: string;
    isExpanded: boolean;
  }>;
}

// Transform database experience to UI format
function transformExperienceToUI(dbExperience: any): ExperienceItemType {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatEmploymentPeriod = (startDate: string, endDate: string | null, current: boolean) => {
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
    id: dbExperience.id,
    companyName: dbExperience.company,
    companyLogo: dbExperience.logo || undefined,
    isCurrentEmployer: dbExperience.current,
    positions: [
      {
        id: `${dbExperience.id}-1`,
        title: dbExperience.position,
        employmentPeriod: formatEmploymentPeriod(dbExperience.startDate, dbExperience.endDate, dbExperience.current),
        employmentType: getEmploymentType(dbExperience.company, dbExperience.position),
        description: dbExperience.description,
        icon: getIcon(dbExperience.position, dbExperience.company),
        skills: [], // Skills would need to be added to database schema or handled separately
        location: dbExperience.location,
        isExpanded: dbExperience.current, // Expand current job by default
      },
    ],
  };
}

function ExperienceContent() {
  const { data: dbExperiences, isUpdating, error, refetch } = useInstantExperiences();

  // Transform database experiences to UI format
  const experiences = dbExperiences.map(transformExperienceToUI);

  return (
    <WorkExperience
      className="rounded-lg"
      experiences={experiences}
    />
  );
}

export function OptimizedExperience() {
  return (
    <section className="w-full ibmsans">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>
      
      <ExperienceContent />
    </section>
  );
}
