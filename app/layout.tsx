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
        <Suspense fallback={<div className="fixed w-full h-full inset-0 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
          <AppProvider>{children}</AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
