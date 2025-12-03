import { ProjectApiResponse } from "@api/index";
import { formatCurrency } from "@utils/formatCurrency";
import { Pencil } from "lucide-react";
import ContractCardDrawer from "./contract/ContractCardDrawer";
import { formatDate } from "@utils/formatDate";

interface Props {
    project: ProjectApiResponse;
    onEdit: () => void;
}

const ProjectBanner = ({ project, onEdit }: Props) => {
    const clientName = typeof project.clientId === "object" && project.clientId !== null ? project.clientId.name : (typeof project.clientId === "string" ? "" : "")
    return (
        <div className="bg-[var(--general-alpha)] p-5 rounded-2xl h-full w-full md:max-w-[340px] flex flex-col gap-5">
            <div>
                <div className="flex items-center justify-between pb-[18px]">
                    <h3 className="font-semibold text-[18px] text-[var(--tertiary-text)]">Project Details</h3>
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
                    <p className="flex justify-between"><span className="font-medium">Date Started:</span> <span>{
                        formatDate(project.startDate,{stringMonth:true})
                    }</span></p>
                    <p className="flex justify-between"><span className="font-medium">Due Date:</span> <span>{
                        formatDate(project.dueDate,{stringMonth:true})
                    }</span></p>
                    <div>
                        <p className="font-medium">Description</p>
                        <p className="mt-2 text-gray-600 text-sm"><span>{project.description}</span></p>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--background)] rounded-[20px] p-5 border-1 border-[var(--background-alternate)]">
                <h3 className="text-[var(--primitive-colors-gray-light-mode-800)] font-semibold text-base mb-3">
                    Payment Terms
                </h3>

                <div className="space-y-[13px] text-sm text-[var(--sub-text)]">
                    <div className="flex justify-between border-b-1 border-[var(--background-alternate)] pb-[7px]">
                        <span>Upfront </span>
                        <span className="text-[var(--secondary-text)]">${formatCurrency(project.upfrontAmount ?? 0)}</span>
                    </div>
                    {project.milestones?.map(milestone => (
                        <div key={milestone.id} className="flex justify-between border-b-1 border-[var(--background-alternate)] pb-[7px]">
                            <span>{milestone.name}</span>
                            <span className="text-[var(--secondary-text)]">${formatCurrency(milestone.amount)}</span>
                        </div>
                    ))}

                    <div className="flex justify-between font-semibold text-[var(--primitive-colors-gray-light-mode-900)]">
                        <span>Total Amount</span>
                        <span>${formatCurrency(project.totalAmount)}</span>
                    </div>
                </div>
            </div>

            <ContractCardDrawer project={project} />
        </div>
    );
}

export default ProjectBanner