"use client";

import { useInstantProjects } from "@/hooks/use-instant-data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronRight, FiExternalLink, FiEye, FiGithub, FiHeart, FiMessageSquare } from "react-icons/fi";

// Transform database project to component format
function transformProject(dbProject: any) {
  const getGradient = (title: string) => {
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
  };

  const getLogoFileName = (title: string) => {
    const logoMap: Record<string, string> = {
      "Samtax": "samtax.svg",
      "SFB": "sfb.svg",
      "Gradients CSS": "gradientscss.png",
      "Barber Academy": "barber.svg",
      "NAJ Training Center": "ptit.png",
    };
    return logoMap[title] || "placeholder.svg";
  };

  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    detailedDescription: dbProject.description,
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
  };
}

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

// 3D Card Component with mouse tracking
const ProjectCard3D = ({ project, index, onDetailsClick }: { project: any; index: number; onDetailsClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [localStats, setLocalStats] = useState<{ views: number; likes: number; feedbacks: number }>(project.stats || { views: 0, likes: 0, feedbacks: 0 });
  const [isLiked, setIsLiked] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLocalStats(prev => ({
      ...prev,
      likes: isLiked ? Math.max(0, prev.likes - 1) : prev.likes + 1
    }));
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalStats(prev => ({
      ...prev,
      views: prev.views + 1
    }));
    if (project.website) {
      window.open(project.website, '_blank');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full cursor-pointer"
      onClick={onDetailsClick}
    >
      <div 
        className="relative h-full rounded-3xl border-2 overflow-hidden transition-all duration-500 hover:shadow-2xl border-border bg-card"
      >
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Glowing border effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

        <div className="relative p-6 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
          {/* Project Screenshot/Preview */}
          <motion.div 
            className="relative mb-4 rounded-2xl overflow-hidden border-2 border-border"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
            <div className="aspect-video w-full relative group/image">
              <img
                alt={`${project.title} preview`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                src={project.screenshotUrl || `/logos/${project.logoFileName}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=" + encodeURIComponent(project.title);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              
              {/* Type badge on image */}
              <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white backdrop-blur-sm shadow-lg`}>
                {project.type}
              </span>

              {/* Live indicator */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-medium">Live</span>
              </div>
            </div>
          </motion.div>

          {/* Project Info */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="text-xs px-2 py-1 rounded-full border bg-card border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Stats and Actions */}
            <div className="mt-auto">
              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleView}
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    <FiEye className="w-4 h-4" />
                    <span>{localStats.views}</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-red-400' : 'hover:text-red-400'}`}
                  >
                    <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{localStats.likes}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <FiMessageSquare className="w-4 h-4" />
                    <span>{localStats.feedbacks}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.website && (
                  <motion.a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 bg-card border-border text-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Visit</span>
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 bg-card border-border text-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiGithub className="w-4 h-4" />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                )}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDetailsClick();
                  }}
                  className="px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 bg-card border-border text-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function ProjectsContent() {
  const { data: projects, isUpdating, error, refetch } = useInstantProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={
            index === 0
              ? "md:col-span-2 md:row-span-2"
              : index === 2
              ? "lg:col-span-2"
              : ""
          }
        >
          <ProjectCard3D
            project={project}
            index={index}
            onDetailsClick={() => {}}
          />
        </div>
      ))}
    </div>
  );
}

export function OptimizedProjects() {
  return (
    <section data-slot="panel" id="projects" className="py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div data-slot="panel-header" className="screen-line-after px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2
              data-slot="panel-title"
              className="section-title text-5xl md:text-6xl font-bold mb-6 text-foreground"
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Featured
              </span>{" "}
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg max-w-3xl mx-auto text-muted-foreground"
            >
              Explore my portfolio of innovative solutions, from AI-powered platforms to elegant design tools.
              Each project showcases unique challenges solved with cutting-edge technology.
            </motion.p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="px-4">
          <ProjectsContent />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-4 py-16 flex justify-center"
        >
          <motion.a
            href="https://github.com/balshaer"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects <FiChevronRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
