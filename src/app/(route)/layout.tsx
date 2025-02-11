"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import classNames from "classnames";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { AudioLines, ChevronLeft, ChevronRight, EqualSquareIcon, Music, X } from "lucide-react";
import { ScrollArea } from "radix-ui";
import MusicList from "./listen/MusicList";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Navbar />
            <div className="pt-10 pb-20 h-screen">{children}</div>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
}
