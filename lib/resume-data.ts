import { Bug, Cloud, Globe, Layout, Terminal, Wrench } from "lucide-react";

export type IconComponent = typeof Bug;

export interface ResumeSkillCategory {
  icon: IconComponent;
  title: string;
  skills: string[];
}

export const resumeSkillCategories: ResumeSkillCategory[] = [
  {
    icon: Bug,
    title: "Test Automation",
    skills: ["Selenium", "Appium", "WinAppDriver", "TestNG", "Page Object Model"],
  },
  {
    icon: Globe,
    title: "API & Backend",
    skills: ["RestAssured", "Postman", "Apache Kafka", "SQL", "JSON Validation"],
  },
  {
    icon: Terminal,
    title: "Languages",
    skills: ["Java", "Python", "Dart", "JavaScript", "TypeScript"],
  },
  {
    icon: Layout,
    title: "Frameworks",
    skills: ["Next.js", "React", "Flutter", "Django", "Node.js", "Express"],
  },
  {
    icon: Wrench,
    title: "Tools & CI/CD",
    skills: ["Jenkins", "Git", "Maven", "Extent Reports", "Allure", "Log4j"],
  },
  {
    icon: Cloud,
    title: "Cloud & Platforms",
    skills: ["Firebase", "Azure Cosmos DB", "GitHub"],
  },
];

const inferenceMergeMap: Record<string, string> = {
  docker: "Tools & CI/CD",
  "mongo db": "API & Backend",
  mongodb: "API & Backend",
  tailwind: "Frameworks",
  tailwindcss: "Frameworks",
};

export function mergeInferredIntoResume(
  categories: ResumeSkillCategory[],
  topSkills: string[],
): ResumeSkillCategory[] {
  const result = categories.map((cat) => ({
    ...cat,
    skills: [...cat.skills],
  }));

  for (const skill of topSkills) {
    const key = skill.toLowerCase().replace(/\./g, "").replace(/\s/g, "");
    const categoryTitle = inferenceMergeMap[key];
    if (!categoryTitle) continue;

    const category = result.find((c) => c.title === categoryTitle);
    if (!category) continue;

    const normalized = skill.toLowerCase().replace(/\./g, "").replace(/\s/g, "");
    const alreadyPresent = category.skills.some(
      (s) => s.toLowerCase().replace(/\./g, "").replace(/\s/g, "") === normalized,
    );
    if (!alreadyPresent) {
      category.skills.push(skill);
    }
  }

  return result;
}
