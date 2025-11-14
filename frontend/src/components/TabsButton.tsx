interface Props {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}
const TabsButton = ({ tabs, activeTab, onTabChange }: Props) => {
    return (
        <div className="flex justify-center w-full mt-4 mb-6">
            <div className="flex bg-white rounded-xl p-1 w-full max-w-md justify-between">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`flex-1 py-2 rounded-[10px] transition-all ${activeTab === tab
                            ? 'bg-[var(--tab-background)] text-white'
                            : 'text-[var(--background-focus)] hover:opacity-80'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TabsButton