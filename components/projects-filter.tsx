"use client";

import { useMemo, useState } from "react";
import { Code, GitFork, Hash, Search, X } from "lucide-react";

import { SpotlightCard } from "@/components/spotlight-card";
import type { ProjectSource, UnifiedProject } from "@/lib/unified-projects";

const sourceIcons: Partial<Record<ProjectSource, typeof Code>> = {
  github: GitFork,
  hashnode: Hash,
};

const sourceLabels: Partial<Record<ProjectSource, string>> = {
  github: "GitHub",
  hashnode: "Hashnode",
};

const sourceColors: Partial<Record<ProjectSource, string>> = {
  github:
    "data-[active=false]:bg-background/50 data-[active=false]:text-muted-foreground data-[active=false]:ring-border/50 data-[active=false]:hover:ring-blue-500/30 data-[active=false]:hover:text-blue-500 data-[active=true]:bg-blue-500/15 data-[active=true]:text-blue-500 data-[active=true]:ring-blue-500/30",
  hashnode:
    "data-[active=false]:bg-background/50 data-[active=false]:text-muted-foreground data-[active=false]:ring-border/50 data-[active=false]:hover:ring-emerald-500/30 data-[active=false]:hover:text-emerald-500 data-[active=true]:bg-emerald-500/15 data-[active=true]:text-emerald-500 data-[active=true]:ring-emerald-500/30",
};

export default function ProjectsFilter({
  projects,
}: {
  projects: UnifiedProject[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<ProjectSource | null>(
    null,
  );

  const categories = useMemo(() => {
    const set = new Set(
      projects.map((p) => p.category).filter((c): c is string => !!c),
    );
    return Array.from(set).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesSearch =
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.techStack.some((t) => t.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }
      if (selectedSource && project.source !== selectedSource) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedSource, projects]);

  const hasActiveFilters =
    searchQuery.trim() || selectedCategory !== null || selectedSource !== null;

  const sourceList: ProjectSource[] = ["github", "hashnode"];
  const hasSources = sourceList.some((s) =>
    projects.some((p) => p.source === s),
  );

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-border/50 bg-background/50 py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-foreground/30 focus:outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground/50 hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedCategory === null
                ? "bg-accent-foreground/15 text-accent-foreground ring-1 ring-accent-foreground/30"
                : "bg-background/50 text-muted-foreground ring-1 ring-border/50 hover:ring-accent-foreground/30 hover:text-accent-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isActive ? null : cat)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-accent-foreground/15 text-accent-foreground ring-1 ring-accent-foreground/30"
                    : "bg-background/50 text-muted-foreground ring-1 ring-border/50 hover:ring-accent-foreground/30 hover:text-accent-foreground"
                }`}
              >
                {cat}
                {isActive && <X size={12} className="ml-1" />}
              </button>
            );
          })}
        </div>

        {hasSources && (
          <div className="flex flex-wrap items-center gap-1.5">
            {sourceList.map((source) => {
              const count = projects.filter((p) => p.source === source).length;
              if (count === 0) return null;
              const Icon = sourceIcons[source] ?? Code;
              const isActive = selectedSource === source;
              return (
                <button
                  key={source}
                  onClick={() =>
                    setSelectedSource(isActive ? null : source)
                  }
                  data-active={isActive}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 transition-all ${sourceColors[source]}`}
                >
                  <Icon size={12} />
                  {sourceLabels[source]}
                  <span className="opacity-60">{count}</span>
                  {isActive && <X size={12} className="ml-0.5" />}
                </button>
              );
            })}
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground/60">
              {filteredProjects.length === 0
                ? "No projects match your filters"
                : `Showing ${filteredProjects.length} of ${projects.length} projects`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedSource(null);
              }}
              className="text-sm text-muted-foreground/60 underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((item, i) => (
          <SpotlightCard
            key={item.id}
            title={item.title}
            description={item.description}
            mediaSrc={item.imageUrl}
            href={item.url}
            index={i}
            source={item.source}
            techStack={item.techStack}
            stars={item.stars}
            forks={item.forks}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <Search size={32} className="text-muted-foreground/20" />
          <p className="text-sm text-muted-foreground/60">
            No projects match your filters
          </p>
        </div>
      )}
    </div>
  );
}
