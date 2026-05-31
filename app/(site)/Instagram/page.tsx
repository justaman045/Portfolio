import { Metadata } from "next";
import { format, parseISO } from "date-fns";

import siteMetadata from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Instagram",
    description: `Instagram profiles managed by ${siteMetadata.title}`,
  };
}

export default function TagsPage() {
  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Instagram</h1>
        <p className="m-0 text-xl ">Instagram profiles managed by {siteMetadata.title.default}</p>
        <time className="text-sm text-slate-500">Last updated: {format(new Date(), "LLLL d, yyyy")}</time>
      </article>
      <hr className="my-4" />
      <div className="flex min-h-screen items-center justify-center px-24">
        <div className="w-full">
          <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4">
            <h2 className="!mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
              Writing Platforms
            </h2>
          </div>
          <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
            All the Writing Platforms that I write to
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
            {["lethal_astra", "justaman045", "1stay_Consistent", "shawmir26"].map((instagramUsername) => {
              return (
                <a
                  key={`${instagramUsername}1`}
                  className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="my-6 grid h-24 w-3/4 place-items-center">
                    <h1>{instagramUsername}</h1>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
