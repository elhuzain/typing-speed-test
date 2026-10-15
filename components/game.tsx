import Controls from "@/components/controls";
import Indicators from "@/components/indicators";
import PassageTyper from "@/components/passage-typer";
import RestartTest from "@/components/restart-test";

export default function Game() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <main className="flex w-full px-4 max-w-310 flex-col items-center justify-between sm:items-start">
        <div className="flex w-full items-center justify-between border-b border-neutral-800 pb-4">
          <Indicators />
          <Controls />
        </div>
        <PassageTyper />
        <RestartTest />
      </main>
    </div>
  );
}
