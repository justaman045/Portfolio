import siteMetadata from "@/lib/metadata";

export type HashnodeData = {
  url: string;
  followersCount: number;
  totalPosts: number;
};

export async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  const apiKey = process.env.HASHNODE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json as T;
  } catch {
    return null;
  }
}

export async function getHashnodeData(): Promise<HashnodeData | null> {
  if (!process.env.HASHNODE_API_KEY) return null;

  const query = `
    query User($username: String!) {
      user(username: $username) {
        followersCount
        publications(first: 1) {
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

  const data = await gql<{
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
  }>(query, { username: siteMetadata.username });

  const publication = data?.data?.user?.publications?.edges?.[0]?.node;

  if (!data?.data?.user || !publication) return null;

  return {
    url: publication.url ?? `https://${siteMetadata.username}.hashnode.dev`,
    followersCount: data.data.user.followersCount ?? 0,
    totalPosts: publication.posts?.totalDocuments ?? 0,
  };
}
