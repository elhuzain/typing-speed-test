"use client";

import Image from "next/image";

import { useTypingTest } from "@/providers/typing-test-provider";
import { Button } from "@/components/ui/button";

export default function GameCompleted() {
  const {
    restartGame,
    wpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
  } = useTypingTest();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
      <Image
        width="64"
        height="64"
        alt=""
        src="/images/icon-completed.svg"
        className="completion-checkmark mb-16 rounded-full"
      />
      <h1 className="mb-2 text-preset-1 font-bold">Test Complete!</h1>
      <p className="test-preset-3 mb-13 text-neutral-400">
        Solid run. Keep pushing to beat your high score.
      </p>
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
        <span>Go Again</span>
        <Image width="24" height="24" alt="" src="/images/icon-restart.svg" />
      </Button>
    </main>
  );
}
