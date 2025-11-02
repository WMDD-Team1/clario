import { MilestoneApiResponse } from "@/api";
import FormFooter from "../FormFooter";

interface Props {
    milestone: MilestoneApiResponse;
    projectId: string
    onEdit: () => void;
    onCancel: () => void;
}

export default function Details({ milestone, projectId, onEdit, onCancel }: Props) {
    return (
        <div className="flex flex-col gap-4">

            <div className="pt-2 text-sm space-y-5">
                <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <span>Milestone Name</span>
                    <span className="font-medium text-[var(--page-title)]">
                        {milestone.name}
                    </span>
                </div>

                <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <span>Due Date</span>
                    <span className="font-medium text-[var(--page-title)]">
                        {milestone.dueDate
                            ? new Date(milestone.dueDate).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })
                            : "-"}
                    </span>
                </div>

                <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <span>Amount</span>
                    <span className="font-medium text-[var(--page-title)]">
                        {milestone.amount
                            ? `$ ${milestone.amount.toLocaleString()}`
                            : "-"}
                    </span>
                </div>

                <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <span>Generate Invoice</span>
                    <span className="font-medium text-[var(--page-title)]">
                        {milestone?.generateInvoice === "on_completion" ? "On Completion" : "On Due Date"}
                    </span>
                </div>

                {/* Description */}
                <div className="pt-2">
                    <p className="text-[var(--tertiary-text)] mb-1">Description</p>
                    <p className="text-[var(--secondary-text)] leading-relaxed">
                        {milestone?.description || "No description provided."}
                    </p>
                </div>
            </div>


            <FormFooter
                onCancel={onCancel}
                onSubmit={onEdit}
                submitLabel="Edit"
            />
        </div>
    );
}
