import { ContentNavItem, NavItem } from "@/types";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";

const content: ContentNavItem[] = [
  {
    title: "Blog",
    href: "/posts",
    description: "Blogposts. Mostly about Development. Or Tech Hacks",
  },
  {
    title: "Personal Logs",
    href: "/logs",
    description: "All of my personal logs that I want to share with my audience",
  },
  {
    title: "Videos",
    href: defaultAuthor.socialProfiles.find((platform) => platform.name === "youtube")?.link as string,
    description: "My YouTube channel where I talk about web development.",
  },
  {
    title: "Newsletter",
    href: siteMetadata.newsletterUrl as string,
    description: "My newsletter about software development and it's journey",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Tech Stack",
    href: "/tech-stack",
  },
  {
    title: "Activity",
    href: "/activity",
  },
  {
    title: "Now",
    href: "/now",
  },
  {
    title: "Resume",
    href: "/resume",
  },
];
