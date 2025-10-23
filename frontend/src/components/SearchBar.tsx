import { Search } from "lucide-react"; // modern lightweight icons

interface Props {
    needCollapse?: boolean;
    isSearchOpen: boolean;
    placeholder?: string;
    onSearchOpen: (i: boolean) => void;
}

export default function SearchBar({ needCollapse = true, isSearchOpen, placeholder = "Search...", onSearchOpen }: Props) {

    return (
        <div
            className={!needCollapse ? '' : `flex items-center justify-center gap-5 transition-all duration-300 ${isSearchOpen ? "flex-1" : ""
                }`}
        >
            {/* Search icon (mobile) */}
            <button
                onClick={() => onSearchOpen(!isSearchOpen)}
                className={`block  text-blue-500 ${needCollapse ? 'md:hidden' : 'hidden'}`}
            >
                <Search size={22} />
            </button>

            {/* Search bar (hidden on mobile unless open) */}
            <div
                className={`${!needCollapse ? "flex items-center bg-[#F8FBFF] border border-gray-200 rounded-full px-4 py-2" : isSearchOpen
                    ? "flex absolute left-0 right-0 mx-6 bg-[#F8FBFF] border border-gray-200 rounded-full px-4 py-2 items-center z-10"
                    : "hidden md:flex items-center bg-[#F8FBFF] border border-gray-200 rounded-full px-4 py-2"
                    }`}
            >
                <Search className="text-blue-500 w-5 h-5 mr-3" strokeWidth={2} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
                    autoFocus={isSearchOpen}
                />
                {/* Close button (only when expanded on mobile) */}
                {isSearchOpen && (
                    <button
                        onClick={() => onSearchOpen(false)}
                        className="ml-3 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}