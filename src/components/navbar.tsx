import { User } from "lucide-react";
import React from "react";

export default function Navbar() {
    return (
        <div className=" px-12 h-12 flex items-center justify-between border-b border-b-zinc-800">
            <div className="flex-1 text-xl">Koe</div>
            <div className="flex-1 h-full"><input type="text" className="w-md h-full outline-none border-b-2 border-b-zinc-700 focus:border-b-primary"/></div>
            <div className="flex-1 flex justify-end"><User/></div>
        </div>
    );
}
