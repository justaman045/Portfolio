import { LinkProps } from "next/link";

import { AnnouncementBarProps } from "@/components/announcement-bar";

export interface PostHeading {
  heading: number;
  text: string;
  slug: string;
}

export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  content?: ContentNavItem[];
}

export interface ContentNavItem extends NavItem {
  href: string;
}

export interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export type AnalyticsProvider = "umami" | "vercel" | "plausible" | "google";

export type NewsletterProvider = "convertkit" | "substack" | "mailerlite";

export type SiteMetaData = {
  title: {
    template: string;
    default: string;
  };
  description: string;
  username: string;
  email: string;
  siteRepo: string;
  newsletterProvider?: NewsletterProvider;
  newsletterUrl?: string;
  analyticsProvider?: AnalyticsProvider;
  defaultTheme: "light" | "dark" | "system";
  activeAnnouncement: boolean;
  announcement: Pick<AnnouncementBarProps, "buttonText" | "link">;
  postsPerPage: number;
  postsOnHomePage: number;
  projectsOnHomePage: number;
  instagramAccounts: Array<string>;
};

export type SeriesItem = {
  title: string;
  slug: string;
  status: string;
  isCurrent: boolean;
};

export type PostSeriesItem = {
  title: string;
  order: number;
  posts: SeriesItem[];
};

export type SeriesData = {
  title: string;
  order: number;
};

export type SocialProfile = {
  name: string;
  link: string;
};

export type AuthorType = {
  name: string;
  handle: string;
  socialProfiles: SocialProfile[];
  email: string;
  website: string;
  jobTitle: string;
  company?: string;
  availableForWork: boolean;
  location: {
    city: string;
    media: string;
  };
};
