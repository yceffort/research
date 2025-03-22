import { Marp as MarpCore } from "@marp-team/marp-core";
import postcss from "postcss";
import postcssImportUrl from "postcss-import-url";

import type { Result as PostCSSResult, AtRule } from "postcss";

const postcssStripFontFace = Object.assign(
  () => ({
    postcssPlugin: "marp-strip-font-face",
    AtRule: (
      rule: AtRule,
      { result }: { result: PostCSSResult & { fonts?: AtRule[] } },
    ) => {
      if (rule.name === "font-face") {
        if (!result.fonts) {
          result.fonts = [];
        }
        result.fonts.push(rule);
        rule.remove();
      }
    },
  }),
  { postcss: true as const },
);

export async function generateRenderedMarp(markdown: string) {
  const marp = new MarpCore({
    container: false,
    script: false,
    printable: false,
  });

  const { html, css } = marp.render(markdown, { htmlAsArray: true });

  const result = await postcss()
    .use(postcssImportUrl)
    .use(postcssStripFontFace)
    .process(css, { from: undefined });

  const typedResult = result as PostCSSResult & { fonts?: AtRule[] };
  const fonts: string[] = (typedResult.fonts || []).map((font) =>
    font.toString(),
  );

  return {
    markdown,
    html,
    css: result.css,
    fonts,
  };
}
