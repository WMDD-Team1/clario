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
            <div className="header flex justify-between items-center mb-8">
                <div className="header-left flex items-center gap-4">
                    <h1 className='text-[32px] font-serif'>My Work</h1>
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
            </div>
            <div>{view.key === 'projects' ? <Projects /> : null}</div>
        </>
    )
}

export default MyWork