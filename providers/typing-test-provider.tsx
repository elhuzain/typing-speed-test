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
import passages from "@/lib/data.json";

const PERSONAL_BEST_KEY = "personal_best";

export type GameMode = "timed" | "passage";
export type Difficulty = keyof typeof passages;

function getRandomPassage(difficulty: Difficulty) {
  const availablePassages = passages[difficulty];
  const randomIndex = Math.floor(Math.random() * availablePassages.length);
  return availablePassages[randomIndex].text;
}

type TypingTestContextValue = {
  passage: string;
  typedCharacters: string[];
  hasStarted: boolean;
  isFinished: boolean;
  isFirstGame: boolean;
  isNewPersonalBest: boolean;
  personalBest: number | null;
  difficulty: Difficulty;
  mode: GameMode;
  time: number;
  accuracy: number;
  wpm: number;
  correctCharacters: number;
  incorrectCharacters: number;
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
  const [passage, setPassage] = useState(initialPassage);
  const [typedCharacters, setTypedCharacters] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFirstGame, setIsFirstGame] = useState(false);
  const [isNewPersonalBest, setIsNewPersonalBest] = useState(false);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
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
  const incorrectCharacters = typedCharacters.length - correctCharacters;
  const elapsedSeconds = mode === "timed" ? 60 - time : time;
  const accuracy = typedCharacters.length === 0
    ? 100
    : Math.round((correctCharacters / typedCharacters.length) * 100);
  const wpm = elapsedSeconds === 0
    ? 0
    : Math.round((correctCharacters / 5) / (elapsedSeconds / 60));

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedValue = window.localStorage.getItem(PERSONAL_BEST_KEY);
      if (storedValue === null) return;

      const storedPersonalBest = Number(storedValue);
      if (Number.isFinite(storedPersonalBest) && storedPersonalBest >= 0) {
        setPersonalBest(storedPersonalBest);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  const finishGame = useCallback(() => {
    if (hasFinishedRef.current) return;

    const finalCorrectCharacters = typedCharactersRef.current.reduce(
      (total, character, index) => total + Number(character === passage[index]),
      0,
    );
    const finalElapsedSeconds = mode === "timed" ? 60 - timeRef.current : timeRef.current;
    const finalWpm = finalElapsedSeconds === 0
      ? 0
      : Math.round((finalCorrectCharacters / 5) / (finalElapsedSeconds / 60));
    const establishingBaseline = personalBest === null;
    const setNewRecord = personalBest !== null && finalWpm > personalBest;

    if (establishingBaseline || setNewRecord) {
      window.localStorage.setItem(PERSONAL_BEST_KEY, String(finalWpm));
      setPersonalBest(finalWpm);
    }

    hasFinishedRef.current = true;
    setIsFirstGame(establishingBaseline);
    setIsNewPersonalBest(setNewRecord);
    setHasStarted(false);
    setIsFinished(true);
  }, [mode, passage, personalBest]);

  const restartGame = useCallback(() => {
    hasFinishedRef.current = false;
    setIsFirstGame(false);
    setIsNewPersonalBest(false);
    setIsFinished(false);
    setHasStarted(false);
    setTypedCharacters([]);
    typedCharactersRef.current = [];
    setPassage(getRandomPassage(difficulty));
    setTime(mode === "timed" ? 60 : 0);
    timeRef.current = mode === "timed" ? 60 : 0;
  }, [difficulty, mode]);

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

    setDifficultyState(nextDifficulty);
    setPassage(getRandomPassage(nextDifficulty));
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
        isFinished,
        isFirstGame,
        isNewPersonalBest,
        personalBest,
        difficulty,
        mode,
        time,
        accuracy,
        wpm,
        correctCharacters,
        incorrectCharacters,
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
