"use client";

import {
  CircleDot,
  GitBranch,
  GitCommit,
  GitFork,
  GitPullRequest,
  Star,
} from "lucide-react";

import type { GitHubEvent } from "@/lib/github";
import { formatEvent } from "@/lib/github";

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

function EventIcon({ type }: { type: string }) {
  const className = "h-4 w-4 shrink-0";
  switch (type) {
    case "PushEvent":
      return <GitCommit className={className} />;
    case "CreateEvent":
      return <GitBranch className={className} />;
    case "IssuesEvent":
      return <CircleDot className={className} />;
    case "PullRequestEvent":
      return <GitPullRequest className={className} />;
    case "ForkEvent":
      return <GitFork className={className} />;
    case "WatchEvent":
      return <Star className={className} />;
    default:
      return <GitCommit className={className} />;
  }
}

export default function ActivityFeed({ events }: { events: GitHubEvent[] }) {
  return (
    <div className="relative space-y-0">
      {events.map((event, i) => {
        const formatted = formatEvent(event);
        return (
          <div key={event.id} className="relative flex gap-3 pb-4 pl-4">
            {i < events.length - 1 && (
              <div className="absolute bottom-0 left-[7px] top-4 w-px bg-border/50" />
            )}
            <div className="relative mt-0.5 flex h-4 w-4 items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 ring-2 ring-background" />
            </div>
            <div className="flex-1 min-w-0">
              {formatted.link ? (
                <a
                  href={formatted.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/80 transition-colors hover:text-accent-foreground"
                >
                  {formatted.text}
                </a>
              ) : (
                <p className="text-sm text-foreground/80">{formatted.text}</p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground/50">
                {timeAgo(event.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
