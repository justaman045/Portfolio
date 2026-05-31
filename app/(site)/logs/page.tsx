import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";

import { getAllPages } from "@/lib/mdx";
import { defaultAuthor } from "@/lib/metadata";
import { Mdx } from "@/components/mdx";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logs",
    description: `Personal logs by ${defaultAuthor.name}`,
  };
}

export default function LogsPage() {
  const allPagesData = getAllPages();
  const page = allPagesData.find((p) => p.slug === "logs");

  if (!page) {
    notFound();
  }

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">{page.title}</h1>
        {page.description && (
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {page.description}
          </p>
        )}
        {page.lastUpdatedDate && (
          <time className="mt-2 block text-sm text-muted-foreground/60">
            Last updated: {format(parseISO(page.lastUpdatedDate), "LLLL d, yyyy")}
          </time>
        )}
      </div>
      <div className="rounded-xl border border-border/50 bg-background p-6 sm:p-8">
        <article className="prose dark:prose-invert max-w-none prose-headings:mb-3 prose-headings:mt-6 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground">
          <Mdx code={page.body.raw} />
        </article>
      </div>
    </div>
  );
}
