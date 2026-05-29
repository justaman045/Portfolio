import { Metadata } from "next";
import { format } from "date-fns";
import { projects } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "My projects",
  };
}

export default async function SocialPage() {
  const date = new Date();

  let day = date.getDate().toString().padStart(2, "0"); // Ensure two digits for day
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for month
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;

  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0 ">Projects</h1>
        <p className="m-0 text-xl ">
          {/* <AlertTriangle className="inline h-5 w-5 text-amber-500" /> Note: This page is heavily under construction!{" "}
          <AlertTriangle className="inline h-5 w-5 text-amber-500" /> */}
        </p>
        <time className="text-sm text-slate-500">Last updated: {format(new Date(currentDate), "LLLL d, yyyy")}</time>
        <hr className="my-4" />
        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {projects.map((item) => (
            <SpotlightCard key={item.href} {...item} />
          ))}
        </div>
      </article>
    </div>
  );
}
