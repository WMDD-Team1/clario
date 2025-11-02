import { DeliverableApiResponse, MilestoneApiResponse } from '@api/index';
import { useState } from 'react';
import DeliverableDrawer from './forms/Deliverable/DeliverableDrawer';
import MilestoneDrawer from './forms/Milestone/MilestoneDrawer';
import Milestone from './Milestone';

interface Props {
    milestones: MilestoneApiResponse[];
    projectId: string
}

const Milestones = ({ milestones, projectId }: Props) => {
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

    // Deliverable Form Drawer
    const [isDeliverableDrawerOpen, setIsDeliverableDrawerOpen] = useState(false);
    const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableApiResponse | null>(null);
    const [deliverableDrawerMode, setDeliverableDrawerMode] = useState<"create" | "view" | "edit">("create");

    const handleAddDeliverable = (milestone: MilestoneApiResponse) => {
        setSelectedMilestone(milestone);
        setSelectedDeliverable(null);
        setDeliverableDrawerMode("create");
        setIsDeliverableDrawerOpen(true);
    }

    const handleExistentDeliverable = (deliverable: DeliverableApiResponse, milestone: MilestoneApiResponse, mode: "edit" | "view") => {
        setSelectedDeliverable(deliverable);
        setSelectedMilestone(milestone);
        setDeliverableDrawerMode(mode);
        setIsDeliverableDrawerOpen(true);
    }

    const handleEditDeliverable = () => {
        setDeliverableDrawerMode("edit");
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

            <DeliverableDrawer
                isOpen={isDeliverableDrawerOpen}
                onClose={() => setIsDeliverableDrawerOpen(false)}
                mode={deliverableDrawerMode}
                projectId={projectId} milestoneId={selectedMilestone?.id}
                deliverable={selectedDeliverable}
                onEdit={handleEditDeliverable}
            />

            <div className='flex gap-10 flex-nowrap'>
                {milestones.map(milestone => ( !milestone.isArchived &&
                    <div key={milestone.id}>
                        <Milestone
                            milestone={milestone}
                            projectId={projectId}
                            onClickAdd={() => handleAddDeliverable(milestone)}
                            onEditMilestone={handleExistentMilestone}
                            onEditDeliverable={handleExistentDeliverable} />
                    </div>
                ))}
                {/* Empty milestone to add more */}
                <div>
                    <Milestone
                        onClickAdd={handleAddMilestone}
                        projectId={projectId}
                        onEditMilestone={handleExistentMilestone}
                        onEditDeliverable={handleExistentDeliverable} />
                </div>
            </div>
        </>
    )
}

export default Milestones