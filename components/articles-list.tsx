import Link from "next/link";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";

import type { DevtoArticle } from "@/lib/devto";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export function ArticlesList({ articles }: { articles: DevtoArticle[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="container max-w-6xl">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">
          <span className="font-mono text-sm font-normal text-muted-foreground/40">{"//"}</span> blog
        </h2>
        <Link
          href="https://dev.to/justaman045"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
        >
          View all on Dev.to <ExternalLink size={12} />
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-xl border border-border/50 bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
          >
            <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-accent-foreground">
              {article.title}
            </h3>
            {article.tags && (
              <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">{article.tags}</p>
            )}
            <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
              <span>{formatDate(article.published)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {article.readingTime} min read
              </span>
            </div>
            <ArrowRight
              size={14}
              className="absolute bottom-5 right-5 text-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
