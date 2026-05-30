import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";

import { getAllPages } from "@/lib/mdx";
import { Mdx } from "@/components/mdx";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type PageParams = Awaited<PageProps["params"]>;

async function getPageFromParams(params: PageParams) {
  const allPagesData = getAllPages();
  const page = allPagesData.find((page) => page.slug === params.slug);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(await params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return getAllPages().map((page) => ({
    slug: page.slug,
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(await params);

  if (!page || (process.env.NODE_ENV === "development" && page.status !== "published")) {
    notFound();
  }

  return (
    <div className="container max-w-6xl pb-10">
      <article className="prose prose-lg mx-auto dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">{page.title}</h1>
        {page.description && <p className="m-0 text-xl">{page.description}</p>}
        {page.lastUpdatedDate && (
          <time className="text-sm text-slate-500">
            Last updated: {format(parseISO(page.lastUpdatedDate), "LLLL d, yyyy")}
          </time>
        )}
        <hr className="my-4" />
        <Mdx code={page.body.raw} />
      </article>
    </div>
  );
}
