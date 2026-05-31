import React from "react";
import { Mail } from "lucide-react";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";
import { CopyButton } from "@/components/copy-button";
import { Signature } from "@/components/signature";
import { SocialButton } from "@/components/social-button";

const Footer = () => {
  return (
    <footer className="mx-auto mt-16 max-w-6xl border-t border-border/50 px-4 py-8 pb-28 sm:pb-8">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Signature />
          <p className="text-sm leading-relaxed text-muted-foreground">
            &copy; {new Date().getFullYear()} {defaultAuthor.name}. 
            <br className="sm:hidden" />
            {" "}Find me on{" "}
            <a
              href={defaultAuthor.socialProfiles.find((p) => p.name === "x")?.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 transition hover:text-accent-foreground hover:underline"
            >
              {defaultAuthor.handle}
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Source on{" "}
            <a
              href={siteMetadata.siteRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 transition hover:text-accent-foreground hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {defaultAuthor.socialProfiles.map((platform) => (
            <SocialButton
              key={platform.name}
              variant="ghost"
              size="icon"
              className="text-muted-foreground transition hover:text-foreground"
              platform={platform}
            />
          ))}
          <CopyButton size="icon" variant="ghost" className="text-muted-foreground transition hover:text-foreground" copyText={defaultAuthor.email}>
            <Mail />
            <span className="sr-only">Email address</span>
          </CopyButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
