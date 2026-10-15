'use client';

import Image from "next/image";

import { cn } from "@/lib/lib";
import {
    useTypingTest,
    type Difficulty,
    type GameMode,
} from "@/providers/typing-test-provider";

const Controls = () => {
    const { difficulty, setDifficulty, mode, setMode, hasStarted } = useTypingTest();

    return <>
      <div className="flex items-center gap-2 md:hidden">
        <label className="relative">
          <span className="sr-only">Difficulty</span>
          <select
            aria-label="Difficulty"
            className="min-w-25 appearance-none rounded-lg border border-neutral-500 bg-neutral-900 py-2 ps-3 pe-8 text-preset-5 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
            value={difficulty}
            disabled={hasStarted}
            onChange={(event) => setDifficulty(event.target.value as Difficulty)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <Image
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
            src="/images/icon-down-arrow.svg"
            width={11}
            height={6}
            alt=""
          />
        </label>

        <label className="relative">
          <span className="sr-only">Mode</span>
          <select
            aria-label="Mode"
            className="min-w-34 appearance-none rounded-lg border border-neutral-500 bg-neutral-900 py-2 ps-3 pe-8 text-preset-5 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
            value={mode}
            disabled={hasStarted}
            onChange={(event) => setMode(event.target.value as GameMode)}
          >
            <option value="timed">Timed (60s)</option>
            <option value="passage">Passage</option>
          </select>
          <Image
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
            src="/images/icon-down-arrow.svg"
            width={11}
            height={6}
            alt=""
          />
        </label>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <fieldset className="flex gap-2 items-center border-e-2 border-neutral-700 pe-6 me-2">
            <div className="me-3.5">
                <legend className="text-preset-3 text-neutral-400">Difficulty:</legend>
            </div>

            <label className={cn("border outline-2 outline-solid outline-offset-2 outline-transparent focus-within:outline-blue-400 border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "easy" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="easy" checked={difficulty === "easy"} disabled={hasStarted} onChange={() => setDifficulty("easy")} />
                Easy
            </label>

            <label className={cn("border outline-2 outline-solid outline-offset-2 outline-transparent focus-within:outline-blue-400 border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "medium" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="medium" checked={difficulty === "medium"} disabled={hasStarted} onChange={() => setDifficulty("medium")} />
                Medium
            </label>

            <label className={cn("border outline-2 outline-solid outline-offset-2 outline-transparent focus-within:outline-blue-400 border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "hard" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="hard" checked={difficulty === "hard"} disabled={hasStarted} onChange={() => setDifficulty("hard")} />
                Hard
            </label>
        </fieldset>

        <fieldset className="flex gap-2 items-center">
            <div className="me-3.5">
                <legend className="text-preset-3 text-neutral-400">Mode:</legend>
            </div>

            <label className={cn("border outline-2 outline-solid outline-offset-2 outline-transparent focus-within:outline-blue-400 border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white whitespace-nowrap rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", mode === "timed" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="mode" value="timed" checked={mode === "timed"} disabled={hasStarted} onChange={() => setMode("timed")} />
                Timed (60s)
            </label>

            <label className={cn("border outline-2 outline-solid outline-offset-2 outline-transparent focus-within:outline-blue-400 border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", mode === "passage" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="mode" value="passage" checked={mode === "passage"} disabled={hasStarted} onChange={() => setMode("passage")} />
                Passage
            </label>
        </fieldset>
      </div>
    </>
}

export default Controls;
