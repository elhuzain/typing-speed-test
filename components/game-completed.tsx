"use client";

import Image from "next/image";
import { useRef } from "react";

import { useTypingTest } from "@/providers/typing-test-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/lib";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function GameCompleted() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
    restartGame,
    wpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
    isFirstGame,
    isNewPersonalBest,
  } = useTypingTest();

  const title = isFirstGame
    ? "Baseline Established!"
    : isNewPersonalBest
      ? "High Score Smashed!"
      : "Test Complete!";
  const message = isFirstGame
    ? "You’ve set the bar. Now the real challenge begins—time to beat it."
    : isNewPersonalBest
      ? "You’re getting faster. That was incredible typing."
      : "Solid run. Keep pushing to beat your high score.";

  useGSAP(() => {
    headingRef.current?.focus();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .from("[data-animate='icon']", {
        autoAlpha: 0,
        rotation: -12,
        scale: 0.35,
        duration: 0.65,
        ease: "back.out(1.8)",
      })
      .from("[data-animate='title']", {
        autoAlpha: 0,
        y: 24,
        duration: 0.45,
      }, "-=0.3")
      .from("[data-animate='message']", {
        autoAlpha: 0,
        y: 18,
        duration: 0.4,
      }, "-=0.25")
      .from("[data-animate='stat']", {
        autoAlpha: 0,
        scale: 0.94,
        stagger: 0.1,
        y: 28,
        duration: 0.45,
      }, "-=0.15")
      .from("[data-animate='button']", {
        scale: 0.9,
        y: 18,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, "-=0.15")
      .from("[data-animate='confetti']", {
        autoAlpha: 0,
        scale: 0.96,
        y: 50,
        duration: 0.8,
      }, 0.15);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex pt-8 lg:pt-16 flex-col items-center justify-center text-white">
      <Image
        data-animate="icon"
        width={isNewPersonalBest ? 80 : 64}
        height={isNewPersonalBest ? 80 : 64}
        alt=""
        src={isNewPersonalBest ? "/images/icon-new-pb.svg" : "/images/icon-completed.svg"}
        className={cn("mb-16 rounded-full", !isNewPersonalBest && "completion-checkmark")}
      />
      <h1
        ref={headingRef}
        tabIndex={-1}
        data-animate="title"
        className="mb-2 text-preset-1 font-bold"
      >
        {title}
      </h1>
      <p data-animate="message" className="test-preset-3 mb-13 text-neutral-400">{message}</p>
      <dl className="mb-16 flex flex-col sm:flex-row items-center gap-5">
        <div data-animate="stat" className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">WPM:</dt>
          <dd className="text-preset-2 font-bold">{wpm}</dd>
        </div>
        <div data-animate="stat" className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">Accuracy:</dt>
          <dd className="text-preset-2 font-bold text-red-500">{accuracy}%</dd>
        </div>
        <div data-animate="stat" className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">Characters:</dt>
          <dd className="text-preset-2 font-bold text-neutral-500">
            <span className="sr-only">
              {correctCharacters} correct, {incorrectCharacters} incorrect
            </span>
            <span aria-hidden="true">
              <span className="text-green-500">{correctCharacters}</span>
              {"/"}
              <span className="text-red-500">{incorrectCharacters}</span>
            </span>
          </dd>
        </div>
      </dl>
      <Button
        data-animate="button"
        className="relative z-10"
        variant="secondary"
        onClick={restartGame}
      >
        <span>{isFirstGame || isNewPersonalBest ? "Beat This Score" : "Go Again"}</span>
        <Image width="24" height="24" alt="" src="/images/icon-restart.svg" />
      </Button>
      {
        isNewPersonalBest && <div data-animate="confetti" className="pointer-events-none fixed w-full h-screen bottom-0 inset-x-0 flex items-end justify-end">
          <Image className="w-full" alt="" width="1440" height="326" src="/images/pattern-confetti.svg" />
        </div>
      }
    </main>
  );
}
