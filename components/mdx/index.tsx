import NextImage, { ImageProps } from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { TweetProps } from "react-tweet";
import { Tweet } from "react-tweet";

import { NewsletterCTA } from "./newsletter-cta";
import { YouTubeVideo } from "./youtube-video";

function CustomLink({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternalLink = href && href.startsWith("http");

  if (isExternalLink) {
    return <a target="_blank" href={href} rel="noopener noreferrer" {...rest} />;
  }
  return (
    // Link expects `href` to be a known route; MDX can pass arbitrary paths
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

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  // TODO: Figure out how to type this
  return <Component components={components as any} />;
}
