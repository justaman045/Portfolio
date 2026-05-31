import { format, parseISO } from "date-fns";
import {
  BookOpen,
  Briefcase,
  ExternalLink,
  GitCommit,
  Globe,
  Hash,
  MapPin,
  Users,
} from "lucide-react";

import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/lib/projects-data";
import { defaultAuthor } from "@/lib/metadata";
import { siteData } from "@/lib/siteData";
import { getDevtoProfile } from "@/lib/devto";
import { getUser, getEvents } from "@/lib/github";
import { getHashnodeData } from "@/lib/hashnode";
import { getTopSkills } from "@/lib/skills";
import { sortByDate } from "@/lib/utils";
import NowActivityFeed from "@/components/now-activity-feed";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Now",
    description: `What ${defaultAuthor.name} is up to now`,
  };
}

function getSocialUrl(name: string): string | undefined {
  return defaultAuthor.socialProfiles.find((p) => p.name === name)?.link;
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

export default async function NowPage() {
  const [githubUser, githubEvents, devto, hashnode, allPosts] =
    await Promise.all([
      getUser().catch(() => null),
      getEvents().catch(() => []),
      getDevtoProfile("justaman045").catch(() => null),
      getHashnodeData().catch(() => null),
      Promise.resolve(getAllPosts()),
    ]);

  const publishedPosts = allPosts.filter((p) => p.status === "published").sort(sortByDate);
  const recentPosts = publishedPosts.slice(0, 3);

  const topSkills = getTopSkills();

  const totalArticles =
    (devto?.articles.length || 0) +
    (hashnode?.totalPosts || 0) +
    publishedPosts.length;

  const latestPost = publishedPosts[0] ?? null;
  const latestEvent = githubEvents[0] ?? null;
  const latestProject = projects[0] ?? null;

  const linkedinUrl = getSocialUrl("linkedin");
  const twitterUrl = getSocialUrl("x");

  const now = new Date();
  const today = format(now, "LLLL d, yyyy");

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Now</h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Quick way to check what I&apos;m up to these days.
        </p>
        <time className="mt-2 block text-sm text-muted-foreground/60">
          Auto-updated — {today}
        </time>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-5 rounded-xl border border-border/50 bg-background/30 p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="font-heading text-2xl font-bold leading-tight">
                {defaultAuthor.jobTitle} @ {defaultAuthor.company}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {defaultAuthor.location.city}, India
                </span>
                {defaultAuthor.availableForWork && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Open to work
                  </span>
                )}
              </div>
            </div>

            {latestProject && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Currently working as a {defaultAuthor.jobTitle.toLowerCase()} at{" "}
                {defaultAuthor.company}. Lately I&apos;ve been building{" "}
                &ldquo;{latestProject.title}&rdquo; — a{" "}
                {latestProject.description.charAt(0).toLowerCase() +
                  latestProject.description.slice(1).split(".")[0]}
                .
              </p>
            )}

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Recently, I&apos;ve been...
              </p>
              <div className="space-y-1.5 text-sm text-foreground/80">
                {latestProject && (
                  <div className="flex items-start gap-2">
                    <Briefcase size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <span>
                      Building &ldquo;{latestProject.title}&rdquo;
                    </span>
                  </div>
                )}
                {latestPost && (
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <span>
                      Writing &ldquo;{latestPost.title}&rdquo;
                    </span>
                  </div>
                )}
                {latestEvent && (
                  <div className="flex items-start gap-2">
                    <GitCommit size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <span>
                      {latestEvent.type === "PushEvent"
                        ? `Pushed to ${latestEvent.repo.name}`
                        : latestEvent.type === "CreateEvent"
                          ? `Created ${latestEvent.payload.ref_type} in ${latestEvent.repo.name}`
                          : `Activity on ${latestEvent.repo.name}`}{" "}
                      <span className="text-muted-foreground/60">
                        {timeAgo(latestEvent.created_at)}
                      </span>
                    </span>
                  </div>
                )}
                {!latestProject && !latestPost && !latestEvent && (
                  <span className="text-muted-foreground/60">Nothing to report yet</span>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {projects.length} Projects · {githubUser?.public_repos ?? "—"} GitHub Repos ·{" "}
              {totalArticles} Articles · {githubUser?.followers ?? "—"} Followers
            </p>

            {topSkills.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                  Building with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {topSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-border/30 pt-4">
              <a
                href={siteData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                <Globe size={14} />
                View full resume on Overleaf
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border/50 bg-background/30 p-5 shadow-sm">
            <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Platform Stats
            </h2>
            <div className="space-y-3">
              {githubUser && (
                <div className="flex items-center gap-3 rounded-lg border border-border/30 px-3 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
                    <GitCommit size={16} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60">GitHub</p>
                    <p className="text-sm font-medium">{githubUser.public_repos} repos · {githubUser.followers} followers</p>
                  </div>
                </div>
              )}
              {devto && (
                <div className="flex items-center gap-3 rounded-lg border border-border/30 px-3 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
                    <BookOpen size={16} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60">Dev.to</p>
                    <p className="text-sm font-medium">{devto.articles.length} articles · {devto.name}</p>
                  </div>
                </div>
              )}
              {hashnode ? (
                <div className="flex items-center gap-3 rounded-lg border border-border/30 px-3 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
                    <Hash size={16} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60">Hashnode</p>
                    <p className="text-sm font-medium">{hashnode.totalPosts} posts · {hashnode.followersCount} followers</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/30 px-3 py-2.5 opacity-60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/5">
                    <Hash size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60">Hashnode</p>
                    <p className="text-sm text-muted-foreground/60">Connect API →</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-background/30 p-5 shadow-sm">
            <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h2>
            <div className="flex flex-wrap gap-2">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent-foreground/30 hover:text-accent-foreground"
                >
                  <Globe size={12} />
                  LinkedIn
                  <ExternalLink size={10} />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent-foreground/30 hover:text-accent-foreground"
                >
                  <Globe size={12} />
                  Twitter/X
                  <ExternalLink size={10} />
                </a>
              )}
              {devto && (
                <a
                  href={devto.website || `https://dev.to/justaman045`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent-foreground/30 hover:text-accent-foreground"
                >
                  <Users size={12} />
                  Dev.to
                  <ExternalLink size={10} />
                </a>
              )}
              {hashnode && (
                <a
                  href={hashnode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent-foreground/30 hover:text-accent-foreground"
                >
                  <Hash size={12} />
                  Hashnode
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-background/30 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <GitCommit size={16} className="text-muted-foreground" />
            <h2 className="font-heading text-base font-semibold">Recent GitHub Activity</h2>
          </div>
          <NowActivityFeed events={githubEvents} />
        </div>

        <div className="space-y-6">
          {devto && devto.articles.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-background/30 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-muted-foreground" />
                <h2 className="font-heading text-base font-semibold">Latest Dev.to Articles</h2>
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
                      {article.readingTime} min read · {article.published ? format(parseISO(article.published), "MMM d, yyyy") : ""}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {recentPosts.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-background/30 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-muted-foreground" />
                <h2 className="font-heading text-base font-semibold">Latest Blog Posts</h2>
              </div>
              <div className="space-y-2">
                {recentPosts.map((post) => (
                  <a
                    key={post._id}
                    href={`/posts/${post.slug}`}
                    className="group block rounded-lg border border-transparent p-3 transition-all hover:border-border/50 hover:bg-foreground/[0.02]"
                  >
                    <p className="text-sm font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                      {post.title}
                    </p>
                    {post.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/60">
                        {post.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
