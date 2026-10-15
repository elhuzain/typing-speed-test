import Image from "next/image";

const Header = () => {
    return <header className="bg-neutral-900">
        <div className="max-w-310 py-8 px-4 mx-auto w-full flex items-center justify-between">
            <Image src="/images/logo-large.svg" width="267" height="40" alt="Logo" />
            <p className="flex items-center gap-2">
                <Image alt="" src="/images/icon-personal-best.svg" width="21" height="18" />
                <span className="text-preset-4 text-neutral-400">Personal best: </span>
                <span className="text-white">92 WPM</span>
            </p>
        </div>
    </header>
}

export default Header;