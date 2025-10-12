"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Recommendation, recommendationsData } from "@/data/Recommendations";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Recommendation>>({
    name: "",
    position: "",
    company: "",
    text: "",
    relationship: "Colleague",
    avatar: "",
    featured: false,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_recommendations");
    if (saved) {
      setRecommendations(JSON.parse(saved));
    } else {
      setRecommendations(recommendationsData);
    }
  }, []);

  const saveRecommendations = (data: Recommendation[]) => {
    setRecommendations(data);
    localStorage.setItem("admin_recommendations", JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const updated = recommendations.map((rec) =>
        rec._id === editingId ? { ...rec, ...formData, updatedAt: new Date().toISOString() } : rec
      );
      saveRecommendations(updated);
      toast.success("Recommendation updated successfully!");
    } else {
      const newRec: Recommendation = {
        ...formData,
        _id: `rec_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Recommendation;
      saveRecommendations([...recommendations, newRec]);
      toast.success("Recommendation added successfully!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (rec: Recommendation) => {
    setEditingId(rec._id);
    setFormData(rec);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recommendation?")) {
      saveRecommendations(recommendations.filter((rec) => rec._id !== id));
      toast.success("Recommendation deleted successfully!");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      company: "",
      text: "",
      relationship: "Colleague",
      avatar: "",
      featured: false,
      date: new Date().toISOString(),
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
            Recommendations Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage testimonials and recommendations from colleagues and clients
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
                Add Recommendation
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add New"} Recommendation</DialogTitle>
              <DialogDescription>
                Fill in the details about the recommendation
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value: any) => setFormData({ ...formData, relationship: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Colleague">Colleague</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Recommendation Text *</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date?.split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured">Featured Recommendation</Label>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Recommendation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {recommendations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  No recommendations added yet. Add your first recommendation to get started!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{rec.name}</CardTitle>
                      {rec.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <CardDescription>
                      {rec.position} at {rec.company}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      {rec.relationship} • {new Date(rec.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(rec)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(rec._id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic">&ldquo;{rec.text}&rdquo;</p>
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

