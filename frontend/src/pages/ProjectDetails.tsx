import { fetchProjectById } from '@api/index';
import ProjectDrawer from '@components/forms/ProjectDrawer';
import Loader from '@components/Loader';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Edit } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [isFormOpen, setIsFormOpen] = useState(false)
    const navigate = useNavigate()
    const { data: project, isLoading, error } = useQuery({
        queryKey: ["project", id],
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


    return (
        <>
            <div className='flex justify-start items-center gap-2'>
                <ChevronLeft size={30} onClick={(e) => navigate(-1)} className='cursor-pointer' />
                <h2>{project.name}</h2>
            </div>
            <div>
                <Edit onClick={() => setIsFormOpen(true)} />
            </div>
            <ProjectDrawer isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="edit" project={project} />

        </>
    )
}

export default ProjectDetails