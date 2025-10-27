import FormDrawer from "./FormDrawer";
import ProjectForm from "./ProjectForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProjectDrawer = ({ isOpen, onClose }: Props) => {
    return (
        <FormDrawer title="Create Project" isOpen={isOpen} onClose={onClose}>
            <ProjectForm onCancel={onClose} />
        </FormDrawer>
    );
};

export default CreateProjectDrawer;
