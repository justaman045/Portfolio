export type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: { message: string; sha: string }[];
    pull_request?: { title: string; html_url: string };
    issue?: { title: string; html_url: string };
    forkee?: { full_name: string };
  };
};

export type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type LangBreakdown = { name: string; count: number; percentage: number; color: string };

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  Dart: "#00B4AB",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Java: "#B07219",
  "C#": "#178600",
  HTML: "#E34F26",
  CSS: "#563D7C",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  "C++": "#F34B7D",
  C: "#555555",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  Makefile: "#427819",
};

const GITHUB_API = "https://api.github.com";
const USERNAME = "justaman045";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getUser(): Promise<GitHubUser> {
  return fetchJson<GitHubUser>(`${GITHUB_API}/users/${USERNAME}`);
}

export async function getEvents(): Promise<GitHubEvent[]> {
  return fetchJson<GitHubEvent[]>(`${GITHUB_API}/users/${USERNAME}/events/public?per_page=30`);
}

export async function getTotalStars(): Promise<number> {
  const repos = await fetchJson<any[]>(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`);
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

export async function getRepos(): Promise<GitHubRepo[]> {
  const data = await fetchJson<any[]>(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
  );
  return (data ?? []).map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    html_url: r.html_url,
    pushed_at: r.pushed_at,
    fork: r.fork ?? false,
    archived: r.archived ?? false,
  }));
}

export function getLanguageBreakdown(repos: GitHubRepo[]): LangBreakdown[] {
  const counts = new Map<string, number>();
  let total = 0;
  for (const r of repos) {
    if (r.language) {
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
      total++;
    }
  }
  if (total === 0) return [];
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
      color: LANG_COLORS[name] ?? "#6E7681",
    }))
    .sort((a, b) => b.count - a.count);
}

export function formatEvent(event: GitHubEvent): { icon: string; text: string; link?: string } {
  switch (event.type) {
    case "PushEvent": {
      const branch = (event.payload.ref ?? "").replace("refs/heads/", "");
      const count = event.payload.commits?.length ?? 0;
      const pushed = count > 0 ? `Pushed ${count} commit${count !== 1 ? "s" : ""}` : "Pushed";
      return {
        icon: "git-commit",
        text: `${pushed} to ${branch} in ${event.repo.name}`,
        link: `https://github.com/${event.repo.name}/commits/${branch}`,
      };
    }
    case "CreateEvent":
      return {
        icon: "git-branch",
        text: `Created ${event.payload.ref_type} ${event.payload.ref ?? ""} in ${event.repo.name}`,
        link: `https://github.com/${event.repo.name}`,
      };
    case "IssuesEvent":
      return {
        icon: "issue-opened",
        text: `${event.payload.action === "opened" ? "Opened" : "Closed"} issue "${event.payload.issue?.title}" in ${event.repo.name}`,
        link: event.payload.issue?.html_url,
      };
    case "PullRequestEvent":
      return {
        icon: "git-pull-request",
        text: `${event.payload.action === "opened" ? "Opened" : event.payload.action === "closed" ? "Merged" : "Updated"} PR "${event.payload.pull_request?.title}" in ${event.repo.name}`,
        link: event.payload.pull_request?.html_url,
      };
    case "ForkEvent":
      return {
        icon: "repo-forked",
        text: `Forked ${event.payload.forkee?.full_name ?? event.repo.name}`,
        link: `https://github.com/${event.payload.forkee?.full_name ?? event.repo.name}`,
      };
    case "WatchEvent":
      return {
        icon: "star",
        text: `Starred ${event.repo.name}`,
        link: `https://github.com/${event.repo.name}`,
      };
    default:
      return {
        icon: "git-commit",
        text: `${event.type.replace("Event", "")} in ${event.repo.name}`,
        link: `https://github.com/${event.repo.name}`,
      };
  }
}
