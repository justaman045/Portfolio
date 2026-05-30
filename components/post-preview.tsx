import Link from "next/link";
import { format, parseISO } from "date-fns";
import { CalendarDays, Timer } from "lucide-react";

import type { PostDoc } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type PostPreviewProps = {
  post: PostDoc;
  index?: number;
};

const PostPreview = ({ post, index = 0 }: PostPreviewProps) => {
  return (
    <article
      className="w-full animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Link
        href={`/posts/${post.slug}`}
        className={cn(
          "group relative block rounded-lg border border-transparent p-4 pl-5 leading-none no-underline outline-none transition-all duration-200 hover:border-border hover:shadow-sm hover:bg-foreground/[0.03] focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <span className="absolute left-0 top-2 h-8 w-0.5 rounded-r-full bg-accent-foreground/0 transition-all duration-200 group-hover:h-10 group-hover:bg-accent-foreground/40" />
        <h3 className="my-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent-foreground">
          {post.title}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-snug text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <time dateTime={post.publishedDate}>{format(parseISO(post.publishedDate), "LLLL d, yyyy")}</time>
          </div>
          <div className="flex items-center gap-1">
            <Timer size={14} />
            <span>{`${post.readTimeMinutes} mins read`}</span>
          </div>
        </div>
        {post?.tags && (
          <ul className="my-3 flex list-none flex-wrap gap-1.5 p-0">
            {post.tags.map((tag: string) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="rounded-full border border-muted-foreground/30 bg-transparent px-2 py-0.5 text-xs font-normal text-muted-foreground transition-colors group-hover:border-accent-foreground/30 group-hover:text-accent-foreground"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        {post.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">{post.description}</p>
        )}
      </Link>
    </article>
  );
};

export default PostPreview;
