import { MilestoneApiResponse } from '@api/index'
import Milestone from './Milestone'
import { useState } from 'react'
import MilestoneDrawer from './forms/Milestone/MilestoneDrawer'

interface Props {
    milestones: MilestoneApiResponse[];
    projectId: string
}

const Milestones = ({ milestones, projectId }: Props) => {
    const [isMilestoneFormOpen, setIsMilestoneFormOpen] = useState(false);
    const [isDeliveryFormOpen, setIsDeliveryFormOpen] = useState(false);

    return (
        <>
            <MilestoneDrawer isOpen={isMilestoneFormOpen} onClose={() => setIsMilestoneFormOpen(false)} mode="create" projectId={projectId} />
            <div className='flex gap-10 flex-nowrap'>
                {milestones.map(milestone => (
                    <div key={milestone.id}>
                        <Milestone onClick={() => setIsDeliveryFormOpen(true)} milestone={milestone} />
                    </div>
                ))}
                {/* Empty milestone to add more */}
                <div>
                    <Milestone onClick={() => setIsMilestoneFormOpen(true)} />
                </div>
            </div>
        </>
    )
}

export default Milestones