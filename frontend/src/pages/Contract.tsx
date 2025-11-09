import { fetchProjectById, updateProject } from '@api/index';
import Button from '@components/Button';
import { ContractViewer } from '@components/contract/ContractViewer';
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


    const contractFolder = project.contract?.contractUrl.includes("draft") ? "draft" : "uploaded";

    const contract = project.contract;
    const contractUrl = contract?.contractUrl.split("&")[0];

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
    if (!contract) {
        return <div className="flex items-center justify-center h-[calc(100vh-220px)] text-gray-500">
            No contract PDF available
        </div>;
    }
    
    return (
        <>
            {/* Header */}
            <div className='flex justify-start items-center gap-2 mb-7'>
                <ChevronLeft size={30} onClick={(e) => navigate(-1)} className='cursor-pointer' />
                <h2>{contractUrl === "draft" ? "Contract Draft" : "Contract Review"}</h2>
            </div>

            {/* PDF Viewer */}
            {contractFolder === "uploaded" ?
                (
                    <div className='relative 100vh'>
                        <ContractViewer pdfUrl={contractUrl!} riskyClauses={contract.aiAnalysis?.riskyClauses ?? []} />
                    </div>
                ) :
                (
                    <>
                        <div className="relative bg-white rounded-xl shadow-sm border 100vh">
                            <iframe
                                src={contract.contractUrl}
                                className="w-full h-[calc(100vh-240px)] rounded-xl"
                                title="Contract PDF"
                            />
                        </div>
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
                )}

        </>
    )
}

export default Contract