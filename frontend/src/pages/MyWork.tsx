import Button from '@components/Button';
import InsightCard from '@components/InsightCard';
import Projects from '@components/Projects';
import ToggleButton from '@components/ToggleButton';
import { useState } from 'react';

// Static data to be replaced when backend is ready
const myWorkInsights = [
    {
        title: "Total",
        value: "$12.000"
    },
    {
        title: "Active",
        value: "$8.000"
    },
    {
        title: "Inactive",
        value: "10"
    },
    {
        title: "Archive",
        value: "5"
    },
    {
        title: "Clients",
        value: "30"
    }
];

const MyWork = () => {
    const [views, setViews] = useState([
        {
            key: "projects",
            label: "All Projects",
        },
        {
            key: "clients",
            label: "All Clients",
        }
    ])
    const [view, setView] = useState({
        key: "projects",
        label: "All Projects",
    });
    return (
        <>
            <div className='header mb-8'>
                <section className=" md:flex justify-between items-center hidden transition">
                    <div className="header-left flex items-center gap-4">
                        <h2 className='text-[32px] font-serif'>My Work</h2>
                        <ToggleButton options={views} option={view} onClick={setView} />
                    </div>
                    <Button
                        buttonColor="regularButton"
                        onClick={() => console.log()}
                        textColor="white"
                        width="200px"
                    >
                        Add {view.key === 'projects' ? "Project" : "Client"}
                    </Button>
                </section>
                <section className='md:hidden transition'>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-black">My Work</h2>
                        <Button
                            buttonColor="regularButton"
                            onClick={() => console.log()}
                            textColor="white"
                            width="200px"
                        >
                            Add {view.key === 'projects' ? "Project" : "Client"}
                        </Button>
                    </div>
                    <ToggleButton options={views} option={view} onClick={setView} />
                </section>
            </div>

            {/* Insights */}

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-5">
                {myWorkInsights.map((pi, i) => (
                    <InsightCard
                        key={pi.title}
                        title={pi.title}
                        value={pi.value}
                        className={i === 0 ? "col-span-2 md:col-span-1" : ""}
                    />
                ))}
            </div>

            {/* Projects or Clients */}
            <div>{view.key === 'projects' ? <Projects /> : null}</div>
        </>
    )
}

export default MyWork