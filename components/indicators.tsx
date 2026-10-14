"use client";

import { useTypingTest } from "@/providers/typing-test-provider";

const Indicators = () => {
    const { accuracy, time, wpm } = useTypingTest();

    return <dl className="flex text-white items-center">
        <div className="flex items-center gap-2 pe-8 me-8 border-e border-neutral-700">
            <dt className="text-preset-3 text-neutral-400">WPM:</dt>
            <dd className="text-preset-2">{wpm}</dd>
        </div>

        <div className="flex items-center gap-2 pe-8 me-8 border-e border-neutral-700">
            <dt className="text-preset-3 text-neutral-400">Accuracy:</dt>
            <dd className="text-preset-2">{accuracy}%</dd>
        </div>

        <div className="flex items-center gap-2">
            <dt className="text-preset-3 text-neutral-400">Time:</dt>
            <dd className="text-preset-2">{time}</dd>
        </div>
    </dl>
}

export default Indicators;
