import { projects } from "@/lib/projects-data";
import { software } from "@/lib/uses-data";

export const knownTech = new Set([
  "flutter",
  "next.js",
  "react",
  "react.js",
  "python",
  "firebase",
  "selenium",
  "typescript",
  "javascript",
  "node.js",
  "express.js",
  "mongodb",
  "mongo db",
  "java",
  "django",
  "docker",
  "git",
  "dart",
  "ai",
  "openrouter",
  "razorpay",
  "cli",
  "seo",
  "pwa",
  "kanban",
  "pomodoro",
  "firebase",
  "tailwind",
  "saas",
  "api",
  "automation",
  "testing",
  "full-stack",
  "mobile",
  "web",
]);

export function inferSkillsFromProjects(): string[] {
  const found = new Set<string>();

  for (const project of projects) {
    const text = project.description.toLowerCase();
    for (const tech of knownTech) {
      if (text.includes(tech)) {
        found.add(tech);
      }
    }
  }

  return Array.from(found).sort();
}

export function getCoreSkills(): string[] {
  const softSet = new Set(
    software.map((s) => s.title.toLowerCase().replace(/\./g, "")),
  );

  const all = new Set<string>();

  for (const s of software) {
    all.add(s.title);
  }

  return Array.from(all).sort();
}

const genericTerms = new Set([
  "ai",
  "api",
  "automation",
  "cli",
  "kanban",
  "openrouter",
  "pomodoro",
  "pwa",
  "razorpay",
  "saas",
  "seo",
  "testing",
  "full-stack",
  "mobile",
  "web",
]);

export function getTopSkills(max = 10): string[] {
  const core = getCoreSkills();
  const project = inferSkillsFromProjects();

  const coreMap = new Map<string, string>();
  for (const s of core) {
    coreMap.set(s.toLowerCase().replace(/\./g, ""), s);
  }

  const merged = new Map<string, string>();
  for (const [key, name] of coreMap) {
    if (!genericTerms.has(key)) {
      merged.set(key, name);
    }
  }
  for (const s of project) {
    const key = s.toLowerCase().replace(/\./g, "");
    if (!genericTerms.has(key) && !merged.has(key)) {
      merged.set(key, s.charAt(0).toUpperCase() + s.slice(1));
    }
  }

  return Array.from(merged.values()).slice(0, max);
}

export function getInferredSkills(): string[] {
  return getTopSkills(30);
}
