import { fetchProjectById } from '@api/index';
import ProjectDrawer from '@components/forms/Project/ProjectDrawer';
import Invoices from '@components/Invoices';
import Loader from '@components/Loader';
import Milestones from '@components/Milestones';
import ProjectBanner from '@components/ProjectBanner';
import StatusPill from '@components/StatusPill';
import TabsButton from '@components/TabsButton';
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
    const [mobileView, setMobileView] = useState<string>("overview");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isClientOpen, setIsClientOpen] = useState(false);
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
            <div className='flex justify-start items-center gap-2 mb-7 sticky top-35 z-100 bg-[var(--full-bg)]'>
                <ChevronLeft size={30} onClick={(e) => navigate(-1)} className='cursor-pointer text-[var(--primary-text)]' />
                <h2>{project.name}</h2>
                <StatusPill status={project.isArchived ? "Archived" : project.isActive ? "Active" : "Draft"} />
            </div>
            <div className='hidden md:flex gap-5'>
                <ProjectBanner project={project} onEdit={() => setIsFormOpen(true)} />
                <ProjectDrawer isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="edit" project={project} isClientOpen={isClientOpen}
            onClientClose={() => setIsClientOpen(false)} onOpenClientSlide={() => setIsClientOpen(true)}/>
                <div className='overflow-x-auto overflow-y-hidden flex-1 min-w-0'>
                    <div className='sticky left-0'>
                        <ToggleButton options={views} option={view} onClick={setView} />
                    </div>
                    <div className='mt-[20px]'>
                        {view.key == 'milestones' ? <Milestones milestones={project.milestones ?? []} projectId={project.id} /> : <Invoices projectId={project.id} />}
                    </div>
                </div>
            </div>
            <div className='md:hidden mt-5'>
                <TabsButton tabs={["overview", "milestones", "invoices"]} activeTab={mobileView} onTabChange={setMobileView} />
                {mobileView === "overview" && <ProjectBanner project={project} onEdit={() => setIsFormOpen(true)} />}
                {mobileView === "milestones" && <Milestones milestones={project.milestones ?? []} projectId={project.id} />}
                {mobileView === "invoices" && <Invoices projectId={project.id} />}
            </div>

        </>
    )
}

export default ProjectDetails