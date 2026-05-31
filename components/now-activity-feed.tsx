"use client";

import { CircleDot, GitBranch, GitCommit, GitFork, GitPullRequest, Star } from "lucide-react";

import type { GitHubEvent } from "@/lib/github";

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
  const className = "h-3.5 w-3.5 shrink-0 text-muted-foreground";
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

function eventSummary(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent": {
      const branch = (event.payload.ref ?? "").replace("refs/heads/", "");
      const count = event.payload.commits?.length ?? 0;
      return `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${branch} in ${event.repo.name}`;
    }
    case "CreateEvent":
      return `Created ${event.payload.ref_type} ${event.payload.ref ?? ""} in ${event.repo.name}`;
    case "IssuesEvent":
      return `${event.payload.action === "opened" ? "Opened" : "Closed"} issue "${event.payload.issue?.title ?? ""}" in ${event.repo.name}`;
    case "PullRequestEvent":
      return `${event.payload.action === "opened" ? "Opened" : event.payload.action === "closed" ? "Merged" : "Updated"} PR "${event.payload.pull_request?.title ?? ""}" in ${event.repo.name}`;
    case "ForkEvent":
      return `Forked ${event.repo.name}`;
    case "WatchEvent":
      return `Starred ${event.repo.name}`;
    default:
      return `${event.type.replace("Event", "")} in ${event.repo.name}`;
  }
}

export default function NowActivityFeed({ events }: { events: GitHubEvent[] }) {
  if (events.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground/60">No recent GitHub activity.</p>;
  }

  return (
    <div className="space-y-1">
      {events.slice(0, 10).map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-foreground/[0.02]"
        >
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-foreground/5">
            <EventIcon type={event.type} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-foreground/80">{eventSummary(event)}</p>
            <p className="text-xs text-muted-foreground/50">{timeAgo(event.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
