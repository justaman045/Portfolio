"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import type { PostDoc } from "@/lib/mdx";
import PostPreview from "@/components/post-preview";
import PostsClient, { AnimatedPostCard } from "@/components/posts-client";

type PostsFilterProps = {
  posts: PostDoc[];
};

export default function PostsFilter({ posts }: PostsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [posts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesSearch =
          post.title.toLowerCase().includes(query) ||
          (post.description ?? "").toLowerCase().includes(query) ||
          post.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((t) => post.tags.includes(t));
        if (!hasTag) return false;
      }
      return true;
    });
  }, [posts, searchQuery, selectedTags]);

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <PostsClient>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title, description, or tags..."
            className="w-full rounded-lg border border-border/50 bg-background/50 py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-foreground/30 focus:outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground/50 hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs text-muted-foreground/60">Tags:</span>
            {allTags.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-accent-foreground/15 text-accent-foreground ring-1 ring-accent-foreground/30"
                      : "bg-background/50 text-muted-foreground ring-1 ring-border/50 hover:ring-accent-foreground/30 hover:text-accent-foreground"
                  }`}
                >
                  {tag}
                  {isActive && <X size={12} className="ml-1" />}
                </button>
              );
            })}
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground/60">
              {filteredPosts.length === 0
                ? "No posts match your filters"
                : `Showing ${filteredPosts.length} of ${posts.length} posts`}
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground/60 underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-flow-row gap-5 md:grid-cols-2">
        {filteredPosts.map((post, i) => (
          <AnimatedPostCard key={post._id}>
            <PostPreview post={post} index={i} />
          </AnimatedPostCard>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-2 py-16 text-center">
            <Search size={32} className="text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">
              No posts match your filters
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-accent-foreground underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </PostsClient>
  );
}
