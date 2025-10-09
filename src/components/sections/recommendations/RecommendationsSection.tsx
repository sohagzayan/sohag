"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedRecommendations } from "@/hooks/use-recommendations";
import { ScrollEffect } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsBriefcaseFill, BsPeopleFill, BsPersonBadgeFill } from "react-icons/bs";
import { FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { MagicCard } from "../../ui/MagicCard";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return (
    parts[0]?.[0].toUpperCase() +
    (parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : "")
  );
};

const getRelationshipIcon = (relationship: string) => {
  switch (relationship) {
    case "Manager":
      return <BsPersonBadgeFill className="w-3 h-3" />;
    case "Colleague":
      return <BsPeopleFill className="w-3 h-3" />;
    case "Client":
      return <BsBriefcaseFill className="w-3 h-3" />;
    default:
      return <BsPeopleFill className="w-3 h-3" />;
  }
};

const getRelationshipColor = (relationship: string) => {
  switch (relationship) {
    case "Manager":
      return "from-purple-500 to-indigo-600";
    case "Colleague":
      return "from-blue-500 to-cyan-600";
    case "Client":
      return "from-green-500 to-emerald-600";
    default:
      return "from-gray-500 to-slate-600";
  }
};

const RecommendationsSection = () => {
  const { recommendations, loading, error } = useFeaturedRecommendations();

  if (loading) {
    return (
      <section className="w-full py-10">
        <ScrollEffect type="fadeIn">
          <header className="mb-8">
            <h1
              className="font-doto font-bold text-2xl leading-8 pt-2"
              style={{ color: "var(--headline)", borderColor: "var(--border)" }}
              data-ninja-font="doto_bold_normal_rg90b"
            >
              Recommendations{" "}
              <span
                className="font-jetbrains-mono text-sm"
                style={{ color: "var(--secondary)" }}
              >
                From <Link href="link">LinkedIn</Link>
              </span>
            </h1>
            <p
              className="font-figtree text-sm mt-2 mb-4"
              style={{ color: "var(--paragraph)" }}
            >
              Here are some recommendations from people I've worked with.
            </p>
          </header>
          <div className="flex flex-col items-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full rounded-xl pt-16 flex flex-col">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[95%]" />
                  <Skeleton className="h-4 w-[88%]" />
                  <Skeleton className="h-4 w-[92%]" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
              </div>
            ))}
          </div>
        </ScrollEffect>
      </section>
    );
  }



  // Duplicate recommendations multiple times for truly seamless infinite scroll
  const duplicatedRecommendations = [
    ...recommendations, 
    ...recommendations, 
    ...recommendations,
    ...recommendations,
    ...recommendations
  ];

  // Split into two rows
  const row1 = duplicatedRecommendations;
  const row2 = [...duplicatedRecommendations].reverse(); // Different order for variety

  return (
    <section className="w-full py-10 overflow-hidden">
      <ScrollEffect type="fadeIn">
        <header className="mb-12 px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="section-title text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "var(--headline)" }}
              >
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Recommendations
                </span>
              </h1>
              <p className="text-base" style={{ color: "var(--card-paragraph)" }}>
                Testimonials from people I've worked with
              </p>
            </div>
            
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all duration-300"
              style={{ 
                borderColor: "#0A66C2",
                color: "#0A66C2"
              }}
              whileHover={{ scale: 1.05, backgroundColor: "#0A66C2" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="group-hover:text-white">View on LinkedIn</span>
              <GoLinkExternal className="w-4 h-4" />
            </motion.a>
          </div>
        </header>
      </ScrollEffect>

      {/* Multi-Row Infinite Scroll Container */}
      <div className="relative space-y-4">
        {/* Gradient overlays for fade effect */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Row 1 - Scrolling Left */}
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -1 * recommendations.length * 284], // 284px = card width (280px) + gap (4px)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: recommendations.length * 15, // 15 seconds per card - much slower
              ease: "linear",
            },
          }}
        >
          {row1.map(({ _id, avatar, name, position, company, text, relationship }, index) => (
            <motion.div
              key={`row1-${_id}-${index}`}
              className="flex-shrink-0 w-[280px]"
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <MagicCard 
                gradientColor="#7e7e7e12" 
                className={cn("flex flex-col h-full p-4 relative overflow-hidden rounded-2xl border-2 transition-all duration-300")}
                style={{ 
                  borderColor: "var(--card-border-color)",
                  backgroundColor: "var(--card-background)"
                }}
                ref={undefined}
              >
                {/* Cute floating animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 2.5 + (index % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar className="w-10 h-10 border-2" style={{ borderColor: "var(--card-border-color)" }}>
                      {avatar ? (
                        <AvatarImage src={avatar} alt={name} />
                      ) : (
                        <AvatarFallback 
                          className="text-sm font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        >
                          {getInitials(name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate" style={{ color: "var(--card-headline)" }}>
                      {name}
                    </h3>
                    <p className="text-xs truncate" style={{ color: "var(--card-paragraph)" }}>
                      {position}
                    </p>
                  </div>

                  <motion.div 
                    className={`flex-shrink-0 p-1.5 rounded-full bg-gradient-to-r ${getRelationshipColor(relationship)}`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white text-xs">
                      {getRelationshipIcon(relationship)}
                    </span>
                  </motion.div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <motion.div
                    className="absolute -left-1 -top-1"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaQuoteLeft 
                      className="w-4 h-4 opacity-10"
                      style={{ color: "var(--link-color)" }}
                    />
                  </motion.div>
                  
                  <p className="text-xs leading-relaxed line-clamp-4 pl-3" style={{ color: "var(--card-paragraph)" }}>
                    {text}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--card-border-color)" }}>
                  <span className="text-[10px] font-medium" style={{ color: "var(--paragraph)" }}>
                    {company}
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaLinkedin className="w-3 h-3" style={{ color: "#0A66C2" }} />
                  </motion.div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 - Scrolling Right (opposite direction) */}
        <motion.div
          className="flex gap-4"
          animate={{
            x: [-1 * recommendations.length * 284, 0], // Scroll right to left (opposite)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: recommendations.length * 15, // 15 seconds per card - much slower
              ease: "linear",
            },
          }}
        >
          {row2.map(({ _id, avatar, name, position, company, text, relationship }, index) => (
            <motion.div
              key={`row2-${_id}-${index}`}
              className="flex-shrink-0 w-[280px]"
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <MagicCard 
                gradientColor="#7e7e7e12" 
                className={cn("flex flex-col h-full p-4 relative overflow-hidden rounded-2xl border-2 transition-all duration-300")}
                style={{ 
                  borderColor: "var(--card-border-color)",
                  backgroundColor: "var(--card-background)"
                }}
                ref={undefined}
              >
                {/* Cute floating animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 2.5 + (index % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar className="w-10 h-10 border-2" style={{ borderColor: "var(--card-border-color)" }}>
                      {avatar ? (
                        <AvatarImage src={avatar} alt={name} />
                      ) : (
                        <AvatarFallback 
                          className="text-sm font-bold bg-gradient-to-br from-pink-500 to-orange-600 text-white"
                        >
                          {getInitials(name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate" style={{ color: "var(--card-headline)" }}>
                      {name}
                    </h3>
                    <p className="text-xs truncate" style={{ color: "var(--card-paragraph)" }}>
                      {position}
                    </p>
                  </div>

                  <motion.div 
                    className={`flex-shrink-0 p-1.5 rounded-full bg-gradient-to-r ${getRelationshipColor(relationship)}`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white text-xs">
                      {getRelationshipIcon(relationship)}
                    </span>
                  </motion.div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <motion.div
                    className="absolute -left-1 -top-1"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <FaQuoteLeft 
                      className="w-4 h-4 opacity-10"
                      style={{ color: "var(--link-color)" }}
                    />
                  </motion.div>
                  
                  <p className="text-xs leading-relaxed line-clamp-4 pl-3" style={{ color: "var(--card-paragraph)" }}>
                    {text}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--card-border-color)" }}>
                  <span className="text-[10px] font-medium" style={{ color: "var(--paragraph)" }}>
                    {company}
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <FaLinkedin className="w-3 h-3" style={{ color: "#0A66C2" }} />
                  </motion.div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default RecommendationsSection;
