import { DeliverableApiResponse, MilestoneApiResponse } from '@api/index';
import { Plus } from 'lucide-react';
import ActionMenu from './ActionMenu';
import DeliverableCard from './DeliverableCard';
import { useState } from 'react';
import { useDeleteDeliverable } from '@/hooks/index';

interface Props {
    milestone?: MilestoneApiResponse
    projectId: string;
    onClickAdd: () => void;
    onEditMilestone: (milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
    onEditDeliverable: (deliverable: DeliverableApiResponse, milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
}

const Milestone = ({ milestone, projectId, onClickAdd, onEditMilestone, onEditDeliverable }: Props) => {
    const { mutate: deleteDeliverableMutation } = useDeleteDeliverable(projectId, milestone?.id);
    
    return (
        <div className="w-[400px] bg-[var(--general-alpha)] rounded-2xl shadow-sm border border-[var(--primitive-colors-gray-light-mode-200)] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center bg-[var(--primitive-colors-brand-primary-50)] px-4 py-2 h-16">
                <span className='text-[var(--brand-subtext)] font-[500]'>{milestone?.name}</span>
                <ActionMenu
                    direction="horizontal"
                    actions={milestone ? [
                        { id: 'delete', label: 'Archive', action: () => console.log('Archive clicked') },
                        { id: 'edit', label: 'Edit', action: () => onEditMilestone(milestone!, "edit") },
                        { id: 'view', label: 'View', action: () => onEditMilestone(milestone!, "view") },
                    ] : []}
                />
            </div>

            {/* Content */}
            <div className='flex flex-col items-center my-5 gap-5'>
                <div className="px-6 flex justify-center items-center w-full">
                    <button className="rounded-xl border-2  py-4 w-full self-stretch
                    border-dashed border-[var(--primitive-colors-gray-light-mode-400)]
                    text-[var(--primitive-colors-brand-primary-500-base)] font-medium
                    text-lg hover:bg-[var(--primitive-colors-brand-primary-025)]
                    transition flex justify-center" onClick={onClickAdd}>
                        {milestone ? <Plus className='text-[var(--primitive-colors-gray-light-mode-500)]' /> : "Add Your Milestone"}
                    </button>
                </div>
                <div className="px-6 flex flex-col justify-center items-center w-full gap-5">
                    {milestone?.deliverables.map(deliverable => (
                        <DeliverableCard deliverable={deliverable} onEdit={onEditDeliverable} milestone={milestone} onDelete={(id) => deleteDeliverableMutation(id)} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Milestone