import { DeliverableApiResponse } from "@/api";
import { formatDate } from "@utils/formatDate";
import { useMemo } from "react";
import Detail from "../Detail";
import DetailsDrawer from "../DetailsDrawer";
import FormFooter from "../FormFooter";
import { Download } from "lucide-react";

interface Props {
    deliverable: DeliverableApiResponse;
    onEdit: () => void;
    onCancel: () => void;
    disableEdit?: boolean;
}

export default function DeliverableDetails({ deliverable, onEdit, onCancel, disableEdit = false }: Props) {
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
                <div className="pt-2 border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <p className="text-[var(--tertiary-text)] mb-1">Description</p>
                    <p className="text-[var(--secondary-text)] leading-relaxed">
                        {deliverable?.description || "No description provided."}
                    </p>
                </div>
                {/* Files */}
                <div className="pt-2">
                    <p className="text-[var(--tertiary-text)] mb-3">Files</p>
                    {deliverable.files.map((file, i) => (
                        <a key={i} href={file.fileUrl} target="_blank" className="flex justify-between pb-1">
                          <p>{file.fileType}</p>
                          <Download />
                        </a>
                    ))}
                </div>
            </DetailsDrawer>
            <FormFooter
                onCancel={onCancel}
                onSubmit={onEdit}
                submitLabel="Edit"
                disableSubmit={disableEdit}
            />
        </>
    );
}
