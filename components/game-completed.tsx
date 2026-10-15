"use client";

import Image from "next/image";

import { useTypingTest } from "@/providers/typing-test-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/lib";

export default function GameCompleted() {
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

  return (
    <main className="flex pt-8 lg:pt-16 flex-col items-center justify-center text-white">
      <Image
        width={isNewPersonalBest ? 80 : 64}
        height={isNewPersonalBest ? 80 : 64}
        alt=""
        src={isNewPersonalBest ? "/images/icon-new-pb.svg" : "/images/icon-completed.svg"}
        className={cn("mb-16 rounded-full", !isNewPersonalBest && "completion-checkmark")}
      />
      <h1 className="mb-2 text-preset-1 font-bold">{title}</h1>
      <p className="test-preset-3 mb-13 text-neutral-400">{message}</p>
      <dl className="mb-16 flex flex-col sm:flex-row items-center gap-5">
        <div className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">WPM:</dt>
          <dd className="text-preset-2 font-bold">{wpm}</dd>
        </div>
        <div className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">Accuracy:</dt>
          <dd className="text-preset-2 font-bold text-red-500">{accuracy}%</dd>
        </div>
        <div className="py-3 px-6 space-y-4 border border-neutral-700 rounded-lg min-w-40 w-full">
          <dt className="text-preset-3 text-neutral-400">Characters:</dt>
          <dd className="text-preset-2 font-bold text-neutral-500">
            <span className="text-green-500">{correctCharacters}</span>
            {"/"}
            <span className="text-red-500">{incorrectCharacters}</span>
          </dd>
        </div>
      </dl>
      <Button variant="secondary" onClick={restartGame}>
        <span>{isFirstGame || isNewPersonalBest ? "Beat This Score" : "Go Again"}</span>
        <Image width="24" height="24" alt="" src="/images/icon-restart.svg" />
      </Button>
      {
        isNewPersonalBest && <div className="pointer-events-none fixed w-full h-screen bottom-0 inset-x-0 flex items-end justify-end">
          <Image className="w-full" alt="" width="1440" height="326" src="/images/pattern-confetti.svg" />
        </div>
      }
    </main>
  );
}
