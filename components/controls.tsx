'use client';

import { cn } from "@/lib/lib";
import { useState } from "react";

const Controls = () => {
    const [difficulty, setDifficulty] = useState("easy");
    const [mode, setMode] = useState("timed");

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficulty(event.target.value);
    }

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.value);
    }

    return <div className="flex items-center gap-4">
        <fieldset className="flex gap-2 items-center border-e-2 border-neutral-700 pe-6 me-2">
            <div className="me-3.5">
                <legend className="text-preset-3 text-neutral-400">Difficulty:</legend>
            </div>

            <label className={cn("border border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "easy" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="easy" checked={difficulty === "easy"} onChange={handleDifficultyChange} />
                Easy
            </label>

            <label className={cn("border border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "medium" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="medium" checked={difficulty === "medium"} onChange={handleDifficultyChange} />
                Medium
            </label>

            <label className={cn("border border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", difficulty === "hard" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="difficulty" value="hard" checked={difficulty === "hard"} onChange={handleDifficultyChange} />
                Hard
            </label>
        </fieldset>

        <fieldset className="flex gap-2 items-center">
            <div className="me-3.5">
                <legend className="text-preset-3 text-neutral-400">Mode:</legend>
            </div>

            <label className={cn("border border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white whitespace-nowrap rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", mode === "timed" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="mode" value="timed" checked={mode === "timed"} onChange={handleModeChange} />
                Timed (60s)
            </label>

            <label className={cn("border border-neutral-500 py-1.5 px-2.5 text-preset-5 text-white rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-400", mode === "passage" && "border-blue-400 text-blue-400")}>
                <input className="sr-only" type="radio" name="mode" value="passage" checked={mode === "passage"} onChange={handleModeChange} />
                Passage
            </label>
        </fieldset>
    </div>
}

export default Controls;