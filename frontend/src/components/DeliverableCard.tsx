import { Paperclip } from 'lucide-react';
import ActionMenu from './ActionMenu';
import { deleteDeliverable, DeliverableApiResponse, MilestoneApiResponse } from '@api/index';

interface Props {
    deliverable: DeliverableApiResponse;
    milestone: MilestoneApiResponse;
    onEdit: (deliverable: DeliverableApiResponse, milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
    onDelete: (deliverableId: string) => void;
}

export default function DeliverableCard({ deliverable, milestone, onEdit, onDelete }: Props) {
    const actions = [
        { id: 'delete', label: 'Delete', action: () => onDelete(deliverable.id) },
        { id: 'edit', label: 'Edit', action: () => onEdit(deliverable, milestone, "edit") },
        { id: 'view', label: 'View', action: () => onEdit(deliverable, milestone, "view") },
    ]
    return (
        <div
            className="bg-[var(--primitive-colors-brand-primary-50)] rounded-xl p-4 transition w-full"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-[var(--page-title)] text-sm leading-tight">
                    {deliverable?.name || "Deliverables Name"}
                </h4>

                <div className="flex items-center gap-2">
                    <div className="flex items-center text-[var(--primitive-colors-gray-light-mode-700)] text-xs">
                        <Paperclip size={14} className="mr-1" />
                        {deliverable?.fileUrls?.length ?? 0}
                    </div>

                    <ActionMenu actions={actions} direction='vertical' />
                </div>
            </div>

            {/* Description */}
            <p className="text-[var(--secondary-text)] text-xs leading-snug">
                {deliverable?.description || "Deliverables Description"}
            </p>
        </div>
    );
}
