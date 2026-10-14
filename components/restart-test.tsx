'use client';

import { useTypingTest } from "@/providers/typing-test-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const RestartTest = () => {
    const { hasStarted, restartGame } = useTypingTest();

    return <div className={cn("flex w-full pt-8 items-center justify-center", hasStarted ? "visible" : "invisible")}>
        <Button className="bg-neutral-800 hover:bg-neutral-800/80" onClick={restartGame}>
            Restart Test
        </Button>
    </div>
}

export default RestartTest;