import { MilestoneApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import MilestoneForm from "./MilestoneForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    milestone?: MilestoneApiResponse | null;
    projectId: string;
}

const MilestoneDrawer = ({ isOpen, onClose, mode, milestone, projectId }: Props) => {
    let title = "Add Milestone";
    if (mode === "edit") title = "Edit Milestone";

    return (
        <FormDrawer title={title} isOpen={isOpen} onClose={onClose}>
            <MilestoneForm onCancel={onClose} milestone={milestone} projectId={projectId}/>
        </FormDrawer>
    );
};

export default MilestoneDrawer;
