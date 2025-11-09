import { fetchProjectById, updateProject } from '@api/index';
import Button from '@components/Button';
import Loader from '@components/Loader';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Contract = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [toastSetup, setToastSetup] = useState<{ success: boolean, message: string }>();
    const navigate = useNavigate();
    const { data: project, isLoading, error } = useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => fetchProjectById(projectId!),
        enabled: !!projectId,
    });

    if (isLoading) return (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader />
        </div>
    )
    if (error) return <p>Error getting your project</p>
    if (!project) return <p>No project was found</p>

    const contract = project.contract;

    const handleConfirmDraft = async () => {
        try {
            await updateProject(project.id, { isActive: true });
            navigate(-1);
        } catch (error) {
            setToastSetup({
                success: false,
                message: "Error saving your contract",
            })
            console.error("Error confirming draft:", error);
        }
    }

    return (
        <>
            {/* Header */}
            <div className='flex justify-start items-center gap-2 mb-7'>
                <ChevronLeft size={30} onClick={(e) => navigate(-1)} className='cursor-pointer' />
                <h2>Contract Draft</h2>
            </div>
            {/* PDF Viewer */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border overflow-hidden">
                {contract?.contractUrl ? (
                    <iframe
                        src={contract.contractUrl}
                        className="w-full h-[calc(100vh-220px)] rounded-xl"
                        title="Contract PDF"
                    />
                ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-220px)] text-gray-500">
                        No contract PDF available
                    </div>
                )}
            </div>

            {/* Footer buttons (optional) */}
            <div className="flex justify-center gap-5 mt-6 max-w-[500px] mx-auto">
                <Button buttonColor="regularButton"
                    onClick={() => navigate(-1)} width='45%'
                    textColor="white"
                    type="submit">
                    Cancel
                </Button>
                <Button buttonColor="regularButton"
                    onClick={() => handleConfirmDraft()} width='45%'
                    textColor="white"
                    type="submit">
                    Confirm
                </Button>
            </div>
        </>
    )
}

export default Contract