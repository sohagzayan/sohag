"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    BookOpen,
    Briefcase,
    Clock,
    Eye,
    FileText,
    FolderOpen,
    GraduationCap,
    Lightbulb,
    Link as LinkIcon,
    Mail,
    MessageSquare,
    Star,
    TrendingUp,
    User,
    Users
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  profile: number;
  skills: number;
  experiences: number;
  education: number;
  projects: number;
  featuredProjects: number;
  recommendations: number;
  blogs: number;
  publishedBlogs: number;
  totalViews: number;
  totalLikes: number;
  socialLinks: number;
  newsletterSubscribers: number;
  activeSubscribers: number;
  contactRequests: number;
  pendingRequests: number;
  repliedRequests: number;
}

interface RecentActivity {
  type: string;
  title: string;
  date: string;
  status?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    profile: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    projects: 0,
    featuredProjects: 0,
    recommendations: 0,
    blogs: 0,
    publishedBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
    socialLinks: 0,
    newsletterSubscribers: 0,
    activeSubscribers: 0,
    contactRequests: 0,
    pendingRequests: 0,
    repliedRequests: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all data in parallel with error handling
      const fetchWithFallback = async (url: string) => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            console.warn(`Failed to fetch ${url}: ${res.status}`);
            return { success: false, data: [] };
          }
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.warn(`${url} returned non-JSON response`);
            return { success: false, data: [] };
          }
          return await res.json();
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
          return { success: false, data: [] };
        }
      };

      const [
        profileData,
        skillsData,
        experiencesData,
        educationData,
        projectsData,
        recommendationsData,
        blogsData,
        socialLinksData,
        newsletterData,
        contactData,
      ] = await Promise.all([
        fetchWithFallback('/api/v1/profile'),
        fetchWithFallback('/api/v1/skills'),
        fetchWithFallback('/api/v1/experiences'),
        fetchWithFallback('/api/v1/education'),
        fetchWithFallback('/api/v1/projects'),
        fetchWithFallback('/api/v1/recommendations'),
        fetchWithFallback('/api/v1/blogs'),
        fetchWithFallback('/api/v1/social-links'),
        fetchWithFallback('/api/v1/newsletter'),
        fetchWithFallback('/api/v1/contact'),
      ]);

      // Calculate stats
      const skills = skillsData.data || [];
      const experiences = experiencesData.data || [];
      const education = educationData.data || [];
      const projects = projectsData.data || [];
      const recommendations = recommendationsData.data || [];
      const blogs = blogsData.data || [];
      const socialLinks = socialLinksData.data || [];
      const newsletter = newsletterData.data || [];
      const contacts = contactData.data || [];

      const featuredProjects = projects.filter((p: any) => p.featured).length;
      const publishedBlogs = blogs.filter((b: any) => b.published).length;
      const totalViews = blogs.reduce((sum: number, b: any) => sum + (b.views || 0), 0);
      const totalLikes = blogs.reduce((sum: number, b: any) => sum + (b.likes || 0), 0);
      const activeSubscribers = newsletter.filter((n: any) => n.subscribed).length;
      const pendingRequests = contacts.filter((c: any) => c.status === 'pending').length;
      const repliedRequests = contacts.filter((c: any) => c.replied).length;

      setStats({
        profile: profileData.success ? 1 : 0,
        skills: skillsData.meta?.total || skills.length,
        experiences: experiencesData.meta?.total || experiences.length,
        education: educationData.meta?.total || education.length,
        projects: projectsData.meta?.total || projects.length,
        featuredProjects,
        recommendations: recommendationsData.meta?.total || recommendations.length,
        blogs: blogsData.meta?.total || blogs.length,
        publishedBlogs,
        totalViews,
        totalLikes,
        socialLinks: socialLinks.length,
        newsletterSubscribers: newsletterData.meta?.total || newsletter.length,
        activeSubscribers,
        contactRequests: contactData.meta?.total || contacts.length,
        pendingRequests,
        repliedRequests,
      });

      // Build recent activities
      const activities: RecentActivity[] = [
        ...blogs.slice(0, 3).map((blog: any) => ({
          type: 'blog',
          title: blog.title,
          date: new Date(blog.createdAt).toLocaleDateString(),
          status: blog.published ? 'published' : 'draft',
        })),
        ...contacts.slice(0, 3).map((contact: any) => ({
          type: 'contact',
          title: `Message from ${contact.name}`,
          date: new Date(contact.createdAt).toLocaleDateString(),
          status: contact.replied ? 'replied' : 'pending',
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

      setRecentActivities(activities);
      setHasError(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const cards = [
    {
      title: "Profile & About",
      description: "Manage your personal information",
      icon: User,
      href: "/admin/profile",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      count: stats.profile,
    },
    {
      title: "Skills",
      description: `${stats.skills} skills across categories`,
      icon: Lightbulb,
      href: "/admin/skills",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      count: stats.skills,
    },
    {
      title: "Experience",
      description: `${stats.experiences} work experiences`,
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      count: stats.experiences,
    },
    {
      title: "Education",
      description: `${stats.education} education entries`,
      icon: GraduationCap,
      href: "/admin/education",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      count: stats.education,
    },
    {
      title: "Projects",
      description: `${stats.projects} projects (${stats.featuredProjects} featured)`,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      count: stats.projects,
    },
    {
      title: "Recommendations",
      description: `${stats.recommendations} testimonials`,
      icon: Star,
      href: "/admin/recommendations",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      count: stats.recommendations,
    },
    {
      title: "Blog Posts",
      description: `${stats.blogs} posts (${stats.publishedBlogs} published)`,
      icon: BookOpen,
      href: "/admin/blogs",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      count: stats.blogs,
    },
    {
      title: "Social Links",
      description: `${stats.socialLinks} social platforms`,
      icon: LinkIcon,
      href: "/admin/social-links",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      count: stats.socialLinks,
    },
    {
      title: "Newsletter",
      description: `${stats.newsletterSubscribers} subscribers (${stats.activeSubscribers} active)`,
      icon: Users,
      href: "/admin/newsletter",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      count: stats.newsletterSubscribers,
    },
    {
      title: "Contact Messages",
      description: `${stats.contactRequests} total (${stats.pendingRequests} pending)`,
      icon: Mail,
      href: "/admin/messages",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      count: stats.contactRequests,
      badge: stats.pendingRequests > 0 ? stats.pendingRequests : undefined,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Welcome to your portfolio admin panel.
          </p>
        </motion.div>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Mail className="h-5 w-5" />
              API Connection Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Unable to fetch dashboard data. This could be because:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>The development server is still starting up</li>
              <li>The API routes are not accessible</li>
              <li>There's a network connectivity issue</li>
            </ul>
            <div className="flex gap-3 pt-4">
              <motion.button
                onClick={fetchDashboardData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Retry Connection
              </motion.button>
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
              >
                Reload Page
              </motion.button>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-xs font-medium mb-2">Development Server Commands:</p>
              <code className="text-xs bg-background p-2 rounded block">npm run dev</code>
              <p className="text-xs text-muted-foreground mt-2">
                Make sure the server is running on port 7000
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Welcome back! Here's an overview of your portfolio.
            </p>
          </div>
          <motion.button
            onClick={fetchDashboardData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects + stats.blogs + stats.experiences}</div>
            <p className="text-xs text-muted-foreground">Projects, Blogs & Experience</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Engagement</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">Total views • {stats.totalLikes} likes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscribers}</div>
            <p className="text-xs text-muted-foreground">of {stats.newsletterSubscribers} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">{stats.repliedRequests} replied</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Management Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card, index) => (
          <motion.div key={card.href} variants={itemVariants}>
            <Link href={card.href}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="cursor-pointer h-full shadow-md hover:shadow-xl transition-shadow duration-300 relative">
                  {card.badge && (
                    <Badge className="absolute -top-2 -right-2 z-10" variant="destructive">
                      {card.badge}
                    </Badge>
                  )}
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <motion.div
                      className={`p-2 rounded-lg ${card.bgColor}`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <card.icon className={`h-4 w-4 ${card.color}`} />
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{card.count}</div>
                    <CardDescription className="text-xs sm:text-sm">{card.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activities */}
      {recentActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {activity.type === 'blog' ? (
                        <BookOpen className="h-4 w-4 text-purple-500" />
                      ) : (
                        <Mail className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    {activity.status && (
                      <Badge variant={
                        activity.status === 'published' || activity.status === 'replied' 
                          ? 'default' 
                          : 'secondary'
                      }>
                        {activity.status}
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <TrendingUp className="h-5 w-5" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Skills", value: stats.skills, icon: Lightbulb, color: "text-yellow-500" },
                { label: "Projects", value: stats.projects, icon: FolderOpen, color: "text-orange-500" },
                { label: "Blog Posts", value: stats.blogs, icon: BookOpen, color: "text-purple-500" },
                { label: "Testimonials", value: stats.recommendations, icon: Star, color: "text-pink-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground text-center">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

