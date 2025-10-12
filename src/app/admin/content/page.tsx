"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { contentData } from "@/data/Content";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminContent() {
  const [heroContent, setHeroContent] = useState({
    title: "",
    subtitle: "",
    description: "",
    greeting: "",
    name: "",
    tagline: "",
  });

  const [aboutContent, setAboutContent] = useState({
    title: "",
    subtitle: "",
    description: "",
    introduction: "",
    passion: "",
    approach: "",
  });

  const [footerContent, setFooterContent] = useState({
    title: "",
    subtitle: "",
    description: "",
    message: "",
    copyright: "",
  });

  useEffect(() => {
    // Load from localStorage or use default data
    const savedHero = localStorage.getItem("admin_content_hero");
    const savedAbout = localStorage.getItem("admin_content_about");
    const savedFooter = localStorage.getItem("admin_content_footer");

    if (savedHero) {
      setHeroContent(JSON.parse(savedHero));
    } else {
      const hero = contentData.find((c) => c.section === "hero");
      if (hero) {
        setHeroContent({
          title: hero.title,
          subtitle: hero.subtitle,
          description: hero.description,
          greeting: hero.content.greeting,
          name: hero.content.name,
          tagline: hero.content.tagline,
        });
      }
    }

    if (savedAbout) {
      setAboutContent(JSON.parse(savedAbout));
    } else {
      const about = contentData.find((c) => c.section === "about");
      if (about) {
        setAboutContent({
          title: about.title,
          subtitle: about.subtitle,
          description: about.description,
          introduction: about.content.introduction,
          passion: about.content.passion,
          approach: about.content.approach,
        });
      }
    }

    if (savedFooter) {
      setFooterContent(JSON.parse(savedFooter));
    } else {
      const footer = contentData.find((c) => c.section === "footer");
      if (footer) {
        setFooterContent({
          title: footer.title,
          subtitle: footer.subtitle,
          description: footer.description,
          message: footer.content.message,
          copyright: footer.content.copyright,
        });
      }
    }
  }, []);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_content_hero", JSON.stringify(heroContent));
    toast.success("Hero content updated successfully!");
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_content_about", JSON.stringify(aboutContent));
    toast.success("About content updated successfully!");
  };

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_content_footer", JSON.stringify(footerContent));
    toast.success("Footer content updated successfully!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Content Sections
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Manage content for different sections of your portfolio
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="footer">Footer Section</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                The first section visitors see on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={heroContent.title}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={heroContent.subtitle}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, subtitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-greeting">Greeting</Label>
                  <Input
                    id="hero-greeting"
                    value={heroContent.greeting}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, greeting: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-name">Name</Label>
                  <Input
                    id="hero-name"
                    value={heroContent.name}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-tagline">Tagline</Label>
                  <Input
                    id="hero-tagline"
                    value={heroContent.tagline}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, tagline: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={heroContent.description}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Hero Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>
                Tell visitors about yourself and your expertise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAboutSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-title">Title</Label>
                  <Input
                    id="about-title"
                    value={aboutContent.title}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-subtitle">Subtitle</Label>
                  <Input
                    id="about-subtitle"
                    value={aboutContent.subtitle}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, subtitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-description">Description</Label>
                  <Textarea
                    id="about-description"
                    value={aboutContent.description}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-introduction">Introduction</Label>
                  <Textarea
                    id="about-introduction"
                    value={aboutContent.introduction}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, introduction: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-passion">Passion</Label>
                  <Textarea
                    id="about-passion"
                    value={aboutContent.passion}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, passion: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-approach">Approach</Label>
                  <Textarea
                    id="about-approach"
                    value={aboutContent.approach}
                    onChange={(e) =>
                      setAboutContent({ ...aboutContent, approach: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save About Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Section</CardTitle>
              <CardDescription>
                Manage your footer and call-to-action content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFooterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="footer-title">Title</Label>
                  <Input
                    id="footer-title"
                    value={footerContent.title}
                    onChange={(e) =>
                      setFooterContent({ ...footerContent, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-subtitle">Subtitle</Label>
                  <Input
                    id="footer-subtitle"
                    value={footerContent.subtitle}
                    onChange={(e) =>
                      setFooterContent({ ...footerContent, subtitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-description">Description</Label>
                  <Textarea
                    id="footer-description"
                    value={footerContent.description}
                    onChange={(e) =>
                      setFooterContent({ ...footerContent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-message">Message</Label>
                  <Textarea
                    id="footer-message"
                    value={footerContent.message}
                    onChange={(e) =>
                      setFooterContent({ ...footerContent, message: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-copyright">Copyright Text</Label>
                  <Input
                    id="footer-copyright"
                    value={footerContent.copyright}
                    onChange={(e) =>
                      setFooterContent({ ...footerContent, copyright: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Footer Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </motion.div>
    </div>
  );
}

