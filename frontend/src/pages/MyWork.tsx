import Button from '@components/Button';
import Projects from '@components/Projects';
import ToggleButton from '@components/ToggleButton';
import { useState } from 'react';

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

            <div>{view.key === 'projects' ? <Projects /> : null}</div>
        </>
    )
}

export default MyWork