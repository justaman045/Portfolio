"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Python / TypeScript / Dart / Rust", level: 90 },
      { name: "React / Next.js / Flutter", level: 85 },
      { name: "Node.js / FastAPI / Express", level: 80 },
      { name: "PostgreSQL / MongoDB / Redis", level: 75 },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    skills: [
      { name: "Docker / Podman / Kubernetes", level: 85 },
      { name: "AWS / CI-CD / GitHub Actions", level: 80 },
      { name: "Linux (Fedora) / Shell Scripting", level: 90 },
      { name: "Nginx / Cloudflare / VPS", level: 70 },
    ],
  },
  {
    title: "Testing & Automation",
    skills: [
      { name: "Selenium / Playwright / Cypress", level: 90 },
      { name: "Pytest / API Testing / Locust", level: 85 },
      { name: "Mobile Testing / Appium", level: 70 },
      { name: "Performance / Load Testing", level: 75 },
    ],
  },
];

export function SkillsProgress() {
  return (
    <section className="container max-w-6xl">
      <h2 className="mb-8 font-heading text-2xl font-bold">
        <span className="font-mono text-sm font-normal text-muted-foreground/40">{"//"}</span> skills
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-4">
            <h3 className="font-heading font-semibold">{cat.title}</h3>
            <div className="space-y-3">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-accent-foreground/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
