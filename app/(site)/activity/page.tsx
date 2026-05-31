import Image from "next/image";
import {
  BookOpen,
  ExternalLink,
  GitCommit,
  GitFork,
  Globe,
  Star,
  Users,
} from "lucide-react";

import { getAllPosts } from "@/lib/mdx";
import { defaultAuthor } from "@/lib/metadata";
import { sortByDate } from "@/lib/utils";
import {
  getUser,
  getEvents,
  getTotalStars,
  getRepos,
  getLanguageBreakdown,
  formatEvent,
} from "@/lib/github";
import { getDevtoProfile } from "@/lib/devto";
import type { GitHubEvent } from "@/lib/github";
import ActivityFeed from "@/components/activity-feed";
import ActivityClient from "./activity-client";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Activity",
    description: `Recent activity by ${defaultAuthor.name}`,
  };
}

const REPO_LANGUAGES = [
  { name: "Python", color: "#3572A5" },
  { name: "Dart", color: "#00B4AB" },
  { name: "JavaScript", color: "#F1E05A" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Java", color: "#B07219" },
  { name: "C#", color: "#178600" },
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#563D7C" },
  { name: "Shell", color: "#89E051" },
  { name: "Go", color: "#00ADD8" },
  { name: "Rust", color: "#DEA584" },
  { name: "Swift", color: "#F05138" },
  { name: "Kotlin", color: "#A97BFF" },
  { name: "PHP", color: "#4F5D95" },
];

function langColor(lang: string | null): string {
  if (!lang) return "#6E7681";
  const found = REPO_LANGUAGES.find(
    (l) => l.name.toLowerCase() === lang.toLowerCase(),
  );
  return found?.color ?? "#6E7681";
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

function getDateGroup(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This Week";
  return "Earlier";
}

function groupEvents(
  events: GitHubEvent[],
): Map<string, GitHubEvent[]> {
  const groups = new Map<string, GitHubEvent[]>();
  for (const event of events) {
    const group = getDateGroup(event.created_at);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(event);
  }
  const order = ["Today", "Yesterday", "This Week", "Earlier"];
  const ordered = new Map<string, GitHubEvent[]>();
  for (const key of order) {
    if (groups.has(key)) ordered.set(key, groups.get(key)!);
  }
  return ordered;
}

export default async function ActivityPage() {
  const [user, events, repos, totalStars, allPosts, devto] =
    await Promise.all([
      getUser().catch(() => null),
      getEvents().catch(() => []),
      getRepos().catch(() => []),
      getTotalStars().catch(() => 0),
      Promise.resolve(getAllPosts()),
      getDevtoProfile("justaman045").catch(() => null),
    ]);

  const recentPosts = allPosts
    .filter((p) => p.status === "published")
    .sort(sortByDate)
    .slice(0, 5);

  const langs = getLanguageBreakdown(repos);
  const maxLangCount = langs.length > 0 ? langs[0].count : 1;

  const sortedRepos = repos
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 6);

  return (
    <ActivityClient>
      <div className="container max-w-6xl pb-10">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold">Activity</h1>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Recent GitHub activity and published posts.
          </p>
        </div>

        {user && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={BookOpen} label="Public Repos" value={user.public_repos} />
            <StatCard icon={Users} label="Followers" value={user.followers} />
            <StatCard icon={Star} label="Total Stars" value={totalStars} />
            <StatCard icon={GitFork} label="Following" value={user.following} />
          </div>
        )}

        <div className="mb-8 overflow-hidden rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold">
            Contribution Graph
          </h2>
          <Image
            src={`https://ghchart.rshah.org/justaman045`}
            alt="GitHub contribution graph"
            width={800}
            height={128}
            className="w-full rounded-lg"
            unoptimized
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm lg:col-span-1">
            <h2 className="mb-4 font-heading text-lg font-semibold">
              Top Languages
            </h2>
            {langs.length > 0 ? (
              <div className="space-y-3">
                {langs.slice(0, 8).map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-foreground/80">{lang.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground/60">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(lang.count / maxLangCount) * 100}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground/60">
                No language data available.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <GitCommit size={18} className="text-muted-foreground" />
              <h2 className="font-heading text-lg font-semibold">
                Recent GitHub Activity
              </h2>
            </div>
            {events.length > 0 ? (
              <ActivityFeed events={events.slice(0, 5)} />
            ) : (
              <p className="text-sm text-muted-foreground/60">
                No recent public activity.
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {devto && devto.articles.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-muted-foreground" />
                <h2 className="font-heading text-lg font-semibold">
                  Latest Dev.to Articles
                </h2>
              </div>
              <div className="space-y-2">
                {devto.articles.slice(0, 3).map((article, i) => (
                  <a
                    key={article.url + i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-transparent p-3 transition-all hover:border-border/50 hover:bg-foreground/[0.02]"
                  >
                    <p className="text-sm font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                      {article.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/60">
                      {article.tags.slice(0, 40)}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-muted-foreground" />
              <h2 className="font-heading text-lg font-semibold">
                Latest Blog Posts
              </h2>
            </div>
            {recentPosts.length > 0 ? (
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post._id}>
                    <a
                      href={`/posts/${post.slug}`}
                      className="group block rounded-lg border border-transparent p-3 transition-all hover:border-border/50 hover:bg-foreground/[0.02]"
                    >
                      <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                        {post.title}
                      </span>
                      {post.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/70">
                          {post.description}
                        </p>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground/60">
                No posts published yet.
              </p>
            )}
          </div>
        </div>

        {sortedRepos.length > 0 && (
          <div className="rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Globe size={18} className="text-muted-foreground" />
              <h2 className="font-heading text-lg font-semibold">
                Recent Repositories
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sortedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-border/40 p-4 transition-all hover:border-accent-foreground/20 hover:bg-foreground/[0.02]"
                >
                  <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                    {repo.name}
                  </p>
                  {repo.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/70">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground/60">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: langColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </ActivityClient>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={16} />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 font-heading text-2xl font-bold">{value}</p>
    </div>
  );
}
