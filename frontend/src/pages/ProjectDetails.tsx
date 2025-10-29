import { fetchProjectById } from '@api/index';
import Spinner from '@components/Spinner';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery({
        queryKey: ["project", id],
        queryFn: () => fetchProjectById(id!),
        enabled: !!id,
    });

    if (isLoading) return <Spinner message='Loading Project' />
    if (error) return <p>Error getting your project</p>
    if (!data) return <p>No project was found</p>

    return (
        <div>ProjectDetails</div>
    )
}

export default ProjectDetails