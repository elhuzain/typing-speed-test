import { TypingTestProvider } from "@/providers/typing-test-provider";
import passages from "@/lib/data.json";
import { connection } from "next/server";
import { Suspense } from "react";
import TypingTestView from "@/components/typing-test-view";

function getRandomHardPassage() {
  const randomIndex = Math.floor(Math.random() * passages.hard.length);
  return passages.hard[randomIndex].text;
}

async function TypingTest() {
  await connection();
  const initialPassage = getRandomHardPassage();

  return (
    <TypingTestProvider initialPassage={initialPassage}>
      <TypingTestView />
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
