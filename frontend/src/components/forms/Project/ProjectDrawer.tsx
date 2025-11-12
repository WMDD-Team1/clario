import { ProjectApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import ProjectForm from "./ProjectForm";
import { useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    project?: ProjectApiResponse | null;
    onOpenClientSlide?:() => void;
}

const ProjectDrawer = ({ isOpen, onClose, mode, project, onOpenClientSlide }: Props) => {
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

    let title = "Create Project";
    if (mode === "edit") title = "Edit Project";

    return (
        <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
            <ProjectForm onCancel={onClose} project={project} onOpenClientSlide={onOpenClientSlide}/>
        </FormDrawer>
    );
};

export default ProjectDrawer;
