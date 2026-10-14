import Controls from "@/components/controls";
import Indicators from "@/components/indicators";
import PassageTyper from "@/components/passage-typer";
import { TypingTestProvider } from "@/providers/typing-test-provider";
import passages from "@/lib/data.json";
import { connection } from "next/server";
import { Suspense } from "react";
import RestartTest from "@/components/restart-test";

function getRandomHardPassage() {
  const randomIndex = Math.floor(Math.random() * passages.hard.length);
  return passages.hard[randomIndex].text;
}

async function TypingTest() {
  await connection();
  const initialPassage = getRandomHardPassage();

  return (
    <TypingTestProvider initialPassage={initialPassage}>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-310 flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
          <div className="flex items-center justify-between w-full border-b border-neutral-800 pb-4">
            <Indicators />
            <Controls />
          </div>
          <PassageTyper />
          <RestartTest />
        </main>
      </div>
    </TypingTestProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <TypingTest />
    </Suspense>
  );
}
