import { Metadata } from "next";

import { defaultAuthor } from "@/lib/metadata";
import { getAllPosts } from "@/lib/mdx";
import { sortByDate } from "@/lib/utils";
import PostPreview from "@/components/post-preview";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
    description: `Posts by ${defaultAuthor.name}`,
  };
}

export default function Blog() {
  const allPostsData = getAllPosts();
  const posts = allPostsData.filter((post) => post.status === "published").sort(sortByDate);

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Latest Posts</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Thoughts on engineering, automation, and building things.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="grid grid-flow-row gap-4">
          {posts.map((post, i) => (
            <PostPreview post={post} key={post._id} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
