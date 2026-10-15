"use client";

import { useEffect, useRef, useState } from "react";

import { useTypingTest } from "@/providers/typing-test-provider";

const Indicators = () => {
    const { accuracy, hasStarted, time, wpm } = useTypingTest();
    const [announcement, setAnnouncement] = useState("");
    const latestMetricsRef = useRef({ accuracy, time, wpm });
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    const formattedTime = `${minutes}:${seconds}`;

    useEffect(() => {
        latestMetricsRef.current = { accuracy, time, wpm };
    }, [accuracy, time, wpm]);

    useEffect(() => {
        if (!hasStarted) return;

        const interval = window.setInterval(() => {
            const metrics = latestMetricsRef.current;
            const announcementMinutes = Math.floor(metrics.time / 60).toString().padStart(2, "0");
            const announcementSeconds = (metrics.time % 60).toString().padStart(2, "0");

            setAnnouncement(
                `${metrics.wpm} words per minute, ${metrics.accuracy} percent accuracy, time ${announcementMinutes}:${announcementSeconds}`,
            );
        }, 10_000);

        return () => window.clearInterval(interval);
    }, [hasStarted]);

    return <>
      <dl className="flex text-white items-center">
        <div className="flex items-center gap-2 pe-8 me-8 border-e border-neutral-700">
            <dt className="text-preset-3 text-neutral-400">WPM:</dt>
            <dd className="text-preset-2">{wpm}</dd>
        </div>

        <div className="flex items-center gap-2 pe-8 me-8 border-e border-neutral-700">
            <dt className="text-preset-3 text-neutral-400">Accuracy:</dt>
            <dd className="text-preset-2 text-red-500">{accuracy}%</dd>
        </div>

        <div className="flex items-center gap-2">
            <dt className="text-preset-3 text-neutral-400">Time:</dt>
            <dd className="text-preset-2 text-yellow-400">{formattedTime}</dd>
        </div>
      </dl>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </>
}

export default Indicators;
