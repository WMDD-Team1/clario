import { generateContractDraft, ProjectApiResponse } from "@api/index";
import { useLoader } from "@components/LoaderProvider";

interface Props {
    project: ProjectApiResponse;
}

const ActiveContractCard = ({ project }: Props) => {
    const { setIsLoading } = useLoader();

    const handleDownload = async (projectId: string) => {
        try {
            setIsLoading(true);
            const fileURL = await generateContractDraft(projectId);
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
        <div className="rounded-[20px] overflow-hidden border-2 border-[var(--primitive-colors-brand-primary-51)]">
            {/* Top Section */}
            <div className="bg-[var(--general-alpha)] pt-[44px] pb-[15px] px-5">
                <h3 className="font-semibold mb-1 text-[var(--primitive-colors-brand-primary-700)]">Project Active</h3>
                <p className="text-sm opacity-90 leading-snug">
                    Your contract is ready. Download and review it anytime.
                </p>
            </div>

            {/* Bottom Buttons */}
            <div className="flex">

                <button disabled={!project.milestones?.length} onClick={() => handleDownload(project.id)}
                    className={`flex-1 bg-[var(--primitive-colors-brand-primary-500-base)] 
                    hover:bg-[#0046CC] text-[var(--text-alpha)] py-5 text-sm font-medium transition 
                    flex items-center justify-center gap-2 ${!project.milestones?.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    Download
                </button>
                <div className="w-[1px] bg-white/20" />
                <button className="cursor-pointer flex-1 bg-[var(--primitive-colors-brand-primary-500-base)] hover:bg-[#0046CC] text-[var(--text-alpha)] py-5 text-sm font-medium transition">
                    View
                </button>
            </div>
        </div>
    );
};

export default ActiveContractCard;
