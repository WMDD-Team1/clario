import { DeliverableApiResponse } from "@/api";
import { formatDate } from "@utils/formatDate";
import { useMemo } from "react";
import Detail from "../Detail";
import DetailsDrawer from "../DetailsDrawer";
import FormFooter from "../FormFooter";

interface Props {
    deliverable: DeliverableApiResponse;
    onEdit: () => void;
    onCancel: () => void;
}

export default function DeliverableDetails({ deliverable, onEdit, onCancel }: Props) {
    const deliverableDetails = useMemo(
        () => [
            {
                key: "name",
                label: "Deliverable Name",
                value: deliverable.name,
            },
            {
                key: "dueDate",
                label: "Due Date",
                value: formatDate(deliverable.dueDate, { stringMonth: true }),
            },
        ], [deliverable]
    )
    return (
        <>

            <DetailsDrawer>
                {deliverableDetails.map(detail => (
                    <Detail key={detail.key} detail={detail} />
                ))}
                {/* Description */}
                <div className="pt-2">
                    <p className="text-[var(--tertiary-text)] mb-1">Description</p>
                    <p className="text-[var(--secondary-text)] leading-relaxed">
                        {deliverable?.description || "No description provided."}
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
