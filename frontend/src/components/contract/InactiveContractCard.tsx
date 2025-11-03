import { generateContractDraft, ProjectApiResponse } from "@api/index";
import { useLoader } from "@components/LoaderProvider";
import { Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";

interface Props {
    project: ProjectApiResponse;
}

const InactiveContractCard = ({ project }: Props) => {
    const { setIsLoading } = useLoader();
    const queryClient = useQueryClient();

    const handleDownload = async (projectId: string) => {
        try {
            setIsLoading(true);
            const fileURL = await generateContractDraft(projectId);
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] })
            if (fileURL.length === 0) {
                console.error("No file returned");
                return;
            }
            const link = document.createElement("a");
            link.target = "_blank"
            link.href = fileURL;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsLoading(false);
        } catch (err) {
            console.error("No file returned");
        }

    }

    return (
        <div className="rounded-[20px] overflow-hidden ">
            {/* Top Section */}
            <div className="bg-[#73A9F2] pt-[44px] pb-[15px] px-5 text-[var(--text-alpha)]">
                <h3 className="font-semibold mb-1">Start Your Contract</h3>
                <p className="text-sm opacity-90 leading-snug">
                    This project is currently inactive. Generate or upload a contract to activate it.
                </p>
            </div>

            {/* Bottom Buttons */}
            <div className="flex">

                <button disabled={!project.milestones?.length} onClick={() => handleDownload(project.id)}
                    className={`flex-1 bg-[var(--primitive-colors-brand-primary-500-base)] 
                    hover:bg-[#0046CC] text-[var(--text-alpha)] py-5 text-sm font-medium transition 
                    flex items-center justify-center gap-2 ${!project.milestones?.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    Generate Draft
                    {!project.milestones?.length ?
                        <Tooltip title="Add yous milestones no generate a draft" arrow placement="top">
                            <Info
                                size={20}
                            />
                        </Tooltip> : null
                    }
                </button>
                <div className="w-[1px] bg-white/20" />
                <button className="cursor-pointer flex-1 bg-[var(--primitive-colors-brand-primary-500-base)] hover:bg-[#0046CC] text-[var(--text-alpha)] py-5 text-sm font-medium transition">
                    Upload
                </button>
            </div>
        </div>
    );
};

export default InactiveContractCard;
