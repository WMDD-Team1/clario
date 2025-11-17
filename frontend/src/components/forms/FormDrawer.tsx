import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Ref } from "react";

interface FormDrawerProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    divRef: Ref<HTMLDivElement> | null;
}

const FormDrawer = ({ title, isOpen, onClose, children, divRef }: FormDrawerProps) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[1000] backdrop-blur-sm bg-[var(--primitive-colors-brand-primary-500-base)]/40"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={divRef}
                        initial={{ x: "110%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "110%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 25 }}
                        className="fixed right-0 top-0 h-full w-full md:max-w-md bg-[var(--general-alpha)] shadow-xl z-1010 flex flex-col rounded-l-[50px]"
                    >
                        {/* Header */}
                        <div className="relative p-5 bg-[var(--primitive-colors-brand-primary-75)] h-[120px] flex items-center justify-center rounded-tl-[50px]">
                            <h3 className="text-lg font-semibold text-[var(--primitive-colors-gray-light-mode-950)] text-[28px]">{title}</h3>
                        </div>

                        <div className=" absolute w-12 h-12 top-24 cursor-pointer left-[30px] md:left-[-20px] rounded-[1rem] bg-[var(--primitive-colors-brand-primary-95)] flex items-center justify-center"
                        onClick={onClose}
                        >
                            <button
                                className="text-[var(--primitive-colors-gray-light-mode-600)] hover:text-gray-700 transition-colors rounded-2xl cursor-pointer"
                            >
                                <ChevronRight size={30} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 mt-8">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FormDrawer;
