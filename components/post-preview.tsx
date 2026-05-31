"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, CalendarDays, Timer } from "lucide-react";

import type { PostDoc } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const accentColors = [
  { bar: "from-blue-500/40 to-blue-600/40", thumb: "bg-blue-500/15", dot: "bg-blue-500" },
  { bar: "from-teal-400/40 to-teal-500/40", thumb: "bg-teal-400/15", dot: "bg-teal-400" },
  { bar: "from-amber-400/40 to-amber-500/40", thumb: "bg-amber-400/15", dot: "bg-amber-400" },
  { bar: "from-rose-400/40 to-rose-500/40", thumb: "bg-rose-400/15", dot: "bg-rose-400" },
  { bar: "from-violet-400/40 to-violet-500/40", thumb: "bg-violet-400/15", dot: "bg-violet-400" },
  { bar: "from-cyan-400/40 to-cyan-500/40", thumb: "bg-cyan-400/15", dot: "bg-cyan-400" },
  { bar: "from-emerald-400/40 to-emerald-500/40", thumb: "bg-emerald-400/15", dot: "bg-emerald-400" },
];

const borderColors = [
  "border-blue-500/20 group-hover:border-blue-500/40",
  "border-teal-400/20 group-hover:border-teal-400/40",
  "border-amber-400/20 group-hover:border-amber-400/40",
  "border-rose-400/20 group-hover:border-rose-400/40",
  "border-violet-400/20 group-hover:border-violet-400/40",
  "border-cyan-400/20 group-hover:border-cyan-400/40",
  "border-emerald-400/20 group-hover:border-emerald-400/40",
];

type PostPreviewProps = {
  post: PostDoc;
  index?: number;
};

const PostPreview = ({ post, index = 0 }: PostPreviewProps) => {
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const i = index % accentColors.length;
  const accent = accentColors[i];
  const borderAccent = borderColors[i];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "group relative rounded-xl border bg-background/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        borderAccent,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${
            theme !== "dark" ? "hsla(223,94%,66%,.08)" : "hsla(223,94%,66%,.12)"
          }, transparent 40%)`,
        }}
      />

      <div
        className={cn(
          "absolute left-0 top-3 w-0.5 rounded-r-full bg-accent-foreground/0 transition-all duration-300",
          "group-hover:h-8 group-hover:bg-accent-foreground/40",
        )}
      />

      <div className={cn("absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r", accent.bar)} />

      <Link
        href={`/posts/${post.slug}`}
        className="relative block p-6 no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:flex",
              accent.thumb,
            )}
          >
            <span className="text-sm font-bold text-foreground/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {post.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={13} className="text-muted-foreground/50" />
                <time dateTime={post.publishedDate}>
                  {format(parseISO(post.publishedDate), "MMM d, yyyy")}
                </time>
              </div>
              <span className="text-muted-foreground/30" aria-hidden>·</span>
              <div className="flex items-center gap-1.5">
                <Timer size={13} className="text-muted-foreground/50" />
                <span>{`${post.readTimeMinutes} min read`}</span>
              </div>
            </div>

            {post?.tags && (
              <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
                {post.tags.map((tag: string) => (
                  <li key={tag}>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full border-0 bg-accent-foreground/10 px-2.5 py-0.5 text-[11px] font-medium",
                        "text-muted-foreground transition-colors",
                        "group-hover:text-accent-foreground",
                      )}
                    >
                      <span
                        className={cn("mr-1.5 inline-block h-1.5 w-1.5 rounded-full", accent.dot)}
                      />
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}

            {post.description && (
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
                {post.description}
              </p>
            )}

            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-accent-foreground">
              <span>Read article</span>
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostPreview;
