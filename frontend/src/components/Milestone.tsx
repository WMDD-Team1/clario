import { useDeleteDeliverable, useUpdateMilestone } from '@/hooks/index';
import { DeliverableApiResponse, MilestoneApiResponse } from '@api/index';
import { CircleCheck, EyeIcon } from 'lucide-react';
import { useState } from 'react';
import ActionMenu from './ActionMenu';
import DeliverableCard from './DeliverableCard';

interface Props {
    milestone?: MilestoneApiResponse
    projectId: string;
    onClickAdd: () => void;
    onEditMilestone: (milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
    onEditDeliverable: (deliverable: DeliverableApiResponse, milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
}

const Milestone = ({ milestone, projectId, onClickAdd, onEditMilestone, onEditDeliverable }: Props) => {
    const [showInvoiceToast, setShowInvoiceToast] = useState(false);
    const { mutate: deleteDeliverableMutation } = useDeleteDeliverable(projectId, milestone?.id);
    const { mutate: updateMilestoneMutation } = useUpdateMilestone(projectId, milestone?.id, {
        onSuccess: (response) => {
            if (response && response.milestone?.isCompleted) {
                setShowInvoiceToast(true);
                setTimeout(() => setShowInvoiceToast(false), 2000);
            }
        },
    });

    const actions = milestone ? [
        { id: 'view', label: 'View', action: () => onEditMilestone(milestone!, "view") },
    ] : []

    if (milestone && !milestone?.isCompleted) {
        actions.push({ id: 'setCompleted', label: 'Mark Complete', action: () => updateMilestoneMutation({ isCompleted: true }) })
        actions.push({ id: 'edit', label: 'Edit', action: () => onEditMilestone(milestone!, "edit") })
        actions.push({ id: 'archive', label: 'Delete', action: () => updateMilestoneMutation({ isArchived: true }) })
    }

    return (
        <div className="md:w-[400px] bg-[var(--general-alpha)] rounded-2xl shadow-sm border border-[var(--primitive-colors-gray-light-mode-200)] overflow-hidden">
            {/* Header */}
            <div className={`flex justify-between items-center
            ${milestone?.isCompleted ? 'bg-[var(--primitive-colors-success-100)]' : 'bg-[var(--primitive-colors-brand-primary-50)]'}
            px-4 py-2 h-16`}>
                <span className={`
                    ${milestone?.isCompleted ? 'text-[var(--primitive-colors-success-600)]' : 'text-[var(--brand-subtext)]'}
                    font-[500]`}>{milestone?.name}</span>
                <div className='flex gap-5 items-center'>
                    {milestone?.isCompleted ? <CircleCheck className="w-5 h-5 text-[var(--primitive-colors-success-600)]" /> : null}
                    <ActionMenu
                        direction="horizontal"
                        actions={actions}
                    />
                </div>
            </div>

            {/* Content */}
            <div className='relative flex flex-col items-center my-5 gap-5'>
                {(!milestone || !milestone.isCompleted) && <div className="px-6 flex justify-center items-center w-full">
                    <button className="rounded-xl border-2  py-4 w-full self-stretch
                    border-dashed border-[var(--primitive-colors-gray-light-mode-400)]
                    text-[var(--primitive-colors-brand-primary-500-base)] font-medium
                    text-lg hover:bg-[var(--primitive-colors-brand-primary-025)]
                    transition flex justify-center" onClick={onClickAdd}>
                        {milestone ? "Add Deliverable" : "Add Your Milestone"}
                    </button>
                </div>}
                <div className="px-6 flex flex-col justify-center items-center w-full gap-5">
                    {milestone?.deliverables.map(deliverable => (
                        <DeliverableCard key={deliverable.id} deliverable={deliverable} onEdit={onEditDeliverable} milestone={milestone} onDelete={(id) => deleteDeliverableMutation(id)} />
                    ))}
                </div>
                {showInvoiceToast ? <div className='flex justify-between absolute bottom-[-20px] right-0 left-0 bg-[var(--primitive-colors-success-600)] text-white px-5 py-[15px]'
                >
                    <span className='text-[18px]'>Invoice Generated</span>
                    <EyeIcon className="w-5 h-5" />
                </div> : null}

            </div>
        </div>
    );
}

export default Milestone