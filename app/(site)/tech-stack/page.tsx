import { Metadata } from "next";
import { format } from "date-fns";
import {
  Cpu,
  ExternalLink,
  Headphones,
  Keyboard,
  Monitor,
  Smartphone,
  Wrench,
} from "lucide-react";

import { hardware, tools } from "@/lib/uses-data";
import { getTopSkills } from "@/lib/skills";
import {
  mergeInferredIntoResume,
  resumeSkillCategories,
} from "@/lib/resume-data";
import { TechIcon } from "@/components/tech-icon";
import TechStackClient, {
  AnimatedCard,
  AnimatedCards,
  AnimatedCategoryCard,
  AnimatedPill,
  AnimatedStatCard,
} from "./tech-stack-client";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tech Stack",
    description: "Tools, languages, and technologies I use",
  };
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
        <Icon size={18} className="text-accent-foreground" />
      </div>
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
    </div>
  );
}

function getDeviceIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("phone")) return Smartphone;
  if (lower.includes("rockerz") || lower.includes("earphone"))
    return Headphones;
  if (lower.includes("keyboard") || lower.includes("key2")) return Keyboard;
  return Monitor;
}

export default async function UsesPage() {
  const topSkills = getTopSkills(30);
  const categories = mergeInferredIntoResume(resumeSkillCategories, topSkills);
  const skillCount = categories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0,
  );

  return (
    <TechStackClient>
      <div className="container max-w-6xl pb-10">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold">Tech Stack</h1>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Skills organized from my resume, with extras auto-detected from my
            projects. Tools and hardware are manually maintained.
          </p>
          <time className="mt-2 block text-sm text-muted-foreground/60">
            Auto-updated — {format(new Date(), "LLLL d, yyyy")}
          </time>
        </div>

        <AnimatedStatCard>
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-2xl font-bold">{skillCount}</div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div>
              <div className="text-2xl font-bold">{tools.length}</div>
              <div className="text-sm text-muted-foreground">Tools</div>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div>
              <div className="text-2xl font-bold">{hardware.length}</div>
              <div className="text-sm text-muted-foreground">Devices</div>
            </div>
          </div>
        </AnimatedStatCard>

        <div className="mt-8 space-y-6">
          {categories.map((cat) => (
            <AnimatedCategoryCard key={cat.title}>
              <SectionHeader icon={cat.icon} title={cat.title} />
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <AnimatedPill
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent-foreground/30 hover:bg-accent/30 hover:text-accent-foreground"
                  >
                    <TechIcon name={skill} className="h-4 w-4" />
                    {skill}
                  </AnimatedPill>
                ))}
              </div>
            </AnimatedCategoryCard>
          ))}

          <div className="space-y-8">
            <div>
              <SectionHeader icon={Wrench} title="Tools" />
              <AnimatedCards>
                {tools.map((item) => (
                  <AnimatedCard key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-start gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-4 transition-all hover:border-accent-foreground/30 hover:bg-accent/30 hover:shadow-sm"
                    >
                      <TechIcon
                        name={item.title}
                        className="h-6 w-6 text-accent-foreground/60"
                      />
                      <span className="font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                        {item.title}
                      </span>
                      {item.description && (
                        <span className="text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </a>
                  </AnimatedCard>
                ))}
              </AnimatedCards>
            </div>

            <div>
              <SectionHeader icon={Cpu} title="Hardware" />
              <AnimatedCards>
                {hardware.map((item) => {
                  const DeviceIcon = getDeviceIcon(item.title);
                  return (
                    <AnimatedCard key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-start gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-4 transition-all hover:border-accent-foreground/30 hover:bg-accent/30 hover:shadow-sm"
                      >
                        <DeviceIcon
                          size={20}
                          className="text-accent-foreground/60"
                        />
                        <span className="font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                          {item.title}
                        </span>
                        <span className="text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground/60">
                          Affiliate link <ExternalLink size={10} />
                        </span>
                      </a>
                    </AnimatedCard>
                  );
                })}
              </AnimatedCards>
            </div>
          </div>
        </div>
      </div>
    </TechStackClient>
  );
}
