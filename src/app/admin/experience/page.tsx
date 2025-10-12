"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Experience, experiencesData } from "@/data/Experiences";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: "",
    company: "",
    companyUrl: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: [],
    achievements: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_experiences");
    if (saved) {
      setExperiences(JSON.parse(saved));
    } else {
      setExperiences(experiencesData);
    }
  }, []);

  const saveExperiences = (data: Experience[]) => {
    setExperiences(data);
    localStorage.setItem("admin_experiences", JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const updated = experiences.map((exp) =>
        exp._id === editingId ? { ...exp, ...formData, updatedAt: new Date().toISOString() } : exp
      );
      saveExperiences(updated);
      toast.success("Experience updated successfully!");
    } else {
      const newExp: Experience = {
        ...formData,
        _id: `exp_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Experience;
      saveExperiences([...experiences, newExp]);
      toast.success("Experience added successfully!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp._id);
    setFormData(exp);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      saveExperiences(experiences.filter((exp) => exp._id !== id));
      toast.success("Experience deleted successfully!");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      company: "",
      companyUrl: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: [],
      achievements: [],
    });
    setSkillInput("");
    setAchievementInput("");
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter((s) => s !== skill),
    });
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()],
      });
      setAchievementInput("");
    }
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter((_, i) => i !== index),
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
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyUrl">Company URL</Label>
                  <Input
                    id="companyUrl"
                    value={formData.companyUrl}
                    onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
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
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.current}
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                <div className="flex gap-2">
                  <Input
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    placeholder="Add an achievement"
                  />
                  <Button type="button" onClick={addAchievement}>Add</Button>
                </div>
                <ul className="space-y-2 mt-2">
                  {formData.achievements?.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="flex-1">{achievement}</span>
                      <button
                        onClick={() => removeAchievement(index)}
                        className="text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Experience
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {experiences.length === 0 ? (
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
                key={exp._id}
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
                    <CardTitle>{exp.title}</CardTitle>
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
                        : new Date(exp.endDate!).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(exp._id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{exp.description}</p>
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {achievement}
                        </li>
                      ))}
                    </ul>
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

