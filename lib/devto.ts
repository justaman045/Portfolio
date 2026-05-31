export type DevtoArticle = {
  title: string;
  url: string;
  tags: string;
  published: string;
  readingTime: number;
};

type DevtoProfile = {
  name: string;
  bio: string;
  location: string;
  twitter: string;
  github: string;
  website: string;
  articles: DevtoArticle[];
};

async function fetchJson<T>(url: string, timeoutMs = 5000): Promise<T | null> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!resp.ok) return null;
    return (await resp.json()) as T;
  } catch {
    return null;
  }
}

export async function getDevtoProfile(username: string): Promise<DevtoProfile | null> {
  const profile = await fetchJson<Record<string, unknown>>(
    `https://dev.to/api/users/by_username?url=${username}`
  );
  if (!profile) return null;

  const articles = await fetchJson<Array<Record<string, unknown>>>(
    `https://dev.to/api/articles?username=${username}&per_page=6`
  );

  return {
    name: (profile.name as string) || "",
    bio: (profile.summary as string) || "",
    location: (profile.location as string) || "",
    twitter: (profile.twitter_username as string) || "",
    github: (profile.github_username as string) || "",
    website: (profile.website_url as string) || "",
    articles: (articles || []).map((a) => ({
      title: (a.title as string) || "",
      url: (a.url as string) || "",
      tags: ((a.tag_list as string[]) || []).join(" · "),
      published: (a.published_at as string) || "",
      readingTime: (a.reading_time_minutes as number) || 0,
    })),
  };
}

export async function getDevtoArticles(username: string): Promise<DevtoArticle[]> {
  const data = await getDevtoProfile(username);
  return data?.articles || [];
}
