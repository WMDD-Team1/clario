import { ProjectApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import ProjectForm from "./ProjectForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    project?: ProjectApiResponse | null;
}

const ProjectDrawer = ({ isOpen, onClose, mode, project }: Props) => {
    let title = "Create Project";
    if (mode === "edit") title = "Edit Project";
    
    return (
        <FormDrawer title={title} isOpen={isOpen} onClose={onClose}>
            <ProjectForm onCancel={onClose} project={project} />
        </FormDrawer>
    );
};

export default ProjectDrawer;
