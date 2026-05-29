import { Metadata } from "next";
import { format, parseISO } from "date-fns";

import { hardware, software, tools } from "@/lib/uses-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Uses",
    description: "Stuff I use",
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
        <h1 className="mt-0">Uses</h1>
        <p className="m-0 text-xl ">
          These are the tools I use to get my work done. Links marked with (*) are affiliate links. It does not cost you
          anything to use them, but I get a small commission if you do.
        </p>
        <time className="text-sm text-slate-500">Last updated: {format(parseISO(currentDate), "LLLL d, yyyy")}</time>
        <hr className="my-4" />
        <h2>Softwares</h2>
        <ul>
          {software.map((item, i) => (
            <li key={item.title + i}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
            </li>
          ))}
        </ul>
        <h2>Tools</h2>
        <ul>
          {tools.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <h2>Hardware</h2>
        <ul>
          {hardware.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
