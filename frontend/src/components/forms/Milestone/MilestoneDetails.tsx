import { MilestoneApiResponse } from "@/api";
import FormFooter from "../FormFooter";
import DetailsDrawer from "../DetailsDrawer";
import Detail from "../Detail";
import { formatDate } from "@utils/formatDate";
import { formatCurrency } from "@utils/formatCurrency";
import { useMemo } from "react";

interface Props {
    milestone: MilestoneApiResponse;
    onEdit: () => void;
    onCancel: () => void;
}

export default function Details({ milestone, onEdit, onCancel }: Props) {
    const milestoneDetails = useMemo(
        () => [
            {
                key: "name",
                label: "Milestone Name",
                value: milestone.name,
            },
            {
                key: "dueDate",
                label: "Due Date",
                value: formatDate(milestone.dueDate, { stringMonth: true }),
            },
            {
                key: "amount",
                label: "Amount",
                value: `$ ${formatCurrency(milestone.amount)}`,
            },
            {
                key: "generateInvoice",
                label: "Generate Invoice",
                value: milestone?.generateInvoice === "on_completion" ? "On Completion" : "On Due Date",
            }
        ], [milestone]
    )
    return (
        <>

            <DetailsDrawer>
                {milestoneDetails.map(detail => (
                    <Detail key={detail.key} detail={detail} />
                ))}
                {/* Description */}
                <div className="pt-2">
                    <p className="text-[var(--tertiary-text)] mb-1">Description</p>
                    <p className="text-[var(--secondary-text)] leading-relaxed">
                        {milestone?.description || "No description provided."}
                    </p>
                </div>
            </DetailsDrawer>
            <FormFooter
                onCancel={onCancel}
                onSubmit={onEdit}
                submitLabel="Edit"
            />
        </>
    );
}
