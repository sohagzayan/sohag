"use client";

import { useProjects } from "@/hooks/use-projects";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { BsCloud, BsFillPeopleFill, BsStarFill } from "react-icons/bs";
import { FaCss3Alt, FaNodeJs, FaReact } from "react-icons/fa";
import { FiChevronRight, FiExternalLink, FiEye, FiGithub, FiHeart, FiMessageSquare, FiX } from "react-icons/fi";
import { MdDesignServices } from "react-icons/md";
import { SiExpress, SiGithubactions, SiMongodb, SiNextdotjs, SiOpenai, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";

interface ProjectFeedback {
  author: string;
  role: string;
  feedback: string;
  rating: number;
}

interface ProjectStats {
  views: number;
  likes: number;
  feedbacks: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  type: string;
  website: string;
  github?: string;
  technologies: string[];
  status: string;
  featured: boolean;
  created: string;
  updated: string;
  videoUrl?: string;
  logoFileName: string;
  screenshotUrl?: string;
  gradient: string;
  stats: ProjectStats;
  feedback?: ProjectFeedback;
  highlights: string[];
}

const projectsData: Project[] = [
  {
    id: "proj_1",
    title: "sam-tax.com",
    description:
      "Trusted tax and accounting platform for expert tax preparation, financial planning, and business advisory services.",
    detailedDescription:
      "A comprehensive tax and accounting platform that revolutionizes how businesses manage their finances. Built with modern architecture, it features multi-language support, secure payment integration, and AI-powered automation tools. The platform provides expert tax preparation, financial planning, and business advisory services to clients worldwide.",
    type: "Web Application",
    website: "https://sam-tax.com/",
    technologies: [
      "React (Next.js)",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT & OAuth",
      "CI/CD (GitHub Actions)",
      "AI Automation",
      "Payment Integration",
      "Cloud Deployment",
    ],
    status: "Published",
    featured: true,
    created: "2024-06-01",
    updated: "",
    logoFileName: "samtax.svg",
    screenshotUrl: "/logos/samtax.svg",
    gradient: "from-blue-500 to-purple-600",
    stats: { views: 0, likes: 0, feedbacks: 0 },
    feedback: {
      author: "Sarah Mitchell",
      role: "CEO, Samtax Inc.",
      feedback: "The platform exceeded our expectations. The multi-language support and AI automation have significantly improved our client satisfaction.",
      rating: 5
    },
    highlights: [
      "AI-powered tax automation",
      "Multi-language support (5+ languages)",
      "Secure payment processing",
      "Real-time financial analytics"
    ]
  },
  {
    id: "proj_3",
    title: "SFB - Sustainable Form Builder",
    description:
      "Powerful no-code form builder for creating, customizing, and deploying smart forms in minutes.",
    detailedDescription:
      "A revolutionary no-code platform that empowers teams and creators to build sophisticated forms without technical knowledge. Features include drag-and-drop interface, advanced logic rules, seamless integrations with popular tools, and real-time analytics. Perfect for data collection, surveys, and customer feedback.",
    type: "SaaS Platform",
    website: "https://sfb-app.com",
    technologies: [
      "React (Next.js)",
      "TypeScript",
      "React DnD",
      "Node.js",
      "RESTful APIs",
      "Tailwind CSS",
      "JWT & OAuth",
      "SaaS Multi-Tenant Architecture",
      "Cloud Hosting",
      "Automated Testing",
    ],
    status: "Published",
    featured: true,
    created: "2023-06-01",
    updated: "2023-11-30",
    videoUrl: "https://www.youtube.com/watch?v=2IqjzGT1l1c",
    logoFileName: "sfb.svg",
    screenshotUrl: "/logos/sfb.svg",
    gradient: "from-green-500 to-teal-600",
    stats: { views: 0, likes: 0, feedbacks: 0 },
    feedback: {
      author: "David Chen",
      role: "Product Manager",
      feedback: "SFB transformed how we collect user feedback. The drag-and-drop builder is intuitive and saves us hours of development time.",
      rating: 5
    },
    highlights: [
      "Drag & drop form builder",
      "Advanced conditional logic",
      "50+ integrations",
      "Real-time analytics dashboard"
    ]
  },
  {
    id: "proj_4",
    title: "Gradients CSS",
    description:
      "Modern tool for creating, exploring, and exporting beautiful CSS gradients with ease.",
    detailedDescription:
      "An innovative gradient creation tool designed for developers and designers. Features a real-time preview, customizable gradient stops, multiple export formats, and a curated library of beautiful gradients. Streamlines the design workflow and helps create stunning visual effects.",
    type: "Tool",
    website: "https://gradientscss.vercel.app/",
    github: "https://github.com/projects/gradientscss",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "CSS3",
      "UI/UX Design",
      "Export Utilities",
    ],
    status: "Published",
    featured: true,
    created: "2024-11-01",
    updated: "",
    logoFileName: "gradientscss.png",
    screenshotUrl: "/logos/gradientscss.png",
    gradient: "from-pink-500 to-orange-500",
    stats: { views: 0, likes: 0, feedbacks: 0 },
    feedback: {
      author: "Emily Rodriguez",
      role: "UI/UX Designer",
      feedback: "Best gradient tool I've used! The real-time preview and export options make it incredibly efficient for my design workflow.",
      rating: 5
    },
    highlights: [
      "Real-time gradient preview",
      "Multiple export formats",
      "Curated gradient library",
      "Color palette generator"
    ]
  },
  {
    id: "proj_5",
    title: "Barber Academy",
    description:
      "Comprehensive website for Barber Academy with online appointment scheduling and service showcase.",
    detailedDescription:
      "A full-featured website for Barber Academy that streamlines operations and enhances client engagement. Includes online appointment scheduling, service catalog, gallery showcase, and client testimonials. The platform increased booking efficiency by 60% and client satisfaction significantly.",
    type: "Website",
    website: "https://raoufzadi.vercel.app/",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "RESTful APIs",
      "Booking System",
      "Responsive Design",
    ],
    status: "Published",
    featured: true,
    created: "2023-07-01",
    updated: "2023-08-01",
    logoFileName: "barber.svg",
    screenshotUrl: "/logos/barber.svg",
    gradient: "from-amber-500 to-red-600",
    stats: { views: 0, likes: 0, feedbacks: 0 },
    feedback: {
      author: "Marcus Johnson",
      role: "Barber Academy Owner",
      feedback: "The booking system has revolutionized our operations. Client engagement is up 60% since launch!",
      rating: 5
    },
    highlights: [
      "Online appointment booking",
      "Service catalog & gallery",
      "Client management system",
      "Mobile-responsive design"
    ]
  },
  {
    id: "proj_6",
    title: "4CV - AI Resume Analyzer",
    description:
      "Transform your hiring process with AI-powered resume analysis and instant candidate insights.",
    detailedDescription:
      "An advanced AI-powered platform that revolutionizes recruitment workflows. Using Gemini AI, it provides instant, comprehensive candidate insights, skills matching, and actionable hiring recommendations. The platform reduces hiring time by 70% and improves candidate quality significantly.",
    type: "AI Platform",
    website: "http://4cv.vercel.app/",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Gemini AI API",
      "AI Integration",
      "Resume Processing",
      "Machine Learning",
    ],
    status: "Published",
    featured: true,
    created: "2024-12-01",
    updated: "2025-01-13",
    logoFileName: "4cv.svg",
    screenshotUrl: "/logos/4cv.svg",
    gradient: "from-indigo-500 to-blue-600",
    stats: { views: 0, likes: 0, feedbacks: 0 },
    feedback: {
      author: "Lisa Anderson",
      role: "HR Director",
      feedback: "4CV has transformed our hiring process. The AI insights are incredibly accurate and save us countless hours of manual screening.",
      rating: 5
    },
    highlights: [
      "AI-powered resume analysis",
      "Instant candidate insights",
      "Skills matching algorithm",
      "Automated screening reports"
    ]
  },
];

