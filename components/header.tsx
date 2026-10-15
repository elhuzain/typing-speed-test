"use client";

import Image from "next/image";
import { useTypingTest } from "@/providers/typing-test-provider";

const Header = () => {
    const { personalBest } = useTypingTest();

    return <header>
        <div className="max-w-310 py-8 px-4 mx-auto w-full flex items-center justify-between">
            <Image src="/images/logo-large.svg" width="267" height="40" alt="Logo" />
            {personalBest !== null && (
                <p className="flex items-center gap-2">
                    <Image alt="" src="/images/icon-personal-best.svg" width="21" height="18" />
                    <span className="text-preset-4 text-neutral-400">Personal best: </span>
                    <span className="text-white">{personalBest} WPM</span>
                </p>
            )}
        </div>
    </header>
}

export default Header;
