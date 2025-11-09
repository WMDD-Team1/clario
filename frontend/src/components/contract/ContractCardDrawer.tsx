import { generateContractDraft, postAnalyzeContract, ProjectApiResponse } from "@api/index";
import { useLoader } from "@components/LoaderProvider";
import { Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContractCard from "./ContractCard";

interface Props {
    project: ProjectApiResponse;
}
const ContractCardDrawer = ({ project }: Props) => {
    const { setIsLoading } = useLoader();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const contractFolder = useMemo(() => {
        return project.contract?.contractUrl.includes("draft") ? "draft" : "uploaded";
    }, [project.contract]);

    const noMilestonesTooltip = useMemo(
        () => (
            <Tooltip
                title="Add your milestones to generate a draft"
                arrow
                placement="top"
                slotProps={{
                    tooltip: {
                        sx: {
                            backgroundColor: "var(--primitive-colors-brand-primary-925)",
                            fontSize: "14px",
                            color: "white",
                        },
                    },
                }}
            >
                <Info size={20} />
            </Tooltip>
        ),
        []
    );

    /**
     * Wraps async contract actions with loader state.
     */
    const handleContractAction = useCallback(
        async (callbackAction: () => Promise<void> | void) => {
            try {
                setIsLoading(true);
                await callbackAction();
            } catch (error) {
                console.error("Error executing contract action:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading]
    );

    /**
     * Handles file download via dynamic anchor.
     */
    const handleDownloadFile = useCallback((fileURL?: string) => {
        if (!fileURL) fileURL = project!.contract?.contractUrl;
        if (!fileURL) return;
        const link = document.createElement("a");
        link.href = fileURL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    /**
     * Generates and downloads contract draft.
     */
    const handleGenerateContract = useCallback(
        async () => {
            try {
                const fileURL = await generateContractDraft(project!.id);
                if (!fileURL) {
                    console.error("No file returned from generateContractDraft");
                    return;
                }
                navigate(`/projects/${project!.id}/contract`);
            } catch (err) {
                console.error("Error generating contract draft:", err);
            }
        },
        [handleDownloadFile, queryClient]
    );

    /**
     * Receives and upload user contract.
     */
    const handleUpload = useCallback(
        async () => {
            try {
                const projectId = project!.id;
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "application/pdf";

                input.onchange = async (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const file = target.files?.[0];

                    if (!file) return;
                    if (file.type !== "application/pdf") {
                        alert("Please upload a valid PDF file.");
                        return;
                    }

                    await handleContractAction(async () => {
                        await postAnalyzeContract(projectId, file);
                        await queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
                    });
                };

                input.click();
            } catch (error) {
                console.error("Error uploading contract:", error);
            }
        },
        [handleContractAction, queryClient]
    );

    return (
        <>
            {!project.isActive ?
                <ContractCard
                    status="inactive"
                    tooltip={!project.milestones?.length && noMilestonesTooltip}
                    onGenerateDraft={() => handleContractAction(handleGenerateContract)}
                    onUpload={() => handleContractAction(handleUpload)}
                />
                : contractFolder === "draft" ?
                    <ContractCard
                        status="active"
                        onDownload={() => handleContractAction(handleDownloadFile)}
                        onView={() => navigate(`/projects/${project.id}/contract`)}
                        onUpload={() => handleContractAction(handleUpload)}
                    />
                    : project.contract?.aiAnalysis?.riskyClauses.length ?
                        <ContractCard
                            status="risks"
                            risksDetected={project.contract.aiAnalysis.riskyClauses.length}
                            onDownload={() => handleContractAction(handleDownloadFile)}
                            onView={() => navigate(`/projects/${project.id}/contract`)}
                            onUpload={() => handleContractAction(handleUpload)}
                        />
                        :
                        <ContractCard
                            status="clear"
                            onDownload={() => handleContractAction(handleDownloadFile)}
                            onView={() => navigate(`/projects/${project.id}/contract`)}
                            onUpload={() => handleContractAction(handleUpload)}
                        />
            }

        </>
    )
}

export default ContractCardDrawer