"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PostHeading } from "@/types";

import { cn } from "@/lib/utils";

interface TocProps {
  chapters: PostHeading[];
}

export function TableOfContents({ chapters }: TocProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          if (entry?.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px",
      },
    );

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Table of Contents">
      <ol className="list-none space-y-1">
        {chapters.map((heading: PostHeading) => (
          <li key={heading.slug}>
            <Link
              href={`#${heading.slug}`}
              className={cn(
                "relative block rounded-md px-3 py-1.5 text-sm transition-all duration-200",
                heading.heading === 3 && "ml-4",
                heading.heading === 4 && "ml-8",
                heading.heading === 5 && "ml-10",
                activeSlug === heading.slug
                  ? "bg-accent-foreground/10 font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent-foreground/5 hover:text-foreground",
              )}
            >
              {activeSlug === heading.slug && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-accent-foreground" />
              )}
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
