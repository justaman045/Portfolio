import { Calendar, MapPin } from "lucide-react";

const experience = [
  {
    company: "Infosys Ltd.",
    role: "Software Quality Engineer",
    period: "Oct 2021 – Present",
    location: "Gurgaon, Haryana",
    accent: "border-l-blue-500",
    highlights: [
      {
        title: "QA Automation Engineer — Coles (Wave 3)",
        desc: "Architected a unified test framework integrating REST Assured API testing into existing Appium mobile suite via shared MessageFactory classes — recognized by client for accelerating test delivery.",
      },
      {
        title: "Mobile Automation Engineer — Coles (Wave 2)",
        desc: "Built mobile test automation suites with Appium, Java, TestNG, and POM for retail store workflows. Resolved protocol incompatibility restoring 22 test cases.",
      },
      {
        title: "Desktop Automation — RMS",
        desc: "Recovered 200+ failing scripts in 6 weeks after system updates invalidated all locators — earned direct client recognition for turnaround speed.",
      },
    ],
  },
  {
    company: "Codedamn",
    role: "Technical Writer",
    period: "Sep 2022 – Feb 2023",
    location: "Remote",
    accent: "border-l-emerald-500",
    highlights: [
      {
        title: "Content Author",
        desc: "Authored 15+ technical articles on software testing, development, and programming — accumulating 4000+ reads across the platform.",
      },
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section className="container max-w-6xl">
      <h2 className="mb-8 font-heading text-2xl font-bold">
        <span className="font-mono text-sm font-normal text-muted-foreground/40">{"//"}</span> Experience
      </h2>
      <div className="space-y-6">
        {experience.map((job) => (
          <div
            key={job.company}
            className={`rounded-lg border border-l-4 border-border/50 ${job.accent} bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold">{job.company}</h3>
                <span className="inline-flex items-center rounded-md bg-accent-foreground/10 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                  {job.role}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {job.period}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {job.location}
                </span>
              </div>
            </div>
            <ul className="mt-4 space-y-3">
              {job.highlights.map((h) => (
                <li key={h.title} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{h.title}</span>
                  <br />
                  {h.desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
