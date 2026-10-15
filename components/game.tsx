"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Controls from "@/components/controls";
import Indicators from "@/components/indicators";
import PassageTyper from "@/components/passage-typer";
import RestartTest from "@/components/restart-test";

gsap.registerPlugin(useGSAP);

export default function Game() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .from("[data-animate='indicators']", {
        autoAlpha: 0,
        x: -28,
        duration: 0.5,
      })
      .from("[data-animate='controls']", {
        autoAlpha: 0,
        x: 28,
        duration: 0.5,
      }, "<0.08")
      .from("[data-animate='passage']", {
        // autoAlpha: 0,
        scale: 0.985,
        // y: 32,
        duration: 0.65,
      }, "-=0.2")
      .from("[data-animate='restart']", {
        y: 18,
        duration: 0.4,
      }, "-=0.2");
  }, { scope: containerRef });

  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <main ref={containerRef} className="flex w-full px-4 max-w-310 flex-col items-center justify-between sm:items-start">
        <div className="flex w-full items-center justify-between border-b border-neutral-800 pb-4">
          <div data-animate="indicators">
            <Indicators />
          </div>
          <div data-animate="controls">
            <Controls />
          </div>
        </div>
        <div data-animate="passage" className="w-full">
          <PassageTyper />
        </div>
        <div data-animate="restart" className="w-full">
          <RestartTest />
        </div>
      </main>
    </div>
  );
}
