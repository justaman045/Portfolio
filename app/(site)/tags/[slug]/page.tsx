import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { sortByDate } from "@/lib/utils";
import PostPreview from "@/components/post-preview";

// Dynamic metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `All posts in ${slug}`,
    description: `All posts in ${slug}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: tag } = await params;

  const posts = allPosts
    .filter((post) => post.status === "published")
    .filter((post) => post.tags?.includes(tag))
    .sort(sortByDate);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">All posts in {tag}</h1>
        <hr className="my-4" />
        <div className="grid grid-flow-row gap-2">
          {posts.map((post) => (
            <PostPreview post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
