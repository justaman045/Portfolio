import { AuthorType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`);

export const defaultAuthor: AuthorType = {
  name: "{ Aman }",
  handle: "@justaman045",
  socialProfiles,
  email: "coderaman07@gmail.com",
  website: "https://justaman045.vercel.app",
  jobTitle: "SDET and Full-Stack Engineer",
  company: "Infosys Ltd.",
  availableForWork: true,
  location: {
    city: "Indore",
    media: "/noida.avif",
  },
};

const defaultTitle = "Aman Ojha | SDET, Flutter and Full-Stack Engineer";
const defaultDescription =
  "Portfolio of Aman Ojha, an SDET and full-stack engineer building automation systems, SaaS products, AI tools, and Flutter apps.";

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  username: "justaman045",
  description: defaultDescription,
  email: defaultAuthor.email,
  siteRepo: "https://github.com/justaman045/Portfolio",
  newsletterProvider: "convertkit",
  newsletterUrl: "https://athenabyaman.ck.page/newsletter",
  analyticsProvider: "umami",
  defaultTheme: "system",
  activeAnnouncement: false,
  announcement: {
    buttonText: "announcement Headline",
    link: "https://projektnotify.vercel.app",
  },
  postsPerPage: 4,
  postsOnHomePage: 4,
  projectsOnHomePage: 3,
  instagramAccounts: ["lethal_astra", "justaman045", "1stay_Consistent", "shawmir26"],
};

export default siteMetadata;
