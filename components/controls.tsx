'use client';

import { cn } from "@/lib/lib";
import { useTypingTest } from "@/providers/typing-test-provider";

const Controls = () => {
    const { difficulty, setDifficulty, mode, setMode, hasStarted } = useTypingTest();

    return <div className="flex items-center gap-4">
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
}

export default Controls;
