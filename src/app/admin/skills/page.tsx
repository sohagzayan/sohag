"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code, Edit, Lightbulb, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

interface SkillsByCategory {
  [category: string]: Skill[];
}

// Comprehensive IT/Full Stack Developer skill suggestions
const SKILL_SUGGESTIONS = [
  // PROGRAMMING LANGUAGES
  { name: "JavaScript", category: "PROGRAMMING LANGUAGES" },
  { name: "TypeScript", category: "PROGRAMMING LANGUAGES" },
  { name: "Python", category: "PROGRAMMING LANGUAGES" },
  { name: "Java", category: "PROGRAMMING LANGUAGES" },
  { name: "C#", category: "PROGRAMMING LANGUAGES" },
  { name: "C++", category: "PROGRAMMING LANGUAGES" },
  { name: "Go", category: "PROGRAMMING LANGUAGES" },
  { name: "Rust", category: "PROGRAMMING LANGUAGES" },
  { name: "PHP", category: "PROGRAMMING LANGUAGES" },
  { name: "Ruby", category: "PROGRAMMING LANGUAGES" },
  { name: "Kotlin", category: "PROGRAMMING LANGUAGES" },
  { name: "Swift", category: "PROGRAMMING LANGUAGES" },
  { name: "Scala", category: "PROGRAMMING LANGUAGES" },
  { name: "R", category: "PROGRAMMING LANGUAGES" },
  { name: "Perl", category: "PROGRAMMING LANGUAGES" },
  { name: "Dart", category: "PROGRAMMING LANGUAGES" },
  { name: "Clojure", category: "PROGRAMMING LANGUAGES" },
  { name: "Elixir", category: "PROGRAMMING LANGUAGES" },
  { name: "Haskell", category: "PROGRAMMING LANGUAGES" },
  { name: "Lua", category: "PROGRAMMING LANGUAGES" },
  { name: "MATLAB", category: "PROGRAMMING LANGUAGES" },
  { name: "HTML", category: "PROGRAMMING LANGUAGES" },
  { name: "CSS", category: "PROGRAMMING LANGUAGES" },
  { name: "SQL", category: "PROGRAMMING LANGUAGES" },
  
  // LIBRARIES & FRAMEWORKS
  { name: "React.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Next.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Vue.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Angular", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Svelte", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Nuxt.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Gatsby", category: "LIBRARIES & FRAMEWORKS" },
  { name: "SvelteKit", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Express.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Fastify", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Koa.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Hapi.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Nest.js", category: "LIBRARIES & FRAMEWORKS" },
  { name: "AdonisJS", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Strapi", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Django", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Flask", category: "LIBRARIES & FRAMEWORKS" },
  { name: "FastAPI", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Tornado", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Sanic", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Quart", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Spring Boot", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Spring MVC", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Spring Security", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Quarkus", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Micronaut", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Laravel", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Symfony", category: "LIBRARIES & FRAMEWORKS" },
  { name: "CodeIgniter", category: "LIBRARIES & FRAMEWORKS" },
  { name: "CakePHP", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Ruby on Rails", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Sinatra", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Hanami", category: "LIBRARIES & FRAMEWORKS" },
  { name: "ASP.NET Core", category: "LIBRARIES & FRAMEWORKS" },
  { name: "ASP.NET MVC", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Blazor", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Entity Framework", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Tailwind CSS", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Bootstrap", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Material-UI", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Ant Design", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Chakra UI", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Bulma", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Foundation", category: "LIBRARIES & FRAMEWORKS" },
  { name: "SASS", category: "LIBRARIES & FRAMEWORKS" },
  { name: "SCSS", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Less", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Stylus", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Redux", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Redux Toolkit", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Zustand", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Jotai", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Recoil", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Vuex", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Pinia", category: "LIBRARIES & FRAMEWORKS" },
  { name: "NgRx", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Prisma", category: "LIBRARIES & FRAMEWORKS" },
  { name: "TypeORM", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Sequelize", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Mongoose", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Drizzle", category: "LIBRARIES & FRAMEWORKS" },
  { name: "Knex.js", category: "LIBRARIES & FRAMEWORKS" },
  
  // INFRASTRUCTURE & TOOLS
  { name: "Node.js", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Deno", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Bun", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Git", category: "INFRASTRUCTURE & TOOLS" },
  { name: "GitHub", category: "INFRASTRUCTURE & TOOLS" },
  { name: "GitLab", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Bitbucket", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Docker", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Docker Compose", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Podman", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Kubernetes", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Helm", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Rancher", category: "INFRASTRUCTURE & TOOLS" },
  { name: "OpenShift", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Terraform", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Ansible", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Chef", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Puppet", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Vagrant", category: "INFRASTRUCTURE & TOOLS" },
  { name: "RESTful APIs", category: "INFRASTRUCTURE & TOOLS" },
  { name: "GraphQL", category: "INFRASTRUCTURE & TOOLS" },
  { name: "gRPC", category: "INFRASTRUCTURE & TOOLS" },
  { name: "WebSockets", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Socket.io", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Server-Sent Events", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Webpack", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Vite", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Rollup", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Parcel", category: "INFRASTRUCTURE & TOOLS" },
  { name: "esbuild", category: "INFRASTRUCTURE & TOOLS" },
  { name: "SWC", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Babel", category: "INFRASTRUCTURE & TOOLS" },
  { name: "PostCSS", category: "INFRASTRUCTURE & TOOLS" },
  { name: "AWS", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Azure", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Google Cloud Platform", category: "INFRASTRUCTURE & TOOLS" },
  { name: "DigitalOcean", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Linode", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Vercel", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Netlify", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Heroku", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Railway", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Render", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Fly.io", category: "INFRASTRUCTURE & TOOLS" },
  { name: "GitHub Actions", category: "INFRASTRUCTURE & TOOLS" },
  { name: "GitLab CI", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Jenkins", category: "INFRASTRUCTURE & TOOLS" },
  { name: "CircleCI", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Travis CI", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Drone", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Bamboo", category: "INFRASTRUCTURE & TOOLS" },
  { name: "TeamCity", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Firebase", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Supabase", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Appwrite", category: "INFRASTRUCTURE & TOOLS" },
  { name: "PocketBase", category: "INFRASTRUCTURE & TOOLS" },
  { name: "MongoDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "PostgreSQL", category: "INFRASTRUCTURE & TOOLS" },
  { name: "MySQL", category: "INFRASTRUCTURE & TOOLS" },
  { name: "MariaDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "SQLite", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Redis", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Memcached", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Cassandra", category: "INFRASTRUCTURE & TOOLS" },
  { name: "DynamoDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "CouchDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Neo4j", category: "INFRASTRUCTURE & TOOLS" },
  { name: "ArangoDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "InfluxDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "TimescaleDB", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Elasticsearch", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Solr", category: "INFRASTRUCTURE & TOOLS" },
  { name: "JWT", category: "INFRASTRUCTURE & TOOLS" },
  { name: "OAuth", category: "INFRASTRUCTURE & TOOLS" },
  { name: "OAuth2", category: "INFRASTRUCTURE & TOOLS" },
  { name: "OpenID Connect", category: "INFRASTRUCTURE & TOOLS" },
  { name: "SAML", category: "INFRASTRUCTURE & TOOLS" },
  { name: "LDAP", category: "INFRASTRUCTURE & TOOLS" },
  { name: "UML", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Systems Design", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Microservices", category: "INFRASTRUCTURE & TOOLS" },
  { name: "API Gateway", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Service Mesh", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Load Balancing", category: "INFRASTRUCTURE & TOOLS" },
  { name: "CDN", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Nginx", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Apache", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Caddy", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Traefik", category: "INFRASTRUCTURE & TOOLS" },
  { name: "OOP", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Functional Programming", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Design Patterns", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Clean Architecture", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Domain Driven Design", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Test Driven Development", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Agile", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Scrum", category: "INFRASTRUCTURE & TOOLS" },
  { name: "Kanban", category: "INFRASTRUCTURE & TOOLS" },
  
  // AI & MACHINE LEARNING
  { name: "Machine Learning", category: "AI & MACHINE LEARNING" },
  { name: "Deep Learning", category: "AI & MACHINE LEARNING" },
  { name: "Neural Networks", category: "AI & MACHINE LEARNING" },
  { name: "Computer Vision", category: "AI & MACHINE LEARNING" },
  { name: "Natural Language Processing", category: "AI & MACHINE LEARNING" },
  { name: "OpenCV", category: "AI & MACHINE LEARNING" },
  { name: "OpenAI API", category: "AI & MACHINE LEARNING" },
  { name: "TensorFlow", category: "AI & MACHINE LEARNING" },
  { name: "PyTorch", category: "AI & MACHINE LEARNING" },
  { name: "Keras", category: "AI & MACHINE LEARNING" },
  { name: "Scikit-learn", category: "AI & MACHINE LEARNING" },
  { name: "Pandas", category: "AI & MACHINE LEARNING" },
  { name: "NumPy", category: "AI & MACHINE LEARNING" },
  { name: "Matplotlib", category: "AI & MACHINE LEARNING" },
  { name: "Seaborn", category: "AI & MACHINE LEARNING" },
  { name: "Plotly", category: "AI & MACHINE LEARNING" },
  { name: "Jupyter", category: "AI & MACHINE LEARNING" },
  { name: "Google Colab", category: "AI & MACHINE LEARNING" },
  { name: "Kaggle", category: "AI & MACHINE LEARNING" },
  { name: "Hugging Face", category: "AI & MACHINE LEARNING" },
  { name: "LangChain", category: "AI & MACHINE LEARNING" },
  { name: "LlamaIndex", category: "AI & MACHINE LEARNING" },
  { name: "Pinecone", category: "AI & MACHINE LEARNING" },
  { name: "Weaviate", category: "AI & MACHINE LEARNING" },
  { name: "Chroma", category: "AI & MACHINE LEARNING" },
  { name: "MLflow", category: "AI & MACHINE LEARNING" },
  { name: "Kubeflow", category: "AI & MACHINE LEARNING" },
  { name: "Ray", category: "AI & MACHINE LEARNING" },
  { name: "Dask", category: "AI & MACHINE LEARNING" },
  { name: "Apache Spark", category: "AI & MACHINE LEARNING" },
  { name: "Hadoop", category: "AI & MACHINE LEARNING" },
  { name: "Apache Kafka", category: "AI & MACHINE LEARNING" },
  { name: "Apache Airflow", category: "AI & MACHINE LEARNING" },
  { name: "Prefect", category: "AI & MACHINE LEARNING" },
  { name: "Dagster", category: "AI & MACHINE LEARNING" },
  
  // OTHER
  { name: "Jest", category: "OTHER" },
  { name: "Cypress", category: "OTHER" },
  { name: "Playwright", category: "OTHER" },
  { name: "Vitest", category: "OTHER" },
  { name: "Testing Library", category: "OTHER" },
  { name: "React Testing Library", category: "OTHER" },
  { name: "Vue Test Utils", category: "OTHER" },
  { name: "Enzyme", category: "OTHER" },
  { name: "Mocha", category: "OTHER" },
  { name: "Chai", category: "OTHER" },
  { name: "Karma", category: "OTHER" },
  { name: "Jasmine", category: "OTHER" },
  { name: "Selenium", category: "OTHER" },
  { name: "WebDriver", category: "OTHER" },
  { name: "Puppeteer", category: "OTHER" },
  { name: "Figma", category: "OTHER" },
  { name: "Adobe XD", category: "OTHER" },
  { name: "Sketch", category: "OTHER" },
  { name: "InVision", category: "OTHER" },
  { name: "Marvel", category: "OTHER" },
  { name: "Photoshop", category: "OTHER" },
  { name: "Illustrator", category: "OTHER" },
  { name: "After Effects", category: "OTHER" },
  { name: "Premiere Pro", category: "OTHER" },
  { name: "Blender", category: "OTHER" },
  { name: "Maya", category: "OTHER" },
  { name: "3ds Max", category: "OTHER" },
  { name: "Cinema 4D", category: "OTHER" },
  { name: "Unity", category: "OTHER" },
  { name: "Unreal Engine", category: "OTHER" },
  { name: "Godot", category: "OTHER" },
  { name: "React Native", category: "OTHER" },
  { name: "Flutter", category: "OTHER" },
  { name: "Ionic", category: "OTHER" },
  { name: "Cordova", category: "OTHER" },
  { name: "PhoneGap", category: "OTHER" },
  { name: "Xamarin", category: "OTHER" },
  { name: "Electron", category: "OTHER" },
  { name: "Tauri", category: "OTHER" },
  { name: "Neutralino", category: "OTHER" },
  { name: "PWA", category: "OTHER" },
  { name: "WebAssembly", category: "OTHER" },
  { name: "WebGL", category: "OTHER" },
  { name: "Three.js", category: "OTHER" },
  { name: "D3.js", category: "OTHER" },
  { name: "Chart.js", category: "OTHER" },
  { name: "Recharts", category: "OTHER" },
  { name: "Apache ECharts", category: "OTHER" },
  { name: "Highcharts", category: "OTHER" },
  { name: "Observable", category: "OTHER" },
  { name: "Tableau", category: "OTHER" },
  { name: "Power BI", category: "OTHER" },
  { name: "Looker", category: "OTHER" },
  { name: "Metabase", category: "OTHER" },
  { name: "Grafana", category: "OTHER" },
  { name: "Kibana", category: "OTHER" },
  { name: "Splunk", category: "OTHER" },
  { name: "Datadog", category: "OTHER" },
  { name: "New Relic", category: "OTHER" },
  { name: "Sentry", category: "OTHER" },
  { name: "LogRocket", category: "OTHER" },
  { name: "Hotjar", category: "OTHER" },
  { name: "Mixpanel", category: "OTHER" },
  { name: "Amplitude", category: "OTHER" },
  { name: "Google Analytics", category: "OTHER" },
  { name: "Segment", category: "OTHER" },
  { name: "Zapier", category: "OTHER" },
  { name: "IFTTT", category: "OTHER" },
  { name: "Make", category: "OTHER" },
  { name: "n8n", category: "OTHER" },
  { name: "Airbyte", category: "OTHER" },
  { name: "Fivetran", category: "OTHER" },
  { name: "Stitch", category: "OTHER" },
];

const CATEGORIES = [
  "PROGRAMMING LANGUAGES",
  "LIBRARIES & FRAMEWORKS",
  "INFRASTRUCTURE & TOOLS",
  "AI & MACHINE LEARNING",
  "OTHER",
];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState("PROGRAMMING LANGUAGES");
  const [newLevel, setNewLevel] = useState(70);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLevel, setEditLevel] = useState(70);
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof SKILL_SUGGESTIONS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    // Filter suggestions based on input with performance optimization
    if (newSkill.trim()) {
      const searchTerm = newSkill.toLowerCase();
      const filtered = SKILL_SUGGESTIONS
        .filter(
          (suggestion) =>
            suggestion.name.toLowerCase().includes(searchTerm) &&
            !skills.some((s) => s.name.toLowerCase() === suggestion.name.toLowerCase())
        )
        .sort((a, b) => {
          // Prioritize exact matches and alphabetical order
          const aExact = a.name.toLowerCase().startsWith(searchTerm);
          const bExact = b.name.toLowerCase().startsWith(searchTerm);
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          return a.name.localeCompare(b.name);
        })
        .slice(0, 8);
      
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [newSkill, skills]);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/skills");
      const data = await response.json();
      if (data.success) {
        setSkills(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    const existingSkill = skills.find(
      (s) => s.name.toLowerCase() === newSkill.trim().toLowerCase()
    );

    if (existingSkill) {
      toast.error("This skill already exists!");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch("/api/v1/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSkill.trim(),
          category: newCategory,
          level: newLevel,
          order: skills.length,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSkills([...skills, data.data]);
        setNewSkill("");
        setNewLevel(70);
        setShowSuggestions(false);
        toast.success("Skill added successfully!");
      } else {
        toast.error(data.message || "Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
    setNewSkill(suggestion.name);
    setNewCategory(suggestion.category);
    setShowSuggestions(false);
  };

  const handleStartEdit = (skill: Skill) => {
    setEditingSkill(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category);
    setEditLevel(skill.level);
  };

  const handleCancelEdit = () => {
    setEditingSkill(null);
    setEditName("");
    setEditCategory("");
    setEditLevel(70);
  };

  const handleSaveEdit = async () => {
    if (!editingSkill || !editName.trim()) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/v1/skills/${editingSkill}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          category: editCategory,
          level: editLevel,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSkills(skills.map((s) => 
          s.id === editingSkill 
            ? { ...s, name: editName.trim(), category: editCategory, level: editLevel }
            : s
        ));
        handleCancelEdit();
        toast.success("Skill updated successfully!");
      } else {
        toast.error(data.message || "Failed to update skill");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Failed to update skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/v1/skills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      if (data.success) {
        setSkills(skills.map((s) => (s.id === id ? { ...s, ...updates } : s)));
        setEditingSkill(null);
        toast.success("Skill updated successfully!");
      } else {
        toast.error(data.message || "Failed to update skill");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Failed to update skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/v1/skills/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setSkills(skills.filter((s) => s.id !== id));
        toast.success("Skill deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill");
    }
  };

  // Group skills by category
  const skillsByCategory: SkillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as SkillsByCategory);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "PROGRAMMING LANGUAGES": "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400 dark:bg-blue-500/20",
      "LIBRARIES & FRAMEWORKS": "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/20",
      "INFRASTRUCTURE & TOOLS": "bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400 dark:bg-purple-500/20",
      "AI & MACHINE LEARNING": "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400 dark:bg-orange-500/20",
      "OTHER": "bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-400 dark:bg-slate-500/20",
    };
    return colors[category] || colors["OTHER"];
  };

  return (
    <div className="max-w-6xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Skills Management
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Add, edit, or remove your technical skills with categories and proficiency levels
        </p>
      </motion.div>

      {/* Add New Skill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Skill
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Enter a skill name and select its category. Suggestions will appear as you type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 relative">
                  <Label htmlFor="skill-name">Skill Name</Label>
                  <Input
                    id="skill-name"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., React, Node.js, Python..."
                    className="flex-1"
                    autoComplete="off"
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-200 flex items-center justify-between group border-b border-border/50 last:border-b-0"
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <span className="flex items-center gap-3">
                            <Lightbulb className="h-4 w-4 text-amber-500 group-hover:text-amber-600 transition-colors" />
                            <span className="font-medium text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{suggestion.name}</span>
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs transition-all duration-200 ${getCategoryColor(suggestion.category)} group-hover:scale-105`}
                          >
                            {suggestion.category}
                          </Badge>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skill-category">Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger id="skill-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-level">
                  Proficiency Level: {newLevel}%
                </Label>
                <Slider
                  id="skill-level"
                  value={[newLevel]}
                  onValueChange={(value) => setNewLevel(value[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!newSkill.trim() || isSaving}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isSaving ? "Adding..." : "Add Skill"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills by Category */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading skills...</p>
        </div>
      ) : Object.keys(skillsByCategory).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No skills added yet. Add your first skill above!
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {Object.entries(skillsByCategory)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, categorySkills], categoryIndex) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {category}
                      <Badge variant="outline" className={getCategoryColor(category)}>
                        {categorySkills.length}
                      </Badge>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="p-4 rounded-xl border bg-card hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 group"
                        >
                          {editingSkill === skill.id ? (
                            // Edit Form
                            <div className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-name-${skill.id}`}>Skill Name</Label>
                                  <Input
                                    id={`edit-name-${skill.id}`}
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="e.g., React, Node.js..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-category-${skill.id}`}>Category</Label>
                                  <Select value={editCategory} onValueChange={setEditCategory}>
                                    <SelectTrigger id={`edit-category-${skill.id}`}>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {CATEGORIES.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`edit-level-${skill.id}`}>
                                  Proficiency Level: {editLevel}%
                                </Label>
                                <Slider
                                  id={`edit-level-${skill.id}`}
                                  value={[editLevel]}
                                  onValueChange={(value) => setEditLevel(value[0])}
                                  max={100}
                                  step={5}
                                  className="w-full"
                                />
                              </div>
                              
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleCancelEdit}
                                  disabled={isSaving}
                                  className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  disabled={!editName.trim() || isSaving}
                                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  {isSaving ? "Saving..." : "Save"}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            // Display View
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-base">{skill.name}</h4>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${getCategoryColor(skill.category)}`}
                                  >
                                    {skill.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex-1">
                                    <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05 }}
                                        className={`h-full rounded-full shadow-sm ${
                                          skill.level >= 90 ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
                                          skill.level >= 70 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                                          skill.level >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                          'bg-gradient-to-r from-red-400 to-pink-500'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
                                    {skill.level}%
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStartEdit(skill)}
                                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-all duration-200"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteSkill(skill.id)}
                                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-all duration-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            ))}
        </motion.div>
      )}
    </div>
  );
}

