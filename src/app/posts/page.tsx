import SimpleBlogGrid from "@/components/sections/blog/SimpleBlogGrid";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

import { webImage, websitePath } from "@/data/Links";

export const metadata: Metadata = {
  title: "Blog Posts | Sohag Hossain - Portfolio",
  description:
    "Explore my latest blog posts on web development, programming, and technology insights.",
  keywords:
    "web development blog, programming tutorials, tech insights, portfolio blog",
  openGraph: {
    title: "Blog Posts - Sohag Hossain | Portfolio",
    description:
      "Discover my latest posts and articles on web development, programming, and technology.",
    url: websitePath.posts,
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Sohag Hossain Blog Posts",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Posts - Sohag Hossain | Portfolio",
    description:
      "Explore my latest blog posts on web development, programming, and technology.",
    images: webImage,
  },
};

export default function PostsPage() {
  const styles = {
    breadcrumbLink: "hover:text-[var(--paragraph)] hoverd",
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--headline)] mb-4">
            Blog Posts
          </h1>
          <p className="text-lg text-[var(--paragraph)] max-w-2xl mx-auto mb-8">
            Explore my thoughts on web development, programming, and technology
          </p>
          
          {/* Simple Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className={styles.breadcrumbLink} href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className={styles.breadcrumbLink} href="/posts">
                  Posts
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Blog Grid */}
        <SimpleBlogGrid />
      </div>
    </div>
  );
}
