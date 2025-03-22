import fs from "fs";
import path from "path";

import { MarpSlides } from "@/components/MarpSlides";
import { generateRenderedMarp } from "@/lib/marp";

export async function generateStaticParams() {
  const researchPath = path.join(process.cwd(), "research");
  const files = fs.readdirSync(researchPath);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  return {
    title: `Marp Slide - ${params.slug}`,
  };
}

export default async function SlidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const filePath = path.join(process.cwd(), "research", `${params.slug}.md`);
  const markdown = fs.readFileSync(filePath, "utf-8");

  const { html, css, fonts } = await generateRenderedMarp(markdown);

  return (
    <div className="p-4">
      <MarpSlides
        dataHtml={JSON.stringify(html)}
        dataCss={css}
        dataFonts={JSON.stringify(fonts)}
      />
    </div>
  );
}
