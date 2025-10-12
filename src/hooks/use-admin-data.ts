"use client";

import { Content, contentData } from "@/data/Content";
import { Experience, experiencesData } from "@/data/Experiences";
import { Profile, profileData } from "@/data/Profile";
import { Project, projectsData } from "@/data/Projects";
import { Recommendation, recommendationsData } from "@/data/Recommendations";
import { useEffect, useState } from "react";

/**
 * Hook to get profile data from admin panel or default data
 */
export function useAdminProfile(): Profile {
  const [profile, setProfile] = useState<Profile>(profileData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("admin_profile");
      const savedSkills = localStorage.getItem("admin_skills");

      if (savedProfile || savedSkills) {
        const profileOverride = savedProfile ? JSON.parse(savedProfile) : {};
        const skillsOverride = savedSkills ? JSON.parse(savedSkills) : null;

        setProfile({
          ...profileData,
          ...profileOverride,
          skills: skillsOverride || profileOverride.skills || profileData.skills,
        });
      }
    }
  }, []);

  return profile;
}

/**
 * Hook to get experiences from admin panel or default data
 */
export function useAdminExperiences(): Experience[] {
  const [experiences, setExperiences] = useState<Experience[]>(experiencesData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_experiences");
      if (saved) {
        setExperiences(JSON.parse(saved));
      }
    }
  }, []);

  return experiences;
}

/**
 * Hook to get projects from admin panel or default data
 */
export function useAdminProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_projects");
      if (saved) {
        setProjects(JSON.parse(saved));
      }
    }
  }, []);

  return projects;
}

/**
 * Hook to get content from admin panel or default data
 */
export function useAdminContent(section: "hero" | "about" | "footer"): Content | undefined {
  const [content, setContent] = useState<Content | undefined>(
    contentData.find((c) => c.section === section)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`admin_content_${section}`);
      if (saved) {
        const savedData = JSON.parse(saved);
        const originalContent = contentData.find((c) => c.section === section);
        
        if (originalContent) {
          setContent({
            ...originalContent,
            title: savedData.title || originalContent.title,
            subtitle: savedData.subtitle || originalContent.subtitle,
            description: savedData.description || originalContent.description,
            content: {
              ...originalContent.content,
              ...savedData,
            },
          });
        }
      }
    }
  }, [section]);

  return content;
}

/**
 * Hook to get recommendations from admin panel or default data
 */
export function useAdminRecommendations(): Recommendation[] {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(recommendationsData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_recommendations");
      if (saved) {
        setRecommendations(JSON.parse(saved));
      }
    }
  }, []);

  return recommendations;
}

/**
 * Hook to get skills from admin panel or default data
 */
export function useAdminSkills(): string[] {
  const [skills, setSkills] = useState<string[]>(profileData.skills);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_skills");
      if (saved) {
        setSkills(JSON.parse(saved));
      }
    }
  }, []);

  return skills;
}

