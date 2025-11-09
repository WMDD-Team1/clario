import { fetchProjectById } from '@api/index';
import ProjectDrawer from '@components/forms/Project/ProjectDrawer';
import Invoices from '@components/Invoices';
import Loader from '@components/Loader';
import Milestones from '@components/Milestones';
import ProjectBanner from '@components/ProjectBanner';
import StatusPill from '@components/StatusPill';
import ToggleButton from '@components/ToggleButton';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [view, setView] = useState({
        key: "milestones",
        label: "Milestones",
    });
    const [isFormOpen, setIsFormOpen] = useState(false)
    const navigate = useNavigate();
    const { data: project, isLoading, error } = useQuery({
        queryKey: ["projects", id],
        queryFn: () => fetchProjectById(id!),
        enabled: !!id,
    });

    if (isLoading) return (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader />
        </div>
    )
    if (error) return <p>Error getting your project</p>
    if (!project) return <p>No project was found</p>

    const views = [
        {
            key: "milestones",
            label: "Milestones",
        },
        {
            key: "invoices",
            label: "Invoices",
        }
    ];

    return (
        <>
            <div className='flex justify-start items-center gap-2 mb-7'>
                <ChevronLeft size={30} onClick={(e) => navigate(-1)} className='cursor-pointer' />
                <h2>{project.name}</h2>
                <StatusPill status={project.isArchived ? "Archived" : project.isActive ? "Active" : "Inactive"}/>
            </div>
            <div className='flex gap-5'>
                <ProjectBanner project={project} onEdit={() => setIsFormOpen(true)} />
                <ProjectDrawer isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="edit" project={project}/>
                <div className='overflow-x-auto overflow-y-hidden'>
                    <div className='sticky left-0'>
                        <ToggleButton options={views} option={view} onClick={setView} />
                    </div>
                    <div className='mt-[20px]'>
                        {view.key == 'milestones' ? <Milestones milestones={project.milestones ?? []} projectId={project.id} /> : <Invoices projectId={project.id} />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProjectDetails