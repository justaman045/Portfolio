"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileText, Mail } from "lucide-react";

import { defaultAuthor } from "@/lib/metadata";
import { siteData } from "@/lib/siteData";
import { socialProfiles } from "@/lib/social-data";
import { Button } from "@/components/ui/button";

interface HeroProps {
  tagline?: string;
}

export function HeroSimple({ tagline }: HeroProps) {
  const githubUrl = socialProfiles.find((p) => p.name === "github")?.link;
  const linkedinUrl = socialProfiles.find((p) => p.name === "linkedin")?.link;
  const xUrl = socialProfiles.find((p) => p.name === "x")?.link;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="relative flex min-h-screen flex-col overflow-hidden border-b border-border/40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,hsl(223,94%,66%,0.08),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container relative flex flex-1 max-w-5xl flex-col items-center justify-center text-center">
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for new projects
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 blur-xl" />
            <Image
              className="relative h-24 w-24 rounded-full border-2 border-border object-cover shadow-lg sm:h-28 sm:w-28"
              width={112}
              height={112}
              src="/aman3.png"
              alt={defaultAuthor.name}
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          {defaultAuthor.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-1 text-base text-muted-foreground/60 sm:text-lg"
        >
          {defaultAuthor.handle}
        </motion.p>

        {tagline && (
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {tagline}
          </motion.p>
        )}

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="default" size="sm" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`mailto:${defaultAuthor.email}`}>
              <Mail className="mr-1.5 h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-4 text-muted-foreground"
        >
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          )}
          {xUrl && (
            <Link
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          )}
          {siteData.resumeUrl && (
            <Link
              href={siteData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="Resume"
            >
              <FileText size={20} />
            </Link>
          )}
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-1 text-xs text-muted-foreground/40"
        >
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.div>
      </div>
    </motion.section>
  );
}
