import type { Metadata, Viewport } from "next";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BackgroundEffect from "@/components/ui/backgroundEffect";
import { CustomDialogProvider } from "@/components/ui/custom-dialog";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { PagePreloader } from "@/components/ui/PagePreloader";
import { GlobalLoadingOverlay, LoadingProvider } from "@/contexts/loading-context";
import { domain, email, webImage, websitePath } from "@/data/Links";
import { ThemeProvider } from "@/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    template: "%s | Sohag Hossain - Full Stack Developer",
    default: "Sohag Hossain - Full Stack Developer & Portfolio",
  },
  description:
    "Explore the portfolio of Sohag Hossain, Full Stack Developer specializing in React, Node.js, TypeScript, and modern web technologies. View projects, experience, and contact details.",
  keywords: [
    "Sohag Hossain",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Portfolio",
    "Web Development",
    "UI/UX",
    "Projects",
    "Contact",
    "Resume",
    "Modern Web",
    "Tailwind CSS",
    "MongoDB",
    "Express.js",
    "AI Integration",
    "Remote Work",
  ].join(", "),
  authors: [{ name: "Sohag Hossain", url: websitePath.main }],
  creator: "Sohag Hossain",
  publisher: "Sohag Hossain",
  alternates: {
    canonical: websitePath.main,
    languages: {
      en: `${websitePath.main}/en`,
      ar: `${websitePath.main}/ar`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    title: "Sohag Hossain - Full Stack Developer Portfolio",
    description:
      "Discover the work and experience of Sohag Hossain, a passionate Full Stack Developer. Projects, skills, and contact info included.",
    url: websitePath.main,
    siteName: "Sohag Hossain Portfolio",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Sohag Hossain Portfolio Preview",
      },
    ],
    countryName: "Palestine",
    emails: [email],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohag Hossain - Full Stack Developer Portfolio",
    description:
      "Explore the portfolio of Sohag Hossain, Full Stack Developer. Projects, experience, and contact details.",
    images: webImage,
    creator: "@sohaghossain",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#16161a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-title" content="Sohag" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sohag Hossain",
              url: websitePath.main,
              image: webImage,
              sameAs: [
                "https://github.com/sohaghossain",
                "https://www.linkedin.com/in/sohaghossain/",
                "https://www.youtube.com/@sohaghossain",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              description:
                "Full Stack Developer with expertise in React, Node.js, TypeScript, and more.",
            }),
          }}
        />
      </head>
      <body className="flex relative flex-col overflow-x-hidden max-w-full" suppressHydrationWarning>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--background)] bg-[linear-gradient(to_right,var(--border-background)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-background)_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <SpeedInsights />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <PagePreloader />
            <CustomDialogProvider />
            <Toaster />
            <GlobalLoadingOverlay />
            <Navbar />
            <BackgroundEffect />
            <main className="z-40 max-md:z-30 mx-auto w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
            <FloatingActionButton threshold={400} />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
