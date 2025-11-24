import { ProjectApiResponse } from '@api/index';
import FormDrawer from '../FormDrawer';
import ProjectForm from './ProjectForm';
import { use, useEffect, useRef, useState } from 'react';
import ProjectUploadStep from './ProjectUploadStep';
import { ClientForm } from '../Client/ClientForm';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  project?: ProjectApiResponse | null;
  onOpenClientSlide?: () => void;
  isClientOpen: boolean;
  onClientClose: () => void;
}

const ProjectDrawer = ({
  isOpen,
  onClose,
  mode,
  project,
  onOpenClientSlide,
  isClientOpen,
  onClientClose,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const clientDivRef = useRef<HTMLDivElement>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [prefilledProject, setPrefilledProject] = useState<ProjectApiResponse | null>(
    project ?? null,
  );
  const [isPrefilled, setIsPrefilled] = useState<boolean>(false);

  const handleProjectDataReady = (data: any, file: File | null) => {
    setIsPrefilled(true);
    if (data) {
      setPrefilledProject(data);
      setContractFile(file);
    } // data from backend parse
    else setPrefilledProject(null); // create from scratch
  };

  const isUploadStep = !prefilledProject && mode === 'create';

  useEffect(() => {
    setPrefilledProject(project ?? null);
  }, [isOpen, project]);
  const queryClient = useQueryClient();
  const handleClientSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });

    setTimeout(() => onClientClose(), 200);
  };

  let title = 'Create Project';
  if (mode === 'edit') title = 'Edit Project';

  let clientTiltle = 'Add Client';

  return (
    <>
      <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
        {isUploadStep && !isPrefilled ? (
          <ProjectUploadStep onProjectDataReady={handleProjectDataReady} onCancel={onClose} />
        ) : (
          <ProjectForm
            onCancel={onClose}
            project={prefilledProject}
            contractFile={contractFile}
            isPrefilled={isPrefilled}
            onOpenClientSlide={onOpenClientSlide}
          />
        )}
      </FormDrawer>
      <FormDrawer
        title={clientTiltle}
        isOpen={isClientOpen}
        onClose={onClientClose}
        divRef={clientDivRef}
      >
        <ClientForm onCancel={onClientClose} onSuccess={handleClientSuccess} />
      </FormDrawer>
    </>
  );
};

export default ProjectDrawer;
