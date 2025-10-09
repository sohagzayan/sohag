"use client";

import { useSocialLinks } from "@/hooks/use-social-links";
import { memo } from "react";

import {
    AiFillTwitterCircle,
    AiFillYoutube,    
    AiOutlineMail,
    AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const iconsMap = {
  github: SiGithub,
  linkedin: BsLinkedin,
  youtube: AiFillYoutube,
  twitter: AiFillTwitterCircle,
  email: AiOutlineMail,
  envelope: AiOutlineMail,
  whatsapp: AiOutlineWhatsApp,
  facebook: FaFacebook,
};

function HeroSocialLinks() {
  const { socialLinks } = useSocialLinks(true);

  return (
    <div className="flex items-center gap-4">
      {socialLinks.slice(0, 4).map((social) => {
        const IconComponent =
          iconsMap[social.icon.toLowerCase() as keyof typeof iconsMap];

        return (
          <a
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--card-background)]/50 backdrop-blur-sm border border-[var(--border)] text-[var(--headline)] hover:bg-[var(--card-hover)] hover:border-[var(--link-color)] transition-all duration-300"
          >
            {IconComponent && (
              <IconComponent
                aria-hidden="true"
                size={20}
              />
            )}
          </a>
        );
      })}
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative">
      {/* Full Width Background */}
      <div className="absolute inset-0 bg-[var(--background)]">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          {/* Visible Animated Colorful Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/12 to-indigo-400/12 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-gradient-to-r from-rose-400/12 to-pink-400/12 rounded-full blur-3xl animate-float-fast"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="text-center w-full max-w-full px-4 md:px-8 lg:px-12 overflow-hidden">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--card-background)]/50 backdrop-blur-sm border border-[var(--border)] rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[var(--headline)] text-sm font-medium">Available for projects</span>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--headline)] mb-4 tracking-tight break-words">
            Md Sohag
          </h1>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--headline)] mb-6 font-medium break-words">
            Full Stack Developer
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--paragraph)] mb-8 max-w-2xl mx-auto break-words">
            Crafting digital experiences with precision
          </p>

          {/* Technologies */}
          <div className="flex items-center justify-center gap-2 text-[var(--paragraph)] mb-12 flex-wrap">
            <span className="text-sm">React</span>
            <span className="text-[var(--paragraph)]/50">•</span>
            <span className="text-sm">Next.js</span>
            <span className="text-[var(--paragraph)]/50">•</span>
            <span className="text-sm">Node.js</span>
            <span className="text-[var(--paragraph)]/50">•</span>
            <span className="text-sm">TypeScript</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
            <button className="bg-[var(--headline)] text-[var(--background)] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
              View Work <span className="text-base sm:text-lg">→</span>
            </button>
            <button className="bg-transparent border-2 border-[var(--border)] text-[var(--headline)] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-[var(--card-background)] hover:border-[var(--link-color)] transition-all duration-300 flex items-center gap-2 backdrop-blur-sm text-sm sm:text-base">
              <span className="text-base sm:text-lg">↓</span> Resume
            </button>
          </div>
        </div>

        {/* Social Links - moved to bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <HeroSocialLinks />
        </div>
      </div>
    </div>
  );
}

export default memo(HeroSection);
