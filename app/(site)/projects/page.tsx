import { Metadata } from "next";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/projects-data";
import { siteData } from "@/lib/siteData";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "My projects",
  };
}

export default async function ProjectsPage() {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Things I&apos;ve built — apps, tools, and experiments.
        </p>
        <time className="text-sm text-muted-foreground/60">Last updated: {format(new Date(currentDate), "LLLL d, yyyy")}</time>
      </div>

      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, i) => (
          <SpotlightCard key={item.href} {...item} index={i} />
        ))}
      </div>

      {siteData.resumeUrl && (
        <div className="mt-12 flex justify-center">
          <a
            href={siteData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-muted-foreground/30 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-accent-foreground/40 hover:text-accent-foreground"
          >
            View full resume
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      )}
    </div>
  );
}
