// Fallback data for instant loading - shows immediately while real data loads in background

export const fallbackProjects = [
  {
    id: "1",
    title: "Samtax",
    description: "A comprehensive tax management platform built with modern web technologies. Features include automated tax calculations, document management, and real-time reporting for businesses of all sizes.",
    type: "SaaS Platform",
    website: "https://samtax.com",
    github: "https://github.com/balshaer/samtax",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    status: "Published",
    featured: true,
    created: "2024-01-15",
    updated: "2024-12-01",
    logoFileName: "samtax.svg",
    screenshotUrl: "/logos/samtax.svg",
    gradient: "from-blue-500 to-purple-600",
    stats: { views: 1250, likes: 89, feedbacks: 12 },
    highlights: ["Automated tax calculations", "Real-time reporting", "Document management"]
  },
  {
    id: "2", 
    title: "SFB",
    description: "A modern banking application with advanced security features and seamless user experience. Built for the next generation of digital banking with real-time transactions and AI-powered insights.",
    type: "Web Application",
    website: "https://sfb-demo.com",
    github: "https://github.com/balshaer/sfb",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    status: "Published",
    featured: true,
    created: "2024-03-20",
    updated: "2024-11-28",
    logoFileName: "sfb.svg",
    screenshotUrl: "/logos/sfb.svg", 
    gradient: "from-green-500 to-teal-600",
    stats: { views: 980, likes: 67, feedbacks: 8 },
    highlights: ["Advanced security", "Real-time transactions", "AI insights"]
  },
  {
    id: "3",
    title: "Gradients CSS",
    description: "A beautiful collection of CSS gradients and animations for modern web development. Features hundreds of hand-picked gradients with easy copy-paste implementation.",
    type: "Tool",
    website: "https://gradientscss.com",
    github: "https://github.com/balshaer/gradients-css",
    technologies: ["CSS3", "JavaScript", "Vite", "Sass"],
    status: "Published",
    featured: true,
    created: "2024-02-10",
    updated: "2024-10-15",
    logoFileName: "gradientscss.png",
    screenshotUrl: "/logos/gradientscss.png",
    gradient: "from-orange-500 to-red-600",
    stats: { views: 2100, likes: 156, feedbacks: 23 },
    highlights: ["200+ gradients", "Easy implementation", "Modern animations"]
  }
];

export const fallbackExperiences = [
  {
    id: "1",
    company: "Samtax",
    position: "Full Stack Developer",
    location: "Remote",
    startDate: "2023-06-01",
    endDate: null,
    current: true,
    description: "Leading the development of a comprehensive tax management platform. Built scalable microservices architecture, implemented automated tax calculations, and created intuitive user interfaces. Technologies include React, Node.js, TypeScript, and MongoDB.",
    logo: null,
    order: 1,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  },
  {
    id: "2",
    company: "Freelance",
    position: "Full Stack Developer",
    location: "Remote", 
    startDate: "2022-01-01",
    endDate: "2023-05-31",
    current: false,
    description: "Developed custom web applications for various clients including e-commerce platforms, business management tools, and portfolio websites. Specialized in React, Node.js, and modern web technologies.",
    logo: null,
    order: 2,
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2023-05-31T00:00:00Z"
  },
  {
    id: "3",
    company: "University Project",
    position: "Software Development Intern",
    location: "Local University",
    startDate: "2021-06-01",
    endDate: "2021-12-31",
    current: false,
    description: "Worked on developing educational management systems and student portal applications. Gained experience in full-stack development, database design, and team collaboration.",
    logo: null,
    order: 3,
    createdAt: "2021-06-01T00:00:00Z",
    updatedAt: "2021-12-31T00:00:00Z"
  }
];

export const fallbackSkills = [
  { id: "1", name: "React", category: "Frontend", level: 95, icon: "⚛️" },
  { id: "2", name: "TypeScript", category: "Language", level: 90, icon: "🔷" },
  { id: "3", name: "Node.js", category: "Backend", level: 88, icon: "🟢" },
  { id: "4", name: "Next.js", category: "Framework", level: 92, icon: "▲" },
  { id: "5", name: "MongoDB", category: "Database", level: 85, icon: "🍃" },
  { id: "6", name: "PostgreSQL", category: "Database", level: 82, icon: "🐘" },
  { id: "7", name: "Tailwind CSS", category: "Styling", level: 95, icon: "🎨" },
  { id: "8", name: "Prisma", category: "ORM", level: 87, icon: "⚡" }
];
