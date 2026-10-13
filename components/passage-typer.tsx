import { Button } from "./ui/button";

const PassageTyper = () => {
    return <div className="py-8 relative pb-16 border-b border-neutral-800">
        <p className="text-preset-1 text-neutral-400 px-2">
            The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. \"We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods,\" the lead researcher observed. \"Globalization isn't as modern as we assume.
        </p>
        <div className="absolute flex flex-col gap-4 items-center justify-center top-0 w-full h-full backdrop-blur-sm">
            <Button>Start Typing Test</Button>
            <p className="text-white text-preset-3-semibold">Or click the text and start typing</p>
        </div>
    </div>
}

export default PassageTyper;