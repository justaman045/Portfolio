import { defaultAuthor } from "@/lib/metadata";
import { siteData } from "@/lib/siteData";

const stats = [
  { value: "4.5+", label: "Years Exp" },
  { value: "40+", label: "Skills" },
  { value: "3", label: "Products" },
  { value: "12+", label: "Articles" },
];

export function AboutTerminal() {
  return (
    <section className="container max-w-6xl">
      <h2 className="mb-8 font-heading text-2xl font-bold">
        <span className="font-mono text-sm font-normal text-muted-foreground/40">{"//"}</span> about
      </h2>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="overflow-hidden rounded-xl border border-border/50 lg:col-span-3">
          <div className="flex items-center gap-1.5 border-b border-border/50 bg-accent-foreground/5 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-muted-foreground/50">~/about — zsh</span>
          </div>
          <div className="bg-slate-900/60 p-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-blue-400">$</span> whoami
            </p>
            <p className="mb-3 text-foreground/90">
              &gt; {defaultAuthor.name.replace(/[{}]/g, "").trim()} &mdash; {defaultAuthor.jobTitle}
            </p>
            <p>
              <span className="text-blue-400">$</span> cat ~/skills.txt
            </p>
            <p className="mb-3 text-foreground/90">
              &gt; python, typescript, dart, rust, next.js, flutter, fastapi, aws, kubernetes, postgresql
            </p>
            <p>
              <span className="text-blue-400">$</span> echo $STATUS
            </p>
            <p className="text-foreground/90">&gt; {siteData.tagline}</p>
            <p className="mt-4 text-muted-foreground/50">
              $ <span className="animate-pulse">▊</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            I&apos;m an SDET and full-stack engineer based in {defaultAuthor.location.city}. I build
            automation systems, SaaS products, and AI tools. My work spans test automation,
            full-stack development, and developer tooling &mdash; turning research into reliable
            production systems.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            When I&apos;m not shipping code, you&apos;ll find me contributing to open-source
            projects on GitHub, writing about engineering, or tinkering with my Fedora workstation.
          </p>

          <div className="mt-6 grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-xl font-bold">{stat.value}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
