import { resumeSkillCategories } from "@/lib/resume-data";

export function SkillsGrid() {
  return (
    <section className="container max-w-6xl">
      <h2 className="mb-8 font-heading text-2xl font-bold">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeSkillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="group rounded-xl border border-border/50 bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-foreground/10">
                  <Icon size={18} className="text-foreground" />
                </div>
                <h3 className="font-heading font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block rounded-md bg-accent-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
