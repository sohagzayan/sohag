"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project, projectsData } from "@/data/Projects";
import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    projectType: "Web Application",
    websiteUrl: "",
    githubUrl: "",
    videoUrl: "",
    technologies: [],
    featured: false,
    status: "Published",
    images: [],
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(projectsData);
    }
  }, []);

  const saveProjects = (data: Project[]) => {
    setProjects(data);
    localStorage.setItem("admin_projects", JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const updated = projects.map((proj) =>
        proj._id === editingId ? { ...proj, ...formData, updatedAt: new Date().toISOString() } : proj
      );
      saveProjects(updated);
      toast.success("Project updated successfully!");
    } else {
      const newProj: Project = {
        ...formData,
        _id: `proj_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Project;
      saveProjects([...projects, newProj]);
      toast.success("Project added successfully!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (proj: Project) => {
    setEditingId(proj._id);
    setFormData(proj);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      saveProjects(projects.filter((proj) => proj._id !== id));
      toast.success("Project deleted successfully!");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      projectType: "Web Application",
      websiteUrl: "",
      githubUrl: "",
      videoUrl: "",
      technologies: [],
      featured: false,
      status: "Published",
      images: [],
    });
    setTechInput("");
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== tech),
    });
  };

  return (
    <div className="max-w-6xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Projects Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Showcase your portfolio projects and work
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add New"} Project</DialogTitle>
              <DialogDescription>
                Fill in the details about your project
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Application">Web Application</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                      <SelectItem value="Tool">Tool</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add a technology"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTechnology}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button onClick={() => removeTechnology(tech)} className="hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {projects.length === 0 ? (
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  No projects added yet. Add your first project to get started!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {projects.map((proj, index) => (
              <motion.div
                key={proj._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{proj.title}</CardTitle>
                      {proj.featured && (
                        <Badge variant="default" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <CardDescription>{proj.projectType}</CardDescription>
                    <Badge variant="outline" className="text-xs">{proj.status}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(proj)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(proj._id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 line-clamp-3">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 text-xs text-muted-foreground">
                  {proj.websiteUrl && <span>🌐 Website</span>}
                  {proj.githubUrl && <span>📦 GitHub</span>}
                  {proj.videoUrl && <span>🎥 Video</span>}
                </div>
              </CardContent>
            </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

