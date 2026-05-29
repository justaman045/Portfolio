import Link from "next/link";
import { SocialProfile } from "@/types";
import { siGithub, siInstagram, siX, siYoutube } from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const linkedinPath =
  "M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.44a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.1 20.45H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z";

const iconMap: Record<string, SimpleIcon | { path: string }> = {
  github: siGithub,
  instagram: siInstagram,
  linkedin: { path: linkedinPath },
  x: siX,
  youtube: siYoutube,
};

interface SocialButtonProps extends ButtonProps {
  platform: SocialProfile;
}

export function SocialButton({ platform, ...props }: SocialButtonProps) {
  const renderIcon = () => {
    const icon = iconMap[platform.name];
    if (!icon) {
      return null;
    }
    return (
      <svg role="img" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d={icon.path}></path>
      </svg>
    );
  };

  const displayName = platform.name.charAt(0).toUpperCase() + platform.name.slice(1);

  return (
    <Button asChild {...props}>
      <Link href={platform.link} rel={platform.name === "mastodon" ? "me" : "noreferrer noopener"} target="_blank">
        {renderIcon()}
        <span className={cn(props.size === "icon" ? "sr-only" : "ml-2")}>Go to my {displayName} profile</span>
      </Link>
    </Button>
  );
}