const techIconMap: Record<string, React.ReactNode> = {
  "React": <FaReact className="text-sky-500" title="React" />,
  "React.js": <FaReact className="text-sky-500" title="React.js" />,
  "React (Next.js)": <SiNextdotjs className="text-black dark:text-white" title="Next.js" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white" title="Next.js" />,
  "TypeScript": <SiTypescript className="text-blue-600" title="TypeScript" />,
  "Node.js": <FaNodeJs className="text-green-700" title="Node.js" />,
  "Express.js": <SiExpress className="text-gray-700" title="Express.js" />,
  "MongoDB": <SiMongodb className="text-green-600" title="MongoDB" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" title="Tailwind CSS" />,
  "CSS3": <FaCss3Alt className="text-blue-500" title="CSS3" />,
  "Vite": <SiVite className="text-purple-500" title="Vite" />,
  "JWT & OAuth": <BsFillPeopleFill className="text-yellow-600" title="JWT & OAuth" />,
  "RESTful APIs": <BsCloud className="text-blue-400" title="RESTful APIs" />,
  "CI/CD (GitHub Actions)": <SiGithubactions className="text-gray-700" title="GitHub Actions" />,
  "AI Automation": <SiOpenai className="text-gray-700" title="AI Automation" />,
  "Gemini AI API": <SiOpenai className="text-gray-700" title="Gemini AI API" />,
  "Prompt Engineering": <SiOpenai className="text-gray-700" title="Prompt Engineering" />,
  "Cloud Deployment": <BsCloud className="text-blue-400" title="Cloud Deployment" />,
  "Cloud Hosting": <BsCloud className="text-blue-400" title="Cloud Hosting" />,
  "UI/UX Design": <MdDesignServices className="text-pink-500" title="UI/UX Design" />,
  "Export Utilities": <MdDesignServices className="text-pink-500" title="Export Utilities" />,
  "Booking System": <BsFillPeopleFill className="text-green-700" title="Booking System" />,
  "SaaS Multi-Tenant Architecture": <BsFillPeopleFill className="text-blue-700" title="SaaS Multi-Tenant Architecture" />,
  "Open Source": <SiGithubactions className="text-black dark:text-white" title="Open Source" />,
  "Data Visualization": <MdDesignServices className="text-purple-500" title="Data Visualization" />,
};

