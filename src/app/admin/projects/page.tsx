"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DatabaseProject {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<DatabaseProject[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<DatabaseProject>>({
    title: "",
    description: "",
    image: "",
    link: "",
    tags: [],
    featured: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/projects');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing project
        const response = await fetch(`/api/v1/projects/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          toast.success("Project updated successfully!");
          fetchProjects(); // Refresh the list
        } else {
          throw new Error('Failed to update project');
        }
      } else {
        // Create new project
        const response = await fetch('/api/v1/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          toast.success("Project added successfully!");
          fetchProjects(); // Refresh the list
        } else {
          throw new Error('Failed to create project');
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleEdit = (proj: DatabaseProject) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || "",
      description: proj.description || "",
      image: proj.image || "",
      link: proj.link || "",
      tags: proj.tags || [],
      featured: proj.featured || false,
      order: proj.order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/v1/projects/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast.success("Project deleted successfully!");
          fetchProjects(); // Refresh the list
        } else {
          throw new Error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      tags: [],
      featured: false,
      order: 0,
    });
    setTechInput("");
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.tags?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tech),
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
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Project Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Project Link</Label>
                  <Input
                    id="link"
                    value={formData.link || ""}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.com or https://github.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="featured"
                    checked={formData.featured || false}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
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
                  {formData.tags?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button onClick={() => removeTechnology(tech)} className="hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>


              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {loading ? (
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-sm text-muted-foreground text-center">
                  Loading projects...
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : projects.length === 0 ? (
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
                key={proj.id}
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
                    <CardDescription>Order: {proj.order}</CardDescription>
                    <Badge variant="outline" className="text-xs">Published</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(proj)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(proj.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 line-clamp-3">{proj.description}</p>
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.tags.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 text-xs text-muted-foreground">
                  {proj.link && <span>🔗 Link</span>}
                  {proj.image && <span>🖼️ Image</span>}
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

