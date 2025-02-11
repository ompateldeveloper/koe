import React, { useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
interface AnimatedGridCellProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

const AnimatedGridCell = React.forwardRef<HTMLDivElement, AnimatedGridCellProps>(({ children, ...props }, ref) => {
    return (
        <motion.div ref={ref} {...props} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, staggerChildren: 0.5 }} layout>
            {children}
        </motion.div>
    );
});
AnimatedGridCell.displayName = "AnimatedGridCell";

interface AnimatedGridProps {
    children: React.ReactNode;
}
const AnimatedGrid = React.forwardRef<HTMLDivElement, AnimatedGridProps>(({ children, ...props }, ref) => {
    return (
        <div ref={ref} className="flex flex-wrap gap-4 pt-4" {...props}>
            <AnimatePresence>{children}</AnimatePresence>
        </div>
    );
});

export { AnimatedGrid, AnimatedGridCell };
