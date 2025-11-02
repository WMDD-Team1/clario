import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface FormDrawerProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FormDrawer = ({ title, isOpen, onClose, children }: FormDrawerProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 100, damping: 25 }}
                    className="fixed right-0 top-0 h-full w-full md:max-w-md bg-white shadow-xl z-50 flex flex-col rounded-l-[50px]"
                >
                    {/* Header */}
                    <div className="relative p-5 bg-[var(--primitive-colors-brand-primary-75)] h-[120px] flex items-center justify-center rounded-tl-[50px]">
                        <h3 className="text-lg font-semibold text-[var(--primitive-colors-gray-light-mode-950)] text-[28px]">{title}</h3>
                    </div>

                    <div className=" absolute w-[40px] h-[40px] top-[100px] left-[30px] rounded bg-[var(--primitive-colors-brand-primary-95)] flex items-center justify-center">
                        <button
                            onClick={onClose}
                            className="text-[var(--primitive-colors-gray-light-mode-600)] hover:text-gray-700 transition-colors rounded-2xl"
                        >
                            <ChevronRight size={30} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5 mt-8">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormDrawer;
