"use client";

import { useState } from "react";
import { ArrowUpRight, Download, ExternalLink, FileText } from "lucide-react";

import { siteData } from "@/lib/siteData";
import { Button } from "@/components/ui/button";

const OVERLEAF_URL = siteData.resumeUrl;
const OVERLEAF_PDF_PROXY = `https://docs.google.com/viewer?url=${encodeURIComponent(OVERLEAF_URL)}&embedded=true`;

export default function ResumePage() {
  const [embedError, setEmbedError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold">Resume</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            My professional background, skills, and experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="default" size="sm">
            <a href={OVERLEAF_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-1.5" />
              Open in Overleaf
              <ArrowUpRight size={14} className="ml-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={`${OVERLEAF_URL}/download`} target="_blank" rel="noopener noreferrer">
              <Download size={16} className="mr-1.5" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-background/30 shadow-sm backdrop-blur-xl">
        {!iframeLoaded && !embedError && (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FileText size={32} className="animate-pulse" />
              <span className="text-sm">Loading resume...</span>
            </div>
          </div>
        )}

        {embedError ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
            <FileText size={48} className="text-muted-foreground/40" />
            <h2 className="font-heading text-xl font-semibold">Resume preview unavailable</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              The resume could not be embedded directly. Click below to view it on Overleaf.
            </p>
            <Button asChild>
              <a href={OVERLEAF_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Open Resume on Overleaf
              </a>
            </Button>
          </div>
        ) : (
          <iframe
            src={OVERLEAF_PDF_PROXY}
            className="h-[85vh] w-full"
            onLoad={() => setIframeLoaded(true)}
            onError={() => setEmbedError(true)}
            title="Resume"
          />
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground/60">
        Resume is always up to date — hosted on Overleaf.{" "}
        <a
          href={OVERLEAF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Open in Overleaf
        </a>
      </p>
    </div>
  );
}
