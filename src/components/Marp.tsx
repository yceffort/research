"use client";

import { useEffect, useRef } from "react";

import classNames from "classnames";

import { useFontFace } from "@/hooks/useFontFace";

interface RenderedMarp {
  html: string[];
  css: string;
  fonts: string[];
}

interface MarpProps {
  border?: boolean;
  className?: string;
  rendered: RenderedMarp;
  page?: number;
}

export function Marp({
  border = true,
  className,
  rendered,
  page = 1,
}: MarpProps) {
  const { html, css, fonts } = rendered;
  const elementRef = useRef<HTMLSpanElement>(null);

  useFontFace(fonts);

  useEffect(() => {
    const hostEl = elementRef.current;
    if (!hostEl) {
      return;
    }

    if (!hostEl.shadowRoot) {
      hostEl.attachShadow({ mode: "open" });
    }
    const shadowRoot = hostEl.shadowRoot as ShadowRoot;

    const slideHtml = html[page - 1] || "";

    // Shadow DOM 내부에 HTML과 CSS 삽입
    shadowRoot.innerHTML = `
      ${slideHtml}
      <style>${css}</style>
      <style>
        :host { 
          all: initial; 
        }
        :host > [data-marpit-svg] {
          vertical-align: top;
        }
      </style>
    `;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { browser } = require("@marp-team/marp-core/browser");
    return browser(shadowRoot);
  }, [html, css, page]);

  return (
    <div className={classNames(border && "border shadow-lg", className)}>
      {/* Shadow DOM의 호스트가 될 span */}
      <span ref={elementRef} />
    </div>
  );
}
