"use client";

import { cn } from "@/lib/lib";
import { useTypingTest } from "../providers/typing-test-provider";
import { Button } from "./ui/button";

const PassageTyper = () => {
  const {
    passage,
    typedCharacters,
    hasStarted,
    inputRef,
    startTyping,
    handleKeyDown,
  } = useTypingTest();

  return (
    <div
      className="relative rounded-sm border-b border-neutral-800 py-8 pb-16 outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-4 focus-within:ring-offset-neutral-900"
    >
      <input
        ref={inputRef}
        aria-label="Type the displayed passage"
        className="absolute h-px w-px opacity-0"
        onKeyDown={handleKeyDown}
        tabIndex={hasStarted ? 0 : -1}
        type="text"
      />

      <button
        type="button"
        aria-label={hasStarted ? "Focus the typing passage" : "Start typing test"}
        className="absolute inset-0 z-10 cursor-text rounded-sm border-0 bg-transparent"
        onClick={startTyping}
        tabIndex={hasStarted ? -1 : 0}
      />

      <p className="px-3 text-preset-1 text-neutral-400">
        {Array.from(passage).map((character, index) => {
          const typedCharacter = typedCharacters[index];
          const isCurrent = hasStarted && index === typedCharacters.length;

          return (
            <span
              key={index}
              className={cn(
                typedCharacter !== undefined &&
                  (typedCharacter === character ? "text-green-500" : "text-red-500 underline underline-offset-10"),
                isCurrent && "shadow-[inset_2px_0_0_var(--blue-400)] bg-neutral-400/20",
              )}
            >
              {character}
            </span>
          );
        })}
      </p>

      {!hasStarted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
          <Button onClick={startTyping}>Start Typing Test</Button>
          <p className="text-preset-3-semibold text-white">
            Or click the text and start typing
          </p>
        </div>
      )}
    </div>
  );
};

export default PassageTyper;
