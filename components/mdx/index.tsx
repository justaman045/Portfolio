import NextImage, { ImageProps } from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import type { TweetProps } from "react-tweet";
import { Tweet } from "react-tweet";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { NewsletterCTA } from "./newsletter-cta";
import { YouTubeVideo } from "./youtube-video";

function CustomLink({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternalLink = href && href.startsWith("http");

  if (isExternalLink) {
    return <a target="_blank" href={href} rel="noopener noreferrer" {...rest} />;
  }
  return (
    <Link href={href!} {...rest} />
  );
}

const components = {
  Image: (props: ImageProps) => <NextImage {...props} />,
  NewsletterCTA,
  YouTubeVideo,
  a: CustomLink,
  Tweet: (props: TweetProps) => {
    return (
      <div className="not-prose [&>div]:mx-auto">
        <Tweet {...props} />
      </div>
    );
  },
};

interface MdxProps {
  code: string;
}

export async function Mdx({ code }: MdxProps) {
  const { content } = await compileMDX({
    source: code,
    components: components as any,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeKatex,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-heading-link"],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
                node.properties.className = ["line"];
              },
              onVisitHighlightedLine(node: any) {
                node.properties.className?.push("line--highlighted");
              },
            },
          ],
        ],
      },
    },
  });
  return <>{content}</>;
}
