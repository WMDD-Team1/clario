import Slide from '@components/Slide';
import Input from '@components/Input';
import InfoRow from '@components/InfoRow';
import { CloudUpload, Camera, FileChange, Trash } from '@assets/icons/index';

interface IncomeUploadSlideProps {
  slide: string;
  file: File | null;
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onNext: () => void;
  onClose: () => void;
  onFileRemove: () => void;
}

export const IncomeUploadSlide = ({
  slide,
  file,
  fileName,
  onFileChange,
  onDrop,
  onDragOver,
  onNext,
  onClose,
  onFileRemove,
}: IncomeUploadSlideProps) => {
  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <Slide
      title="Add Income"
      slide={slide}
      confirmText="Close"
      onConfirm={onClose}
      extralText={file ? 'Next' : 'Skip'}
      onExtra={onNext}
      onClose={onClose}
    >
      <div className="flex flex-col flex-nowrap items-center justify-center gap-[1rem] h-full">
        <p>Add your Income Receipt here</p>
        <div
          className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px] cursor-pointer"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={handleBrowseClick}
        >
          <CloudUpload className="w-25 h-25 hidden sm:block" />
          <Camera className="w-25 h-25 sm:hidden" />
          <p className="font-bold hidden sm:block">Choose a file or drag & drop it here</p>
          <p className="font-bold sm:hidden">Take a Picture and Upload</p>
          <p className="text-gray-400 hidden sm:block">JPG, PNG or PDF formats up to 5MB</p>
        </div>

        <Input
          id="fileInput"
          hidden={true}
          type="file"
          onChange={onFileChange}
          accept="image/*, application/pdf"
          capture="environment"
        />
      </div>
      {file && (
        <div>
          <InfoRow
          label="Attachment"
          value={fileName}
          hideBorder={true}
          />
          <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem] text-gray-400">
            <FileChange className="cursor-pointer" onClick={handleBrowseClick} />
            |
            <Trash className="cursor-pointer" onClick={onFileRemove} />
          </div>
        </div>
      )}
    </Slide>
  );
};