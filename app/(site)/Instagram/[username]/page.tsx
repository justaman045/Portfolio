import { Metadata } from "next";
import { notFound } from "next/navigation";

import siteMetadata from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Instagram",
    description: `Instagram stats for ${siteMetadata.title}`,
  };
}

export default async function TagsPage({ params }: PageProps) {
  const { username } = await params;

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">{username}</h1>
        <hr className="my-4" />
      </div>
    </div>
  );
}
