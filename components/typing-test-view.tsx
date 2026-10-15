"use client";

import Game from "@/components/game";
import GameCompleted from "@/components/game-completed";
import { useTypingTest } from "@/providers/typing-test-provider";

export default function TypingTestView() {
  const { isFinished } = useTypingTest();

  return isFinished ? <GameCompleted /> : <Game />;
}
