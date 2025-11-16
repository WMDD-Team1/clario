import { ProjectApiResponse } from "@api/index";
import FormDrawer from "../FormDrawer";
import ProjectForm from "./ProjectForm";
import { use, useEffect, useRef, useState } from "react";
import ProjectUploadStep from "./ProjectUploadStep";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    project?: ProjectApiResponse | null;
    onOpenClientSlide?:() => void;
}

const ProjectDrawer = ({ isOpen, onClose, mode, project, onOpenClientSlide }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [prefilledProject, setPrefilledProject] = useState<ProjectApiResponse | null>(project ?? null);
    const [isPrefilled, setIsPrefilled] = useState<boolean>(false);

    const handleProjectDataReady = (data: any) => {
        setIsPrefilled(true);
        if (data) {
            setPrefilledProject(data);
        } // data from backend parse
        else setPrefilledProject(null); // create from scratch
    };

    const isUploadStep = !prefilledProject && mode === "create";

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

    useEffect(() => {
        setPrefilledProject(null);
    }, [isOpen]);

    let title = "Create Project";
    if (mode === "edit") title = "Edit Project";

    return (
        <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
            {isUploadStep && !isPrefilled ? (
                <ProjectUploadStep onProjectDataReady={handleProjectDataReady} onCancel={onClose} />
            ) : (
                <ProjectForm onCancel={onClose} project={prefilledProject} isPrefilled={isPrefilled} onOpenClientSlide={onOpenClientSlide}/>
            )}
        </FormDrawer>
    );
};

export default ProjectDrawer;
