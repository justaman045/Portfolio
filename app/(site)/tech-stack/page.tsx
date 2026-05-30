import { Metadata } from "next";
import { format } from "date-fns";
import { Monitor, Cpu, Wrench } from "lucide-react";

import { hardware, software, tools } from "@/lib/uses-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Uses",
    description: "Stuff I use",
  };
}

function TechCard({ title, description, href }: { title: string; description?: string; href?: string }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-1.5 rounded-lg border border-border/50 bg-background/50 px-4 py-3 transition-all hover:border-accent-foreground/30 hover:bg-accent/30 hover:shadow-sm"
    >
      <span className="font-medium text-foreground transition-colors group-hover:text-accent-foreground">
        {title}
      </span>
      {description && (
        <span className="text-sm leading-snug text-muted-foreground">{description}</span>
      )}
    </Wrapper>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
        <Icon size={18} className="text-accent-foreground" />
      </div>
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
    </div>
  );
}

export default async function UsesPage() {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold">Uses</h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          These are the tools I use to get my work done. Links marked with (*) are affiliate links — it doesn&apos;t cost
          you anything, but I get a small commission if you purchase.
        </p>
        <time className="text-sm text-muted-foreground/60">Last updated: {format(new Date(currentDate), "LLLL d, yyyy")}</time>
      </div>

      <div className="space-y-8">
        <section>
          <SectionHeader icon={Monitor} title="Software & Languages" />
          <div className="flex flex-wrap gap-2">
            {software.map((item, i) => (
              <span
                key={item.title + i}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-accent-foreground/30 hover:bg-accent/30 hover:text-accent-foreground"
              >
                {item.title}
              </span>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={Wrench} title="Tools" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((item) => (
              <TechCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={Cpu} title="Hardware" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hardware.map((item) => (
              <TechCard key={item.href} title={item.title} description={item.description} href={item.href} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
