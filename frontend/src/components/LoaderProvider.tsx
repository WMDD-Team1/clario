import { createContext, useContext, useState, ReactNode } from "react";
import Loader from "./Loader";

interface LoaderContextProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-[9999]">
                    <Loader/>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error("useLoader must be used within LoaderProvider");
    return context;
};
