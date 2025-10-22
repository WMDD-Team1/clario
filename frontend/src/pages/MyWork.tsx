import Projects from '@components/Projects';
import { useState } from 'react'

const MyWork = () => {
    const [view, setView] = useState<"projects" | "clients">("projects");
    return (
        <>
            <div className="header flex justify-between items-center mb-8">
                <div className="header-left flex items-center gap-4">
                    <h1>My Work</h1>
                    <div className="toggle-view flex bg-gray-200 rounded-xl p-1">
                        <button className={`px-4 py-1 rounded-lg text-sm font-medium transition ${view === "projects"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-600"
                            }`} onClick={() => setView("projects")}>All Projects</button>
                        <button className={`px-4 py-1 rounded-lg text-sm font-medium transition ${view === "clients"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-600"
                            }`} onClick={() => setView("clients")}>All Clients</button>
                    </div>
                </div>
                <button className="bg-gray-200 hover:bg-gray-300 text-sm px-5 py-2 rounded-xl font-medium">
                    Add Project
                </button>
            </div>
            {view === 'projects' ? <Projects/> : null}
        </>
    )
}

export default MyWork