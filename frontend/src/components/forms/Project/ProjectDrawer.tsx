import { ProjectApiResponse } from '@api/index';
import FormDrawer from '../FormDrawer';
import ProjectForm from './ProjectForm';
import { ClientForm } from '../Client/ClientForm';
import { use, useEffect, useRef, useState } from 'react';
import ProjectUploadStep from './ProjectUploadStep';

interface Props {
  isOpen: boolean;
  isClientOpen: boolean;
  onClose: () => void;
  onClientClose: () => void;
  onClientSuccess: () => void;
  mode: 'create' | 'edit';
  project?: ProjectApiResponse | null;
  onOpenClientSlide?: () => void;
}

const ProjectDrawer = ({
  isOpen,
  isClientOpen,
  onClose,
  mode,
  project,
  onOpenClientSlide,
  onClientClose,
  onClientSuccess,
}: Props) => {
  const projectDivRef = useRef<HTMLDivElement>(null);
  const clientDivRef = useRef<HTMLDivElement>(null);
  const [prefilledProject, setPrefilledProject] = useState<ProjectApiResponse | null>(
    project ?? null,
  );
  const [isPrefilled, setIsPrefilled] = useState<boolean>(false);

  const handleProjectDataReady = (data: any) => {
    setIsPrefilled(true);
    if (data) {
      setPrefilledProject(data);
    } // data from backend parse
    else setPrefilledProject(null); // create from scratch
  };

  const isUploadStep = !prefilledProject && mode === 'create';

  // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (!divRef.current?.contains(e.target as Node)) {
//         onClose();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

  useEffect(() => {
    setPrefilledProject(null);
    setIsPrefilled(false);
  }, [isOpen]);

  let title = 'Create Project';
  if (mode === 'edit') title = 'Edit Project';

  let clientTitle = 'Add Client';

  return (
    <>
      <FormDrawer
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        divRef={projectDivRef}
        disableClickOutside={isClientOpen}
      >
        {isUploadStep && !isPrefilled ? (
          <ProjectUploadStep onProjectDataReady={handleProjectDataReady} onCancel={onClose} />
        ) : (
          <ProjectForm
            onCancel={onClose}
            project={prefilledProject}
            isPrefilled={isPrefilled}
            onOpenClientSlide={onOpenClientSlide}
          />
        )}
      </FormDrawer>
      <FormDrawer title={clientTitle} isOpen={isClientOpen} onClose={onClientClose} divRef={clientDivRef} disableClickOutside={false}>
        <ClientForm onCancel={onClientClose} onSuccess={onClientSuccess} />
      </FormDrawer>
    </>
  );
};

export default ProjectDrawer;
