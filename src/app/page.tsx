import fs from "fs";
import path from "path";

import Link from "next/link";

import { format } from "date-fns/format";
import matter from "gray-matter";

import LayoutWrapper from "@/components/LayoutWrapper";
import { SiteConfig } from "@/config";

export default async function Page() {
  const researchPath = path.join(process.cwd(), "research");
  const allFiles = fs.readdirSync(researchPath);
  const mdFiles = allFiles.filter((file) => file.endsWith(".md"));

  const slides = mdFiles.map((filename) => {
    const slug = filename.replace(/\.md$/, "");

    const content = fs.readFileSync(path.join(researchPath, filename), "utf-8");
    const { data } = matter(content);
    const date = format(data.date || new Date(), "yyyy-MM-dd");
    const tags: string[] = data.tags || [];
    const description = data.description;

    return {
      filename,
      slug,
      date,
      tags,
      description,
    };
  });

  return (
    <LayoutWrapper>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Researches
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {SiteConfig.subtitle}
          </p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {slides.map((slide, index) => {
            const { slug, date, tags, description } = slide;

            return (
              <li key={index} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/slides/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {slug}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((t) => (
                              <span
                                key={t}
                                className="mr-3 text-sm font-medium uppercase text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {t.split(" ").join("-")}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/slides/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${slug}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href="/pages/1"
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label="all posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </LayoutWrapper>
  );
}
