import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
                    className="fixed right-0 top-0 h-full w-full md:max-w-md bg-white shadow-2xl z-50 flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 bg-blue-50 rounded-t-2xl">
                        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormDrawer;
