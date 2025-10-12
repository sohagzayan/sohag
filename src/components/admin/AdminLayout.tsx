"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Briefcase,
    FileText,
    FolderOpen,
    LayoutDashboard,
    Lightbulb,
    LogOut,
    Mail,
    Menu,
    Star,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/profile", icon: User, label: "Profile & About" },
  { href: "/admin/content", icon: FileText, label: "Content Sections" },
  { href: "/admin/skills", icon: Lightbulb, label: "Skills" },
  { href: "/admin/experience", icon: Briefcase, label: "Experience" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/recommendations", icon: Star, label: "Recommendations" },
  { href: "/admin/messages", icon: Mail, label: "Contact Messages" },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    router.push("/admin");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                </motion.div>
                <span className="truncate">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus !== "true" && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [pathname, router]);

  // Don't show layout on login page
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 lg:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

