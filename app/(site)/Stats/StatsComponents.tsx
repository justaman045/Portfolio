import siteMetadata from "@/lib/metadata";

type PlatformStats = {
  url: string;
  platformName: string;
  followers?: number | string;
  numberOfArticles?: number | string;
};

type CodingStats = {
  username: string;
  public_repo: number;
  followers?: number;
  platform: string;
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...init,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

export async function getDevProfile(): Promise<PlatformStats | null> {
  const articles = await fetchJson<unknown[]>(
    `https://dev.to/api/articles?username=${encodeURIComponent(siteMetadata.username)}`
  );

  const apiKey = process.env.DEVTO_API_KEY;
  const followers = apiKey
    ? await fetchJson<unknown[]>("https://dev.to/api/followers/users?per_page=1000", {
        headers: { "api-key": apiKey },
      })
    : null;

  return {
    url: `https://dev.to/${siteMetadata.username}`,
    numberOfArticles: articles?.length ?? 0,
    followers: followers?.length ?? "private",
    platformName: "Dev.to",
  };
}

export async function getHashnodeData(): Promise<PlatformStats | null> {
  const apiKey = process.env.HASHNODE_API_KEY;

  if (!apiKey) {
    return null;
  }

  const query = `
    query User($username: String!) {
      user(username: $username) {
        followersCount
        publications(first: 50) {
          edges {
            node {
              url
              posts(first: 20) {
                totalDocuments
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchJson<{
    data?: {
      user?: {
        followersCount?: number;
        publications?: {
          edges?: Array<{
            node?: {
              url?: string;
              posts?: { totalDocuments?: number };
            };
          }>;
        };
      };
    };
  }>("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({ query, variables: { username: siteMetadata.username } }),
  });

  const publication = data?.data?.user?.publications?.edges?.[0]?.node;

  if (!data?.data?.user || !publication) {
    return null;
  }

  return {
    url: publication.url ?? `https://${siteMetadata.username}.hashnode.dev`,
    followers: data.data.user.followersCount ?? 0,
    numberOfArticles: publication.posts?.totalDocuments ?? 0,
    platformName: "Hashnode",
  };
}

export async function fetchSubscribers(): Promise<PlatformStats | null> {
  const apiSecret = process.env.CONVERTKIT_API_KEY;
  const newsletterUrl = siteMetadata.newsletterUrl ?? defaultNewsletterUrl;

  if (!apiSecret) {
    return {
      url: newsletterUrl,
      followers: "private",
      platformName: "Newsletter",
    };
  }

  const params = new URLSearchParams({ api_secret: apiSecret });
  const data = await fetchJson<{ total_subscribers?: number }>(
    `https://api.convertkit.com/v3/subscribers?${params.toString()}`
  );

  return {
    url: newsletterUrl,
    followers: data?.total_subscribers ?? 0,
    platformName: "Newsletter",
  };
}

const defaultNewsletterUrl = "https://justaman045.vercel.app";

export async function blogginDetails() {
  const details = await Promise.all([getHashnodeData(), getDevProfile(), fetchSubscribers()]);
  return details.filter(Boolean) as PlatformStats[];
}

export const getGitLabData = async (): Promise<CodingStats | null> => {
  const accessToken = process.env.GITLAB_API_KEY;

  if (!accessToken) {
    return null;
  }

  const projects = await fetchJson<unknown[]>("https://gitlab.com/api/v4/users/coderaman07/projects", {
    headers: {
      "PRIVATE-TOKEN": accessToken,
    },
  });

  return { username: "gitlab.com/coderaman07", public_repo: projects?.length ?? 0, platform: "GitLab" };
};

export const fetchGithubData = async (username: string): Promise<CodingStats | null> => {
  const user = await fetchJson<{ public_repos: number; followers: number }>(`https://api.github.com/users/${username}`);

  if (!user) {
    return null;
  }

  return {
    username: `github.com/${siteMetadata.username}`,
    public_repo: user.public_repos,
    followers: user.followers,
    platform: "GitHub",
  };
};

export async function codingData() {
  const details = await Promise.all([fetchGithubData(siteMetadata.username), getGitLabData()]);
  return details.filter(Boolean) as CodingStats[];
}

export async function getInstaData() {
  const accounts = [
    {
      id: "7150081325048019",
      token: process.env.LETHAL_ASTRA_API_KEY,
    },
    {
      id: "24932505826394447",
      token: process.env.ONESTAY_CONSISTENT_API_KEY,
    },
  ].filter((account) => account.token);

  return Promise.all(
    accounts.map((account) =>
      fetchJson<{ media_count: number; username: string }>(
        `https://graph.instagram.com/${account.id}?fields=media_count,username&access_token=${account.token}`
      )
    )
  );
}
