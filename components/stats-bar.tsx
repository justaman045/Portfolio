import { Briefcase, Box, Code2, FileText } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "4.5+", label: "Years of Experience" },
  { icon: Box, value: "3", label: "Products Shipped" },
  { icon: Code2, value: "40+", label: "Skills & Tools" },
  { icon: FileText, value: "12+", label: "Articles Published" },
];

export function StatsBar() {
  return (
    <section className="container max-w-6xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-foreground/10">
                <Icon size={20} className="text-foreground" />
              </div>
              <div className="font-heading text-3xl font-bold tracking-tight text-foreground">{stat.value}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
