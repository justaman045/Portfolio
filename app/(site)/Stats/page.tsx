import { Metadata } from "next";
import { format, parseISO } from "date-fns";

import { blogginDetails, codingData } from "./StatsComponents";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Social Stats",
    description: "A private-friendly dashboard of Aman Ojha's public writing and coding profile metrics.",
  };
}

export default async function Stats() {
  const blogginPlatforms = await blogginDetails();
  const codingProfile = await codingData();

  return (
    <>
      <div className="container pb-10">
        <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
          <h1 className="mt-0">Social Stats</h1>
          <p className="m-0 text-xl ">Public writing and coding profile metrics from the platforms I use most.</p>
          <time className="text-sm text-slate-500">Last updated: {format(new Date(), "LLLL d, yyyy")}</time>
        </article>
        <hr className="my-4" />
        <div className="flex min-h-screen items-center justify-center px-24">
          <div className="w-full">
            <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4">
              <a
                href="#"
                className="border-blue-gray-50 bg-blue-gray-50/50 absolute z-50 -ml-10 mb-2.5 rounded-md border p-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="pointer-events-none h-3.5 w-3.5 rounded-lg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
              </a>
              <h2 className="!mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
                Writing Platforms
              </h2>
            </div>
            <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
              Writing platforms where I publish engineering notes, tutorials, and product updates.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              {blogginPlatforms.map((profile) => {
                return (
                  <a
                    key={`${profile.platformName}key`}
                    className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="my-6 grid h-24 w-3/4 place-items-center">
                      <h1>{profile.platformName}</h1>
                      <h3>
                        {profile.platformName} Followers: {profile.followers}
                      </h3>
                      {profile.numberOfArticles ? (
                        <h3>
                          Articles Published on {profile.platformName}: {profile.numberOfArticles}
                        </h3>
                      ) : (
                        <></>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4 pt-8">
              <a
                href="#"
                className="border-blue-gray-50 bg-blue-gray-50/50 absolute z-50 -ml-10 mb-2.5 rounded-md border p-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="pointer-events-none h-3.5 w-3.5 rounded-lg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
              </a>
              <h2 className="!mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
                Development Source Codes and Profiles
              </h2>
            </div>
            <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
              Source-code profiles and public development footprint.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              {codingProfile.map((profile) => {
                return (
                  <a
                    key={`${profile.public_repo}key`}
                    className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                    href={`https://${profile.username}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="my-6 grid h-24 w-3/4 place-items-center">
                      <h1>{profile.platform}</h1>
                      <h3>
                        {profile.platform} Repository: {profile.public_repo}
                      </h3>
                      {profile.followers ? (
                        <h3>
                          {profile.platform} Followers: {profile.followers}
                        </h3>
                      ) : (
                        <></>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
