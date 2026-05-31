import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { SeriesItem, PostSeriesItem } from "@/types";
import { getAllPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, Home, List, Timer } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mdx } from "@/components/mdx";
import PostClient, { AnimatedSection } from "@/components/post-client";
import { PostSeriesBox } from "@/components/post-series-box";
import { ReadingProgress } from "@/components/reading-progress";
import { SocialShare } from "@/components/social-share";
import { TableOfContents } from "@/components/table-of-contents";

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

type PostParams = Awaited<PostProps["params"]>;

const accentColors = [
  "from-blue-500/30 to-blue-600/30",
  "from-teal-400/30 to-teal-500/30",
  "from-amber-400/30 to-amber-500/30",
  "from-rose-400/30 to-rose-500/30",
  "from-violet-400/30 to-violet-500/30",
  "from-cyan-400/30 to-cyan-500/30",
  "from-emerald-400/30 to-emerald-500/30",
];

async function getPostFromParams(params: PostParams) {
  const allPostsData = getAllPosts();
  const post = allPostsData.find((post) => post.slug === params.slug);

  if (!post) return null;

  if (post?.series) {
    const seriesPosts: SeriesItem[] = allPostsData
      .filter((p) => p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => ({
        title: p.title,
        slug: p.slug,
        status: p.status,
        isCurrent: p.slug === post.slug,
      }));
    if (seriesPosts.length > 0) {
      return { ...post, series: { ...post.series, posts: seriesPosts } as PostSeriesItem };
    }
    return { ...post, series: undefined };
  }

  return post;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(await params);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post?.author?.name || defaultAuthor.name, url: defaultAuthor.website }],
    keywords: post.tags,
  };
}

export async function generateStaticParams(): Promise<PostParams[]> {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(await params);

  if (!post || (process.env.NODE_ENV === "development" && post.status !== "published")) {
    notFound();
  }

  const allPosts = getAllPosts()
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: post?.title,
    description: post?.description,
  };

  return (
    <>
      <ReadingProgress />
      <PostClient>
        <div className="container max-w-6xl pb-10">
          <AnimatedSection>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition hover:text-accent-foreground" aria-label="Home">
                    <Home size={14} />
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronIcon />
                </li>
                <li>
                  <Link href="/posts" className="transition hover:text-accent-foreground">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronIcon />
                </li>
                <li className="truncate text-foreground/60 max-w-[200px] sm:max-w-[400px]">
                  {post.title}
                </li>
              </ol>
            </nav>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative rounded-xl border border-border/50 bg-gradient-to-br from-background/80 via-background/50 to-background/80 px-6 py-8 shadow-sm backdrop-blur-xl sm:px-8">
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r",
                  accentColors[Math.abs(hashCode(post.title)) % accentColors.length],
                )}
              />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                    {post.title}
                  </h1>

                  {post.description && (
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground/80">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-muted-foreground/50" />
                      <time dateTime={post.publishedDate}>
                        {format(parseISO(post.publishedDate), "MMMM d, yyyy")}
                      </time>
                    </div>
                    <span className="text-muted-foreground/30" aria-hidden>·</span>
                    <div className="flex items-center gap-1.5">
                      <Timer size={14} className="text-muted-foreground/50" />
                      <span>{`${post.readTimeMinutes} min read`}</span>
                    </div>
                    {post.lastUpdatedDate && (
                      <>
                        <span className="text-muted-foreground/30" aria-hidden>·</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground/60">Updated</span>
                          <time dateTime={post.lastUpdatedDate}>
                            {format(parseISO(post.lastUpdatedDate), "MMM d, yyyy")}
                          </time>
                        </div>
                      </>
                    )}
                  </div>

                  {post.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-accent-foreground/10 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-accent-foreground"
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-foreground/60" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  {post.author?.name && (
                    <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                      {post.author.image && (
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-border/50"
                        />
                      )}
                      <span>{post.author.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {post?.series && (
            <AnimatedSection>
              <div className="relative mt-6 rounded-xl border border-border/50 bg-background/60 px-6 py-5 shadow-sm backdrop-blur-xl">
                <PostSeriesBox data={post.series as PostSeriesItem} />
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection>
            <div className="mt-6 lg:hidden">
              <Accordion type="single" collapsible>
                <AccordionItem value="table-of-contents" className="rounded-xl border border-border/50 bg-background/60 px-5 shadow-sm backdrop-blur-xl">
                  <AccordionTrigger className="py-3 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <List size={14} />
                      Table of Contents
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <TableOfContents chapters={post.headings} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AnimatedSection>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <article className="prose prose-lg dark:prose-invert hover:prose-a:text-accent-foreground prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight min-w-0 flex-1 lg:max-w-3xl">
              <Mdx code={post.body.raw} />
            </article>

            <aside className="hidden shrink-0 lg:block lg:w-64">
              <div className="sticky top-28 rounded-xl border border-border/50 bg-background/60 p-5 shadow-sm backdrop-blur-xl">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  On this page
                </h4>
                <TableOfContents chapters={post.headings} />
              </div>
            </aside>
          </div>

          <AnimatedSection>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/60 px-6 py-4 shadow-sm backdrop-blur-xl">
              <div className="flex flex-wrap gap-1.5">
                {post.tags?.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent-foreground/10 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-accent-foreground"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-foreground/60" />
                    {tag}
                  </Link>
                ))}
              </div>
              <SocialShare
                text={`${post.title} via ${defaultAuthor.handle}`}
                url={`${BASE_URL}/${post._raw.flattenedPath}`}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <nav aria-label="Post navigation" className="mt-8 grid gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="group relative rounded-xl border border-border/50 bg-background/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-blue-500/30 to-blue-600/30" />
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-accent-foreground">
                    <ChevronLeft size={13} />
                    Previous
                  </div>
                  <p className="mt-1.5 line-clamp-1 text-sm font-medium text-foreground">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="group relative rounded-xl border border-border/50 bg-background/60 p-5 shadow-sm backdrop-blur-xl text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:col-start-2"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-teal-400/30 to-teal-500/30" />
                  <div className="flex items-center justify-end gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-accent-foreground">
                    Next
                    <ChevronRight size={13} />
                  </div>
                  <p className="mt-1.5 line-clamp-1 text-sm font-medium text-foreground">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </AnimatedSection>
        </div>
      </PostClient>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
