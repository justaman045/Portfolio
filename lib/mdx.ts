import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { PostHeading } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/posts");
const pagesDirectory = path.join(process.cwd(), "content/pages");

function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s/g).length;
  return Math.ceil(words / wordsPerMinute);
}

function getHeadings(raw: string): PostHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: PostHeading[] = [];
  let match;
  while ((match = headingRegex.exec(raw)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ heading: level, text, slug });
  }
  return headings;
}

function getAllMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort();
}

function readDoc<T = Record<string, unknown>>(
  filePath: string,
): { data: Record<string, unknown> & T; content: string; slug: string } | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath).replace(/\.(mdx?)$/, "");
  return { data: data as any, content, slug };
}

export interface PostDoc {
  title: string;
  description?: string;
  publishedDate: string;
  lastUpdatedDate?: string;
  username?: string;
  tags: string[];
  series?: { title: string; order: number };
  author?: { name: string; image?: string };
  status: "draft" | "published";
  tagSlugs: string[];
  readTimeMinutes: number;
  headings: PostHeading[];
  slug: string;
  body: { raw: string };
  _id: string;
  _raw: { flattenedPath: string };
  [key: string]: unknown;
}

export interface PageDoc {
  title: string;
  description?: string;
  lastUpdatedDate?: string;
  status: "draft" | "published";
  slug: string;
  body: { raw: string };
  _id: string;
  [key: string]: unknown;
}

export function getAllPosts(): PostDoc[] {
  const dir = postsDirectory;
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  function walk(dirPath: string) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }
  walk(dir);

  return files
    .map((filePath) => {
      const doc = readDoc(filePath);
      if (!doc) return null;
      const { data, content, slug } = doc;
      const status = (data.status as string) || "draft";
      const tags = ((data.tags as string[]) || []).filter(Boolean);
      return {
        ...data,
        title: (data.title as string) || "",
        publishedDate: (data.publishedDate as string) || "",
        lastUpdatedDate: data.lastUpdatedDate as string | undefined,
        username: data.username as string | undefined,
        tags,
        series: data.series as { title: string; order: number } | undefined,
        author: data.author as { name: string; image?: string } | undefined,
        status: status === "published" ? "published" : "draft",
        slug,
        tagSlugs: tags,
        readTimeMinutes: calculateReadTime(content),
        headings: getHeadings(content),
        body: { raw: content },
        _id: slug,
        _raw: { flattenedPath: `posts/${slug}` },
      } as PostDoc;
    })
    .filter((p): p is PostDoc => p !== null);
}

export function getAllPages(): PageDoc[] {
  const files = getAllMdxFiles(pagesDirectory);
  return files
    .map((fileName) => {
      const filePath = path.join(pagesDirectory, fileName);
      const doc = readDoc(filePath);
      if (!doc) return null;
      const { data, content, slug } = doc;
      const status = (data.status as string) || "draft";
      return {
        ...data,
        title: (data.title as string) || "",
        lastUpdatedDate: data.lastUpdatedDate as string | undefined,
        status: status === "published" ? "published" : "draft",
        slug,
        body: { raw: content },
        _id: slug,
      } as PageDoc;
    })
    .filter((p): p is PageDoc => p !== null);
}
