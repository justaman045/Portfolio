import Link from "next/link";
import { Mail } from "lucide-react";
import { siFacebook, siX, siYcombinator } from "simple-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url: string;
  text?: string;
}
export const SocialShare = ({ url, text }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Share</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share Post</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siX.path}></path>
            </svg>
            Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siFacebook.path}></path>
            </svg>
            Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.44a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.1 20.45H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"></path>
            </svg>
            LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siYcombinator.path}></path>
            </svg>
            Hacker News
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${encodedUrl}%20${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Mail className="mr-2 h-3 w-3" />
            Email
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
