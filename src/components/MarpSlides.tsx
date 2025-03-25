"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Marp } from "./Marp";

import type { MouseEvent } from "react";
import type { Swiper as SwiperClass } from "swiper";

interface MarpSlidesProps {
  dataHtml: string;
  dataCss: string;
  dataFonts: string;
}

export function MarpSlides({ dataHtml, dataCss, dataFonts }: MarpSlidesProps) {
  const html = useMemo(() => JSON.parse(dataHtml) as string[], [dataHtml]);
  const fonts = useMemo(() => JSON.parse(dataFonts) as string[], [dataFonts]);
  const css = dataCss;

  const [, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);

  const multiple = html.length > 1;

  const handleActiveIndexChange = useCallback((instance: SwiperClass) => {
    setActiveIndex(instance.activeIndex);
    window.location.hash = `#${instance.activeIndex + 1}`;
  }, []);

  const handleSwiper = useCallback((instance: SwiperClass) => {
    swiperRef.current = instance;
    setActiveIndex(instance.activeIndex);
  }, []);

  useEffect(() => {
    if (!multiple) {
      return;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        swiperRef.current?.slidePrev();
      } else if (e.key === "ArrowRight") {
        swiperRef.current?.slideNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [multiple]);

  const handleSlideClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!multiple) {
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const xPos = e.clientX - rect.left;

      if (xPos < rect.width / 2) {
        swiperRef.current?.slidePrev();
      } else {
        swiperRef.current?.slideNext();
      }
    },
    [multiple],
  );

  useEffect(() => {
    if (!multiple) {
      return;
    }

    function handleHashChange() {
      const hash = window.location.hash;
      if (!hash.startsWith("#")) {
        return;
      }

      const maybePage = parseInt(hash.slice(1), 10);
      if (isNaN(maybePage)) {
        return;
      }

      const newIndex = maybePage - 1;
      if (newIndex >= 0 && newIndex < html.length) {
        swiperRef.current?.slideTo(newIndex);
      }
    }

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [multiple, html]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Swiper
        enabled={multiple}
        allowTouchMove={multiple}
        speed={300}
        onActiveIndexChange={handleActiveIndexChange}
        onSwiper={handleSwiper}
      >
        {html.map((_, i) => (
          <SwiperSlide key={i}>
            <div
              onClick={handleSlideClick}
              style={{ cursor: multiple ? "pointer" : "default" }}
            >
              <Marp border rendered={{ html, css, fonts }} page={i + 1} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
