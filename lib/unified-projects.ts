import { getRepos } from "@/lib/github";
import { getHashnodePosts } from "@/lib/sources/hashnode-posts";
import { projects as manualProjects } from "@/lib/projects-data";
import { knownTech } from "@/lib/skills";

export type ProjectSource = "manual" | "github" | "hashnode";

export type UnifiedProject = {
  id: string;
  title: string;
  description: string;
  url: string;
  source: ProjectSource;
  category?: string;
  techStack: string[];
  stars?: number;
  forks?: number;
  language?: string;
  imageUrl?: string;
  publishedAt?: string;
};

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function inferTechStack(text: string): string[] {
  const found: string[] = [];
  const lower = text.toLowerCase();
  for (const tech of knownTech) {
    if (lower.includes(tech)) {
      found.push(tech.charAt(0).toUpperCase() + tech.slice(1));
    }
  }
  return [...new Set(found)].sort();
}

export async function getAllProjects(): Promise<UnifiedProject[]> {
  const [githubRepos, hashnodePosts] = await Promise.all([
    getRepos().catch(() => [] as Awaited<ReturnType<typeof getRepos>>),
    getHashnodePosts().catch(() => []),
  ]);

  const matchedTitles = new Set<string>();

  const github = githubRepos
    .filter((r) => !r.fork && !r.archived)
    .map((r) => {
      const norm = normalize(r.name);
      const manual = manualProjects.find(
        (p) => normalize(p.title) === norm,
      );
      let techStack = r.language ? [r.language] : [];
      if (manual) {
        matchedTitles.add(norm);
        const inferred = inferTechStack(manual.description);
        techStack = [...new Set([...techStack, ...inferred])];
        if (manual.category && !techStack.includes(manual.category)) {
          techStack.unshift(manual.category);
        }
      }
      return {
        id: `github-${norm}`,
        title: manual?.title ?? r.name,
        description: manual?.description ?? r.description ?? "",
        url: r.html_url,
        source: "github" as const,
        category: manual?.category,
        techStack,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language ?? undefined,
        imageUrl: manual?.mediaSrc,
        publishedAt: r.pushed_at,
      };
    });

  const manual: UnifiedProject[] = manualProjects
    .filter((p) => !matchedTitles.has(normalize(p.title)))
    .map((p) => {
      const techStack = inferTechStack(p.description);
      if (p.category && !techStack.includes(p.category)) {
        techStack.unshift(p.category);
      }
      return {
        id: `manual-${normalize(p.title)}`,
        title: p.title,
        description: p.description,
        url: p.href,
        source: "manual",
        category: p.category,
        techStack,
        imageUrl: p.mediaSrc,
      };
    });

  const hashnode: UnifiedProject[] = hashnodePosts.map((p, i) => ({
    id: `hashnode-${normalize(p.title)}-${i}`,
    title: p.title,
    description: p.tags.join(" · "),
    url: p.url,
    source: "hashnode" as const,
    techStack: p.tags,
    publishedAt: p.publishedAt,
  }));

  const sortedGithub = github.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));

  return [...sortedGithub, ...manual, ...hashnode];
}
