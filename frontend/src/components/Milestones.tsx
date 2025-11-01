import { MilestoneApiResponse } from '@api/index'
import Milestone from './Milestone'
import { useMemo, useState } from 'react'
import MilestoneDrawer from './forms/Milestone/MilestoneDrawer'

interface Props {
    milestones: MilestoneApiResponse[];
    projectId: string
}

const Milestones = ({ milestones, projectId }: Props) => {
    const [isDeliveryFormOpen, setIsDeliveryFormOpen] = useState(false);

    // Milestone Form Drawer
    const [isMilestoneDrawerOpen, setIsMilestoneDrawerOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState<MilestoneApiResponse | null>(null);
    const [milestoneDrawerMode, setMilestoneDrawerMode] = useState<"create" | "view" | "edit">("create");

    const handleAddMilestone = () => {
        setSelectedMilestone(null);
        setMilestoneDrawerMode("create");
        setIsMilestoneDrawerOpen(true);
    }

    const handleExistentMilestone = (milestone: MilestoneApiResponse, mode: "edit" | "view") => {
        setSelectedMilestone(milestone);
        setMilestoneDrawerMode(mode);
        setIsMilestoneDrawerOpen(true);
    }

    const handleEditMilestone = () => {
        setMilestoneDrawerMode("edit");
    } 

    return (
        <>
            <MilestoneDrawer
                isOpen={isMilestoneDrawerOpen}
                onClose={() => setIsMilestoneDrawerOpen(false)}
                mode={milestoneDrawerMode} projectId={projectId}
                milestone={selectedMilestone}
                onEdit={handleEditMilestone}
            />

            <div className='flex gap-10 flex-nowrap'>
                {milestones.map(milestone => (
                    <div key={milestone.id}>
                        <Milestone milestone={milestone} onClickAdd={() => console.log("Add Deliverable")} onEditMilestone={handleExistentMilestone} />
                    </div>
                ))}
                {/* Empty milestone to add more */}
                <div>
                    <Milestone onClickAdd={handleAddMilestone} onEditMilestone={handleExistentMilestone} />
                </div>
            </div>
        </>
    )
}

export default Milestones