// 3D Card Component with mouse tracking
const ProjectCard3D = ({ project, index, onDetailsClick }: { project: Project; index: number; onDetailsClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [localStats, setLocalStats] = useState(project.stats);
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
    window.open(project.website, '_blank');
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
      className="group relative h-full"
    >
      <div 
        className="relative h-full rounded-3xl border-2 overflow-hidden transition-all duration-500 hover:shadow-2xl"
        style={{ 
          borderColor: "var(--card-border-color)",
          backgroundColor: "var(--card-background)",
          transform: "translateZ(20px)",
        }}
      >
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Glowing border effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

        <div className="relative p-6 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
          {/* Project Screenshot/Preview */}
          <motion.div 
            className="relative mb-4 rounded-2xl overflow-hidden border-2"
            style={{ borderColor: "var(--card-border-color)" }}
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
                <motion.div 
                  className={`w-2 h-2 rounded-full bg-gradient-to-br ${project.gradient}`}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-white backdrop-blur-sm">Live</span>
              </div>
            </div>
          </motion.div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--card-headline)" }}>
            {project.title}
          </h3>
          
          <p className="text-sm mb-4 line-clamp-2 leading-relaxed" style={{ color: "var(--card-paragraph)" }}>
            {project.description}
          </p>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* View Button */}
            <motion.button
              onClick={handleView}
              className="flex flex-col items-center p-2.5 rounded-lg border cursor-pointer group/stat"
              style={{ borderColor: "var(--card-border-color)", backgroundColor: "var(--background)" }}
              whileHover={{ scale: 1.05, borderColor: "var(--link-color)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye className="w-4 h-4 mb-1 group-hover/stat:scale-110 transition-transform" style={{ color: "var(--link-color)" }} />
              <span className="text-xs font-bold" style={{ color: "var(--headline)" }}>{localStats.views}</span>
              <span className="text-[10px]" style={{ color: "var(--paragraph)" }}>Views</span>
            </motion.button>

            {/* Like Button */}
            <motion.button
              onClick={handleLike}
              className="flex flex-col items-center p-2.5 rounded-lg border cursor-pointer group/stat"
              style={{ borderColor: isLiked ? "var(--link-color)" : "var(--card-border-color)", backgroundColor: "var(--background)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isLiked ? (
                  <FiHeart className="w-4 h-4 mb-1 fill-current" style={{ color: "#ef4444" }} />
                ) : (
                  <FiHeart className="w-4 h-4 mb-1 group-hover/stat:scale-110 transition-transform" style={{ color: "var(--link-color)" }} />
                )}
              </motion.div>
              <span className="text-xs font-bold" style={{ color: isLiked ? "#ef4444" : "var(--headline)" }}>{localStats.likes}</span>
              <span className="text-[10px]" style={{ color: "var(--paragraph)" }}>Likes</span>
            </motion.button>

            {/* Feedback Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setLocalStats(prev => ({ ...prev, feedbacks: prev.feedbacks + 1 }));
                onDetailsClick();
              }}
              className="flex flex-col items-center p-2.5 rounded-lg border cursor-pointer group/stat"
              style={{ borderColor: "var(--card-border-color)", backgroundColor: "var(--background)" }}
              whileHover={{ scale: 1.05, borderColor: "var(--link-color)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageSquare className="w-4 h-4 mb-1 group-hover/stat:scale-110 transition-transform" style={{ color: "var(--link-color)" }} />
              <span className="text-xs font-bold" style={{ color: "var(--headline)" }}>{localStats.feedbacks}</span>
              <span className="text-[10px]" style={{ color: "var(--paragraph)" }}>Feedback</span>
            </motion.button>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border"
                style={{ 
                  borderColor: "var(--card-border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--paragraph)"
                }}
              >
                {techIconMap[tech] && <span className="flex items-center">{techIconMap[tech]}</span>}
                <span>{tech}</span>
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] px-2 py-0.5" style={{ color: "var(--paragraph)" }}>
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2">
            <motion.button
              onClick={onDetailsClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{ backgroundColor: "var(--link-color)", color: "white" }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px var(--link-color)" }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
              <FiChevronRight className="w-4 h-4" />
            </motion.button>
            
            <motion.a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border-2 transition-all duration-300"
              style={{ borderColor: "var(--card-border-color)", color: "var(--paragraph)" }}
              whileHover={{ scale: 1.05, borderColor: "var(--link-color)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </div>
    </motion.div>
  );
};

// Detailed Project Modal
const ProjectDetailsModal = ({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border-2"
              style={{ 
                borderColor: "var(--card-border-color)",
                backgroundColor: "var(--card-background)"
              }}
            >
              {/* Header with gradient */}
              <div className={`relative p-8 bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>

                  <div className="flex items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm p-3">
                      <img
                        alt={project.title}
                        className="w-full h-full object-contain"
                        src={`/logos/${project.logoFileName}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                      <p className="text-white/90 text-sm">{project.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center p-4 rounded-xl border" style={{ borderColor: "var(--card-border-color)" }}>
                    <FiEye className="w-6 h-6 mb-2" style={{ color: "var(--link-color)" }} />
                    <span className="text-2xl font-bold" style={{ color: "var(--headline)" }}>{project.stats.views}</span>
                    <span className="text-sm" style={{ color: "var(--paragraph)" }}>Project Views</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl border" style={{ borderColor: "var(--card-border-color)" }}>
                    <FiHeart className="w-6 h-6 mb-2" style={{ color: "var(--link-color)" }} />
                    <span className="text-2xl font-bold" style={{ color: "var(--headline)" }}>{project.stats.likes}</span>
                    <span className="text-sm" style={{ color: "var(--paragraph)" }}>Community Likes</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl border" style={{ borderColor: "var(--card-border-color)" }}>
                    <FiMessageSquare className="w-6 h-6 mb-2" style={{ color: "var(--link-color)" }} />
                    <span className="text-2xl font-bold" style={{ color: "var(--headline)" }}>{project.stats.feedbacks}</span>
                    <span className="text-sm" style={{ color: "var(--paragraph)" }}>User Feedback</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--headline)" }}>About This Project</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--card-paragraph)" }}>
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "var(--headline)" }}>Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg border"
                        style={{ borderColor: "var(--card-border-color)" }}
                      >
                        <div className={`mt-1 w-6 h-6 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                          <FiChevronRight className="w-4 h-4 text-white" />
                        </div>
                        <span style={{ color: "var(--card-paragraph)" }}>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "var(--headline)" }}>Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border"
                        style={{ 
                          borderColor: "var(--card-border-color)",
                          backgroundColor: "var(--background)",
                          color: "var(--paragraph)"
                        }}
                      >
                        {techIconMap[tech] && <span className="flex items-center text-lg">{techIconMap[tech]}</span>}
                        <span className="font-medium">{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Client Feedback */}
                {project.feedback && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--headline)" }}>
                      <FiMessageSquare className="w-5 h-5" />
                      Client Feedback
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl bg-gradient-to-br ${project.gradient} bg-opacity-10 border`}
                      style={{ borderColor: "var(--card-border-color)" }}
                    >
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(project.feedback.rating)].map((_, i) => (
                          <BsStarFill key={i} className="w-5 h-5 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-base italic mb-4" style={{ color: "var(--card-paragraph)" }}>
                        "{project.feedback.feedback}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                          {project.feedback.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: "var(--headline)" }}>{project.feedback.author}</p>
                          <p className="text-sm" style={{ color: "var(--paragraph)" }}>{project.feedback.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Leave Feedback Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--headline)" }}>
                    <FiMessageSquare className="w-5 h-5" />
                    Leave Your Feedback or Query
                  </h3>
                  <div className={`p-6 rounded-2xl border`} style={{ borderColor: "var(--card-border-color)" }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--headline)" }}>
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-2 rounded-lg border outline-none focus:border-[var(--link-color)] transition-colors"
                          style={{ 
                            borderColor: "var(--card-border-color)",
                            backgroundColor: "var(--background)",
                            color: "var(--paragraph)"
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--headline)" }}>
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-2 rounded-lg border outline-none focus:border-[var(--link-color)] transition-colors"
                          style={{ 
                            borderColor: "var(--card-border-color)",
                            backgroundColor: "var(--background)",
                            color: "var(--paragraph)"
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--headline)" }}>
                          Your Feedback or Query
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Share your thoughts, questions, or suggestions about this project..."
                          className="w-full px-4 py-2 rounded-lg border outline-none focus:border-[var(--link-color)] transition-colors resize-none"
                          style={{ 
                            borderColor: "var(--card-border-color)",
                            backgroundColor: "var(--background)",
                            color: "var(--paragraph)"
                          }}
                        />
                      </div>
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
                        style={{ backgroundColor: "var(--link-color)", color: "white" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiMessageSquare className="w-5 h-5" />
                        Submit Feedback
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
                    style={{ backgroundColor: "var(--link-color)", color: "white" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink className="w-5 h-5" />
                    Visit Live Site
                  </motion.a>
                  
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2"
                      style={{ borderColor: "var(--link-color)", color: "var(--link-color)" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub className="w-5 h-5" />
                      View Source Code
                    </motion.a>
                  )}

                  {project.videoUrl && (
                    <motion.a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2"
                      style={{ borderColor: "var(--link-color)", color: "var(--link-color)" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects: dbProjects, loading, error, refetch } = useProjects();

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Transform database projects to component format
  const transformProject = (dbProject: any): Project => {
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
      id: dbProject._id,
      title: dbProject.title,
      description: dbProject.description,
      detailedDescription: dbProject.description, // Use same description for now
      type: dbProject.projectType,
      website: dbProject.websiteUrl || "",
      github: dbProject.githubUrl,
      technologies: dbProject.technologies || [],
      status: dbProject.status,
      featured: dbProject.featured,
      created: new Date(dbProject.createdAt).toLocaleDateString(),
      updated: new Date(dbProject.updatedAt).toLocaleDateString(),
      logoFileName: getLogoFileName(dbProject.title),
      screenshotUrl: dbProject.images?.[0] || undefined,
      gradient: getGradient(dbProject.title),
      stats: { views: 0, likes: 0, feedbacks: 0 },
      highlights: [] // Could be added to database schema later
    };
  };

  const projects = dbProjects.map(transformProject);

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
              className="section-title text-5xl md:text-6xl font-bold mb-6"
              style={{ color: "var(--headline)" }}
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
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--card-paragraph)" }}
            >
              Explore my portfolio of innovative solutions, from AI-powered platforms to elegant design tools.
              Each project showcases unique challenges solved with cutting-edge technology.
            </motion.p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="px-4 py-16">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-3 text-lg">Loading projects...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="px-4 py-16">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="px-4">
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
                  onDetailsClick={() => openProjectDetails(project)}
                />
              </div>
            ))}
          </div>
        </div>
        )}

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
            className="group inline-flex items-center gap-4 px-10 py-5 rounded-2xl border-2 font-bold text-xl relative overflow-hidden"
            style={{
              borderColor: "var(--link-color)",
              color: "var(--link-color)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
            <FiGithub className="w-7 h-7 relative z-10 group-hover:text-white transition-colors" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              Explore More on GitHub
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <FiChevronRight className="w-6 h-6 group-hover:text-white transition-colors" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Projects;
