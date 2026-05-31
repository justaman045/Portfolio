import { Metadata } from "next";
import { ArrowUpRight, Download, ExternalLink, FileText } from "lucide-react";

import { siteData } from "@/lib/siteData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OVERLEAF_URL = siteData.resumeUrl;
const OVERLEAF_DOWNLOAD = `${OVERLEAF_URL}/download`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resume",
    description: "My professional background, skills, and experience.",
  };
}

export default function ResumePage() {
  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Resume</h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          My professional background, skills, and experience.
        </p>
      </div>

      <Card className="overflow-hidden border-border/50 shadow-sm">
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-foreground/10">
              <FileText size={28} className="text-accent-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-2xl font-bold">Get my Updated Resume</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Built with LaTeX on Overleaf. Always up to date — download the latest PDF or view it on Overleaf directly.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href={OVERLEAF_DOWNLOAD} target="_blank" rel="noopener noreferrer">
                  <Download size={18} className="mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={OVERLEAF_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} className="mr-2" />
                  Open in Overleaf
                  <ArrowUpRight size={14} className="ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="space-y-4 p-6 sm:p-8">
          <h3 className="font-heading text-lg font-semibold">About my Resume</h3>
          <div className="grid gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Format</h4>
              <p>LaTeX typeset, one-page PDF. Clean, professional design optimized for ATS parsing.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Updates</h4>
              <p>Hosted on Overleaf — always reflects my latest experience and skills. No stale copies.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Source</h4>
              <p>The LaTeX source is editable on Overleaf. Feel free to use it as a template for your own resume.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <a href={OVERLEAF_DOWNLOAD} className="underline underline-offset-2 hover:text-foreground">
                    Download PDF
                  </a>
                </li>
                <li>
                  <a href={OVERLEAF_URL} className="underline underline-offset-2 hover:text-foreground">
                    View on Overleaf
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground/60">
        Resume hosted on Overleaf. PDF downloads in your browser when you click Download.
      </p>
    </div>
  );
}
