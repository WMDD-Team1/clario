import { MilestoneApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import MilestoneForm from "./MilestoneForm";
import MilestoneDetails from "./MilestoneDetails";
import { useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (milestone: MilestoneApiResponse) => void;
    mode: "create" | "edit" | "view";
    milestone?: MilestoneApiResponse | null;
    projectId: string;
}

const MilestoneDrawer = ({ isOpen, onClose, onEdit, mode, milestone, projectId }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!divRef.current?.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    let title = "Add Milestone";
    if (mode === "view") title = "Milestone";
    if (mode === "edit") title = "Edit Milestone";

    return (
        <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
            {mode === "create" && <MilestoneForm projectId={projectId} onCancel={onClose} />}
            {mode === "edit" && <MilestoneForm projectId={projectId} onCancel={onClose} milestone={milestone} />}
            {mode === "view" && (
                <MilestoneDetails
                    milestone={milestone!}
                    onEdit={() => onEdit?.(milestone!)}
                    onCancel={onClose}
                />
            )}
        </FormDrawer>
    );
};

export default MilestoneDrawer;
