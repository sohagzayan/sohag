"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    CheckCircle,
    Code,
    Globe,
    Link as LinkIcon,
    Palette,
    Rocket,
    Star,
    Target,
    Wrench,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function AboutSection() {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const metrics = [
    {
      icon: <Star className="w-10 h-10 text-yellow-400" />,
      value: "98%",
      label: "Client Satisfaction"
    },
    {
      icon: <Wrench className="w-10 h-10 text-blue-400" />,
      value: "24/7",
      label: "Support Available"
    },
    {
      icon: <Rocket className="w-10 h-10 text-purple-400" />,
      value: "50+",
      label: "Projects Delivered"
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [metrics.length, isPaused]);

  return (
    <section className="w-full py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--headline)] mb-3">
            ABOUT
          </h2>
          <p className="text-lg text-[var(--paragraph)] max-w-xl mx-auto">
            Transforming ideas into powerful digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-2xl p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-1 group cursor-pointer">
                <img 
                  src="/sohag.webp" 
                  alt="Sohag" 
                  className="w-full h-full rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-[var(--headline)] mb-2">
                Full-Stack Developer
              </h3>
              <p className="text-[var(--paragraph)] mb-4">
                Building Tomorrow's Web Today
              </p>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">Available for Projects</span>
              </div>
            </motion.div>

            {/* Metrics Carousel */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-2xl p-6 text-center relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMetric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-3">
                    {metrics[currentMetric].icon}
                  </div>
                  <div className="text-3xl font-bold text-[var(--headline)] mb-2">
                    {metrics[currentMetric].value}
                  </div>
                  <p className="text-[var(--paragraph)] mb-3">
                    {metrics[currentMetric].label}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {metrics.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMetric(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                      index === currentMetric 
                        ? 'bg-[var(--headline)] shadow-lg' 
                        : 'bg-[var(--paragraph)]/60 hover:bg-[var(--paragraph)]/80 border border-[var(--paragraph)]/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-[var(--headline)] mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[var(--headline)] font-medium text-sm">Focus</span>
                    <p className="text-[var(--paragraph)] text-xs">Modern Web Apps</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <div>
                    <span className="text-[var(--headline)] font-medium text-sm">Specialty</span>
                    <p className="text-[var(--paragraph)] text-xs">Performance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <div>
                    <span className="text-[var(--headline)] font-medium text-sm">Location</span>
                    <p className="text-[var(--paragraph)] text-xs">Available Remotely</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Rocket className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-[var(--headline)] font-medium text-sm">Delivery</span>
                    <p className="text-[var(--paragraph)] text-xs">Fast & Reliable</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Introduction */}
            <motion.div variants={itemVariants}>
              <p className="text-[var(--paragraph)] leading-relaxed mb-4">
                I specialize in building scalable web applications that solve real business problems. 
                From concept to deployment, I handle the entire development lifecycle with a focus on 
                performance, user experience, and maintainable code architecture.
              </p>
              <p className="text-[var(--paragraph)] leading-relaxed">
                With a passion for clean code and innovative solutions, I bring both technical expertise 
                and creative problem-solving to every project. My goal is to create digital experiences 
                that not only meet requirements but exceed expectations.
              </p>
            </motion.div>

            {/* What I Do Best */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-[var(--headline)] mb-4">What I Do Best</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-xl p-4 hover:border-[var(--link-color)]/30 transition-colors">
                  <Code className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="text-[var(--headline)] font-semibold mb-1">Full-Stack Development</h4>
                  <p className="text-[var(--paragraph)] text-sm">End-to-end web applications with modern tech stack.</p>
                </div>
                <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-xl p-4 hover:border-[var(--link-color)]/30 transition-colors">
                  <Palette className="w-6 h-6 text-pink-400 mb-2" />
                  <h4 className="text-[var(--headline)] font-semibold mb-1">UI/UX Implementation</h4>
                  <p className="text-[var(--paragraph)] text-sm">Pixel-perfect designs with smooth animations.</p>
                </div>
                <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-xl p-4 hover:border-[var(--link-color)]/30 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <h4 className="text-[var(--headline)] font-semibold mb-1">Performance Optimization</h4>
                  <p className="text-[var(--paragraph)] text-sm">Lightning-fast load times and smooth interactions.</p>
                </div>
                <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-xl p-4 hover:border-[var(--link-color)]/30 transition-colors">
                  <LinkIcon className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-[var(--headline)] font-semibold mb-1">API Integration</h4>
                  <p className="text-[var(--paragraph)] text-sm">Seamless third-party service integrations.</p>
                </div>
              </div>
            </motion.div>

            {/* Development Philosophy */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-[var(--headline)] mb-4">My Development Philosophy</h3>
              <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-[var(--paragraph)] text-sm">Clean, maintainable code architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-[var(--paragraph)] text-sm">Mobile-first responsive design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-[var(--paragraph)] text-sm">Performance-driven development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-[var(--paragraph)] text-sm">Continuous learning & innovation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
