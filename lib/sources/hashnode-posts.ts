import siteMetadata from "@/lib/metadata";
import { gql } from "@/lib/hashnode";

export type HashnodePost = {
  title: string;
  url: string;
  tags: string[];
  publishedAt: string;
};

export async function getHashnodePosts(): Promise<HashnodePost[]> {
  if (!process.env.HASHNODE_API_KEY) return [];

  const query = `
    query User($username: String!) {
      user(username: $username) {
        publications(first: 1) {
          edges {
            node {
              posts(first: 10) {
                edges {
                  node {
                    title
                    url
                    publishedAt
                    tags {
                      name
                    }
                  }
                }
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
        publications?: {
          edges?: Array<{
            node?: {
              posts?: {
                edges?: Array<{
                  node?: {
                    title?: string;
                    url?: string;
                    publishedAt?: string;
                    tags?: Array<{ name?: string }>;
                  };
                }>;
              };
            };
          }>;
        };
      };
    };
  }>(query, { username: siteMetadata.username });

  const edges = data?.data?.user?.publications?.edges?.[0]?.node?.posts?.edges;
  if (!edges) return [];

  return edges
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => n != null && !!n.title)
    .map((n) => ({
      title: n.title ?? "",
      url: n.url ?? "",
      tags: (n.tags ?? []).map((t) => t?.name ?? "").filter(Boolean),
      publishedAt: n.publishedAt ?? "",
    }));
}
