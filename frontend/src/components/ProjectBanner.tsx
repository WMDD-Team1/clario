import { ProjectApiResponse } from "@api/index"
import { Pencil } from "lucide-react";

interface Props {
    project: ProjectApiResponse;
    onEdit: () => void;
}

const ProjectBanner = ({ project, onEdit }: Props) => {
    const clientName = typeof project.clientId === "object" && project.clientId !== null ? project.clientId.name : (typeof project.clientId === "string" ? "" : "")
    return (
        <div className="bg-white p-5 rounded-2xl h-full w-full md:max-w-[340px]">
            <div>
                <div className="flex items-center justify-between pb-[18px]">
                    <h3 className="font-semibold text-[18px]">Project Details</h3>
                    <button
                        onClick={onEdit}
                        className="p-1 rounded-full hover:bg-[var(--primitive-colors-gray-light-mode-100)] transition-colors"
                        aria-label="Edit Project"
                    >
                        <Pencil
                            size={18}
                            strokeWidth={1.8}
                        />
                    </button>
                </div>
                <div className="flex flex-col gap-[18px]">
                    <p className="flex justify-between"><span className="font-medium">Client:</span> <span>{clientName}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Date Started:</span> <span>{project.startDate}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Due Date:</span> <span>{project.dueDate}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Stage:</span> <span>{project.status}</span></p>
                    <p className="mt-2 text-gray-600 text-sm"><span>{project.description}</span></p>
                </div>
            </div>

            {/* <div className="bg-[var(--secondary-light)] rounded-xl overflow-hidden">
                <div className="bg-[var(--secondary)] text-white font-semibold px-4 py-2">
                    Payment Terms
                </div>
                <div className="divide-y divide-gray-200 text-sm">
                    <div className="flex justify-between px-4 py-2">
                        <span>Upfront</span><span>${payments.upfront.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span>Design Phase</span><span>${payments.design.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span>Development Phase</span><span>${payments.development.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span>Testing & Launch</span><span>${payments.testing.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold px-4 py-3 text-[var(--primary)]">
                        <span>Total Budget</span><span>${payments.total.toLocaleString()}</span>
                    </div>
                </div>
            </div> */}

            {/* <div className="bg-[var(--primary-light)] p-4 rounded-xl text-sm text-white">
                <h3 className="font-semibold mb-1">Start Your Contract</h3>
                <p className="opacity-90 mb-3">
                    This project is currently inactive. Generate or upload a contract to activate it.
                </p>
                <div className="flex gap-2">
                    <button className="flex-1 bg-white text-[var(--primary)] font-medium rounded-lg py-2 hover:bg-gray-50 transition">
                        Generate Draft
                    </button>
                    <button className="flex-1 bg-[var(--primary-dark)] text-white font-medium rounded-lg py-2 hover:bg-[var(--primary)] transition">
                        Upload
                    </button>
                </div>
            </div> */}
        </div>
    );
}

export default ProjectBanner