import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { siteData } from "@/lib/siteData";
import { getAllProjects } from "@/lib/unified-projects";
import ProjectsFilter from "@/components/projects-filter";
import ProjectsClient, { AnimatedStatCard } from "@/components/projects-client";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "My projects",
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const githubCount = projects.filter((p) => p.source === "github").length;
  const hashnodeCount = projects.filter((p) => p.source === "hashnode").length;

  return (
    <ProjectsClient>
      <div className="container max-w-6xl pb-10">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold">Projects</h1>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Things I&apos;ve built — apps, tools, and experiments.
          </p>
        </div>

        <AnimatedStatCard>
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div>
              <div className="text-2xl font-bold">{githubCount}</div>
              <div className="text-sm text-muted-foreground">GitHub</div>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div>
              <div className="text-2xl font-bold">{hashnodeCount}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </div>
          </div>
        </AnimatedStatCard>

        <div className="mt-8">
          <ProjectsFilter projects={projects} />
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
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        )}
      </div>
    </ProjectsClient>
  );
}
