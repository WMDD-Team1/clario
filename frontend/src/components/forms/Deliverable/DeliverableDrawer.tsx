import { DeliverableApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import DeliverableDetails from "./DeliverableDetails";
import DeliverableForm from "./DeliverableForm";
import { useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (milestone: DeliverableApiResponse) => void;
    mode: "create" | "edit" | "view";
    deliverable?: DeliverableApiResponse | null;
    milestoneId?: string;
    projectId: string;
}

const DeliverableDrawer = ({ isOpen, onClose, onEdit, mode, deliverable, milestoneId, projectId }: Props) => {
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
            {milestoneId && mode === "create" && <DeliverableForm projectId={projectId} milestoneId={milestoneId} onCancel={onClose} />}
            {milestoneId && mode === "edit" && <DeliverableForm projectId={projectId} milestoneId={milestoneId} onCancel={onClose} deliverable={deliverable} />}
            {milestoneId && mode === "view" && (
                <DeliverableDetails
                    deliverable={deliverable!}
                    onEdit={() => onEdit?.(deliverable!)}
                    onCancel={onClose}
                />
            )}
        </FormDrawer>
    );
};

export default DeliverableDrawer;
