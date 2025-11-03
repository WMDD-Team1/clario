import Button from '@components/Button';
import { fetchProjectsOverview } from "@api/index";
import ProjectDrawer from '@components/forms/Project/ProjectDrawer';
import InsightCard from '@components/InsightCard';
import Projects from '@components/Projects';
import Clients from '@components/Clients';
import ToggleButton from '@components/ToggleButton';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@components/Loader';

const MY_WORK_VIEWS = [
    {
        key: "projects",
        label: "All Projects",
    },
    {
        key: "clients",
        label: "All Clients",
    }
]

const MyWork = () => {
    const [view, setView] = useState(MY_WORK_VIEWS[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [slide, setSlide] = useState('100%');

    // MY WORK INSIGHTS
    const {isLoading, error, data} = useQuery({
        queryKey: ['projects', 'overview'],
        queryFn: () => fetchProjectsOverview(),
    });

    if (isLoading) return  <Loader type="bar" />

    const myWorkInsights = data ?? []

    return (
        <>
            <div className='header mb-8'>
                {view.key === 'projects' ? <ProjectDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} mode="create" /> : null}
                <section className=" md:flex justify-between items-center hidden transition">
                    <div className="header-left flex items-center gap-4">
                        <h2>My Work</h2>
                        <ToggleButton options={MY_WORK_VIEWS} option={view} onClick={setView} />
                    </div>
                    <Button
                        buttonColor="regularButton"
                        onClick={() => {
                            setIsOpen(true);
                            view.key === 'clients' ? setSlide('0px') : () => { };

                        }}
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
                            onClick={() => {
                                setIsOpen(true);
                                view.key === 'clients' ? setSlide('0px') : () => { };

                            }}
                            textColor="white"
                            width="200px"
                        >
                            Add {view.key === 'projects' ? "Project" : "Client"}
                        </Button>
                    </div>
                    <ToggleButton options={MY_WORK_VIEWS} option={view} onClick={setView} />
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
            <div>{view.key === 'projects' ? <Projects onCreate={() => setIsOpen(true)} /> : <Clients slide={slide} setSlide={(value: string) => setSlide(value)} />}</div>
        </>
    )
}

export default MyWork