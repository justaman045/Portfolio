import { siteData } from "@/lib/siteData";
import { getDevtoArticles } from "@/lib/devto";
import { HeroSimple } from "@/components/hero-simple";
import { AboutTerminal } from "@/components/about-terminal";
import { ProjectsList } from "@/components/projects-list";
import { SkillsProgress } from "@/components/skills-progress";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ArticlesList } from "@/components/articles-list";
import { ContactInline } from "@/components/contact-inline";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const articles = await getDevtoArticles("justaman045");

  return (
    <div className="pb-10">
      <HeroSimple tagline={siteData.tagline} />

      <div className="mt-14 space-y-16">
        <ScrollReveal>
          <AboutTerminal />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ProjectsList />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <SkillsProgress />
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <ExperienceTimeline />
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <ArticlesList articles={articles} />
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <ContactInline />
        </ScrollReveal>
      </div>
    </div>
  );
}
