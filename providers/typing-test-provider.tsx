"use client";

import {
  useCallback,
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import passages from "@/lib/data.json";

export type GameMode = "timed" | "passage";
export type Difficulty = keyof typeof passages;

type TypingTestContextValue = {
  passage: string;
  typedCharacters: string[];
  hasStarted: boolean;
  difficulty: Difficulty;
  mode: GameMode;
  time: number;
  accuracy: number;
  wpm: number;
  inputRef: RefObject<HTMLInputElement | null>;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: GameMode) => void;
  startTyping: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  restartGame: () => void;
};

const TypingTestContext = createContext<TypingTestContextValue | null>(null);

export function TypingTestProvider({
  children,
  initialPassage,
}: {
  children: ReactNode;
  initialPassage: string;
}) {
  const router = useRouter();
  const [passage, setPassage] = useState(initialPassage);
  const [typedCharacters, setTypedCharacters] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [difficulty, setDifficultyState] = useState<Difficulty>("hard");
  const [mode, setModeState] = useState<GameMode>("timed");
  const [time, setTime] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);
  const typedCharactersRef = useRef<string[]>([]);
  const timeRef = useRef(60);
  const hasFinishedRef = useRef(false);
  const correctCharacters = typedCharacters.reduce(
    (total, character, index) => total + Number(character === passage[index]),
    0,
  );
  const elapsedSeconds = mode === "timed" ? 60 - time : time;
  const accuracy = typedCharacters.length === 0
    ? 100
    : Math.round((correctCharacters / typedCharacters.length) * 100);
  const wpm = elapsedSeconds === 0
    ? 0
    : Math.round((correctCharacters / 5) / (elapsedSeconds / 60));

  const finishGame = useCallback(() => {
    if (hasFinishedRef.current) return;

    hasFinishedRef.current = true;
    router.push("/finished");
  }, [router]);

  const restartGame = useCallback(() => {
    hasFinishedRef.current = false;
    setHasStarted(false);
    setTypedCharacters([]);
    typedCharactersRef.current = [];
    setTime(mode === "timed" ? 60 : 0);
    timeRef.current = mode === "timed" ? 60 : 0;
    inputRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = window.setInterval(() => {
      const nextTime = mode === "passage"
        ? timeRef.current + 1
        : Math.max(0, timeRef.current - 1);

      timeRef.current = nextTime;
      setTime(nextTime);

      if (mode === "timed" && nextTime === 0) {
        finishGame();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [finishGame, hasStarted, mode]);

  const setMode = (nextMode: GameMode) => {
    if (hasStarted) return;

    setModeState(nextMode);
    const initialTime = nextMode === "timed" ? 60 : 0;
    timeRef.current = initialTime;
    setTime(initialTime);
  };

  const setDifficulty = (nextDifficulty: Difficulty) => {
    if (hasStarted) return;

    const availablePassages = passages[nextDifficulty];
    const randomIndex = Math.floor(Math.random() * availablePassages.length);

    setDifficultyState(nextDifficulty);
    setPassage(availablePassages[randomIndex].text);
    typedCharactersRef.current = [];
    setTypedCharacters([]);
  };

  const startTyping = () => {
    setHasStarted(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const nextCharacters = typedCharactersRef.current.slice(0, -1);
      typedCharactersRef.current = nextCharacters;
      setTypedCharacters(nextCharacters);
      return;
    }

    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    event.preventDefault();
    if (typedCharactersRef.current.length >= passage.length) return;

    const nextCharacters = [...typedCharactersRef.current, event.key];
    typedCharactersRef.current = nextCharacters;
    setTypedCharacters(nextCharacters);

    if (nextCharacters.length === passage.length) {
      finishGame();
    }
  };

  return (
    <TypingTestContext.Provider
      value={{
        passage,
        typedCharacters,
        hasStarted,
        difficulty,
        mode,
        time,
        accuracy,
        wpm,
        inputRef,
        setDifficulty,
        setMode,
        startTyping,
        handleKeyDown,
        restartGame,
      }}
    >
      {children}
    </TypingTestContext.Provider>
  );
}

export function useTypingTest() {
  const context = useContext(TypingTestContext);

  if (!context) {
    throw new Error("useTypingTest must be used within a TypingTestProvider");
  }

  return context;
}
