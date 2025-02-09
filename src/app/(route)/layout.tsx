"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";
import { AudioLines, ChevronLeft, ChevronRight, EqualSquareIcon, Music, X } from "lucide-react";
import { ScrollArea } from "radix-ui";
import MusicList from "./MusicList";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [listOpen, setListOpen] = useState(false);
    const [eqOpen, setEqOpen] = useState(false);
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 px-10 relative overflow-x-hidden">
                <motion.div
                    className="flex  items-center overflow-hidden absolute w-9/12 bg-zinc-800 h-full top-0 left-0 duration-200 "
                    animate={{ x: listOpen ? "0%" : "calc(calc(100% - calc(var(--spacing) * 10)) * -1)" }}
                    transition={{ duration: 0.1, ease: "anticipate" }}
                >
                    <MusicList />
                    <button className={classNames("h-full w-10 p-2 select-none", listOpen && "bg-zinc-700")} onClick={() => setListOpen((prev) => !prev)}>
                        <div className="relative  h-full">
                            <Music />
                            <div className="absolute w-fit origin-center -rotate-90 top-16 -translate-x-4 flex gap-2">Library</div>
                            {listOpen && <X className="absolute bottom-4" />}
                        </div>
                    </button>
                </motion.div>
                {children}
                <motion.div
                    className="flex  items-center overflow-hidden absolute w-3/12 bg-zinc-800 h-full top-0 right-0  duration-200 "
                    animate={{ x: eqOpen ? "0%" : "calc(calc(100% - calc(var(--spacing) * 10)) * 1)" }}
                    transition={{ duration: 0.1, ease: "anticipate" }}
                    // onMouseEnter={() => {
                    //     setEqOpen(true);
                    //     setListOpen(false);
                    // }}
                >
                    <button className={classNames("h-full w-10 p-2 select-none", eqOpen && "bg-zinc-700")} onClick={() => setEqOpen((prev) => !prev)}>
                        <div className="relative  h-full">
                            <AudioLines />
                            <div className="absolute w-fit origin-center rotate-90 top-16 -translate-x-4 flex gap-2">Equilizer</div>
                            {eqOpen && <X className="absolute bottom-4" />}
                        </div>
                    </button>
                </motion.div>
                {/* <div className="absolute w-96 h-full bg-zinc-800 top-0 -right-[calc(calc(var(--spacing)*96)-calc(var(--spacing)*10))] rounded-l-2xl"></div> */}
            </div>
            <Footer />
        </div>
    );
}
