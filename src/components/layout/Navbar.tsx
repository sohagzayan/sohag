"use client";

import ToggleMode from "@/components/layout/ToggleMode";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const styles = {
  link: "text-[var(--headline)] hover:text-[var(--headline)] flex gap-[5px] rounded-md text-sm font-medium items-center py-2 relative",
  activeIndicator: "",
};

const iconAnimationVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 0.9, 1], transition: { duration: 0.2 } },
};

const mobileMenuVariants = {
  closed: {
    opacity: "0%",
    x: 0,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: "100%",
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const path = usePathname();
  

  const shouldHideNavbar =
    path.startsWith("/auth") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/admin");

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {!shouldHideNavbar && (
        <motion.nav
          dir="ltr"
          id="navbar"
          style={{
            opacity: 1,
            backdropFilter: isMounted && isScrolled ? "blur(10px)" : "blur(0px)"
          }}
          animate={isMounted ? {
            backgroundColor: isScrolled ? "var(--card-background)" : "transparent",
            borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
            height: isScrolled ? "60px" : "80px",
          } : {
            backgroundColor: "transparent",
            borderBottom: "1px solid transparent",
            height: "80px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-full px-4 md:px-8 lg:px-12 mb-0 bg-[var(--background)]/80 backdrop-blur-md z-50 flex items-center justify-between gap-5 fixed top-0 left-0 right-0 overflow-hidden"
        >
          <motion.div 
            className="flex items-center justify-between w-full"
            animate={{
              justifyContent: isScrolled ? "space-between" : "space-between",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isMounted && isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="flex-shrink-0 hover:opacity-80 transition-all duration-300 text-[var(--headline)] font-medium text-lg group"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Sohag
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Always visible */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="text-[var(--headline)] hover:text-[var(--link-color)] transition-all duration-300 text-sm font-medium relative group"
                  >
                    {item.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--link-color)] group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <ToggleMode />
              <motion.button
                className="text-[var(--headline)] p-2 rounded-full hover:bg-[var(--card-background)] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="flex items-center justify-center"
                  variants={iconAnimationVariants}
                  initial="initial"
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </div>

            {/* Desktop Theme Toggle */}
            <motion.div 
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isMounted && isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ToggleMode />
            </motion.div>
          </motion.div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed z-50 inset-0 m-0 flex h-[100vh] w-full flex-col items-center justify-center bg-[var(--background)]"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
              >
                <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4">
                  <Link
                    href="/"
                    className="flex-shrink-0 text-[var(--headline)] font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sohag
                  </Link>
                  <motion.button
                    className="p-2 rounded-full hover:bg-[var(--card-background)] transition-colors text-[var(--headline)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="flex flex-col items-center space-y-6 w-full px-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-center gap-3 py-3 px-4 rounded-[12px] hover:bg-[var(--card-background)] transition-colors text-[var(--headline)] text-xl font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </>
  );
}
