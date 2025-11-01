import { MilestoneApiResponse } from '@api/index'
import { MoreHorizontal, Plus } from 'lucide-react';
import ActionMenu from './ActionMenu';

interface Props {
    milestone?: MilestoneApiResponse
    onClickAdd: () => void;
    onEditMilestone: (milestone: MilestoneApiResponse, mode: "edit" | "view") => void;
}

const Milestone = ({ milestone, onClickAdd, onEditMilestone}: Props) => {
    return (
        <div className="w-[400px] bg-[var(--general-alpha)] rounded-2xl shadow-sm border border-[var(--primitive-colors-gray-light-mode-200)] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center bg-[var(--primitive-colors-brand-primary-50)] px-4 py-2 h-16">
                <span>{milestone?.name}</span>
                <ActionMenu
                    direction="horizontal"
                    actions={milestone ? [
                        { id: 'archive', label: 'Archive', action: () => console.log('Archive clicked') },
                        { id: 'edit', label: 'Edit', action: () => onEditMilestone(milestone!, "edit") },
                        { id: 'view', label: 'View', action: () => onEditMilestone(milestone!, "view") },
                    ] : []}
                />
            </div>

            {/* Content */}
            <div className="p-6 flex justify-center items-center">
                <button className="rounded-xl border-2  py-4 w-full
                border-dashed border-[var(--primitive-colors-gray-light-mode-400)]
                text-[var(--primitive-colors-brand-primary-500-base)] font-medium
                text-lg hover:bg-[var(--primitive-colors-brand-primary-025)]
                transition flex justify-center" onClick={onClickAdd}>
                    {milestone ? <Plus className='text-[var(--primitive-colors-gray-light-mode-500)]' /> : "Add Your Milestone"}
                </button>
            </div>
        </div>
    );
}

export default Milestone