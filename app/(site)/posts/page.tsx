import { Metadata } from "next";

import { defaultAuthor } from "@/lib/metadata";
import { getAllPosts } from "@/lib/mdx";
import { sortByDate } from "@/lib/utils";
import { AnimatedStatCard } from "@/components/projects-client";
import PostsFilter from "@/components/posts-filter";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
    description: `Posts by ${defaultAuthor.name}`,
  };
}

export default function Blog() {
  const allPostsData = getAllPosts();
  const posts = allPostsData
    .filter((post) => post.status === "published")
    .sort(sortByDate);

  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Latest Posts</h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Thoughts on engineering, automation, and building things.
        </p>
      </div>

      <AnimatedStatCard>
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-bold">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div>
            <div className="text-2xl font-bold">{tags.size}</div>
            <div className="text-sm text-muted-foreground">Tags</div>
          </div>
        </div>
      </AnimatedStatCard>

      <div className="mt-8">
        <PostsFilter posts={posts} />
      </div>
    </div>
  );
}
