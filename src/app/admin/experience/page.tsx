"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DatabaseExperience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  logo: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<DatabaseExperience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<DatabaseExperience>>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    logo: "",
    order: 0,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/experiences');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setExperiences(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing experience
        const response = await fetch(`/api/v1/experiences/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          toast.success("Experience updated successfully!");
          fetchExperiences(); // Refresh the list
        } else {
          throw new Error('Failed to update experience');
        }
      } else {
        // Create new experience
        const response = await fetch('/api/v1/experiences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          toast.success("Experience added successfully!");
          fetchExperiences(); // Refresh the list
        } else {
          throw new Error('Failed to create experience');
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    }
  };

  const handleEdit = (exp: DatabaseExperience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      current: exp.current || false,
      description: exp.description || "",
      logo: exp.logo || "",
      order: exp.order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await fetch(`/api/v1/experiences/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast.success("Experience deleted successfully!");
          fetchExperiences(); // Refresh the list
        } else {
          throw new Error('Failed to delete experience');
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
        toast.error('Failed to delete experience');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      logo: "",
      order: 0,
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
            Experience Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your work experience and employment history
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
                Add Experience
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add New"} Experience</DialogTitle>
              <DialogDescription>
                Fill in the details about your work experience
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Job Title *</Label>
                  <Input
                    id="position"
                    value={formData.position || ""}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo || ""}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate || ""}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate || ""}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.current || false}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, current: checked as boolean, endDate: "" })
                  }
                />
                <Label htmlFor="current">Currently working here</Label>
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


              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Experience
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-sm text-muted-foreground text-center">
                  Loading experiences...
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  No experiences added yet. Add your first experience to get started!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle>{exp.position}</CardTitle>
                    <CardDescription>
                      {exp.company} • {exp.location}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {exp.current
                        ? "Present"
                        : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          }) : "Present"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(exp.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{exp.description}</p>
                {exp.logo && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold mb-1">Logo:</p>
                    <p className="text-sm text-muted-foreground break-all">{exp.logo}</p>
                  </div>
                )}
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

