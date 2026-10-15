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
      className="relative border-b border-neutral-800 py-8 pb-16"
      onClick={startTyping}
    >
      <input
        ref={inputRef}
        aria-label="Type the displayed passage"
        className="absolute h-px w-px opacity-0"
        onKeyDown={handleKeyDown}
        type="text"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
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
