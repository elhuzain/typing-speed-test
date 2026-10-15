import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import passages from "@/lib/data.json";
import { TypingTestProvider } from "@/providers/typing-test-provider";
import { Loader2 } from "lucide-react";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Frontend Mentor typing speed test challenge",
};

function getRandomHardPassage() {
  const randomIndex = Math.floor(Math.random() * passages.hard.length);
  return passages.hard[randomIndex].text;
}

async function AppProvider({ children }: { children: ReactNode }) {
  await connection();
  const initialPassage = getRandomHardPassage();

  return (
    <TypingTestProvider initialPassage={initialPassage}>
      <Header />
      {children}
    </TypingTestProvider>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", sora.variable)}>
      <body className="min-h-full flex flex-col bg-neutral-900 text-foreground">
        <Suspense fallback={
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 flex h-full w-full items-center justify-center"
          >
            <Loader2 aria-hidden="true" className="animate-spin text-white" />
            <span className="sr-only">Loading typing test</span>
          </div>
        }>
          <AppProvider>{children}</AppProvider>
        </Suspense>
        <footer className="text-xs mt-auto text-center w-full text-white pb-2 pt-4">
          Challenge by <a className="text-yellow-400 underline underline-offset-4" href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href="https://elhuzain.com" className="text-yellow-400 underline underline-offset-4">elhuzain</a>.
        </footer>
      </body>
    </html>
  );
}
