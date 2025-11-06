import React, { useState } from "react";

interface FileUploadProps {
    label?: string;
    onFilesSelected?: (files: FileList) => void;
}

const MAX_FILES = 1;
const MAX_FILE_SIZE_MB = 5;

const FileUpload: React.FC<FileUploadProps> = ({ label = "Upload File", onFilesSelected }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDragLeave = () => setIsDragging(false);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };


    const validateFiles = (files: FileList) => {
        const validFiles: File[] = [];
        setError(null);

        if (files.length > MAX_FILES) {
            setError(`You can only upload up to ${MAX_FILES} files.`);
            return [];
        }

        for (const file of Array.from(files)) {
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > MAX_FILE_SIZE_MB) {
                setError(`"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
                return [];
            }
            validFiles.push(file);
        }

        return validFiles;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const validFiles = validateFiles(e.target.files);
        if (validFiles.length && onFilesSelected) {
            // convert array back to FileList-like object
            const dataTransfer = new DataTransfer();
            validFiles.forEach((f) => dataTransfer.items.add(f));
            onFilesSelected(dataTransfer.files);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (!e.dataTransfer.files) return;
        const validFiles = validateFiles(e.dataTransfer.files);
        if (validFiles.length && onFilesSelected) {
            const dataTransfer = new DataTransfer();
            validFiles.forEach((f) => dataTransfer.items.add(f));
            onFilesSelected(dataTransfer.files);
        }
    };

    return (
        <div className="relative flex flex-col gap-2">
            <label
                className={`bg-white absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem]`}
            >
                {label}
            </label>

            <div
                className={`border-2 rounded-[20px] text-center p-6 transition-all cursor-pointer ${isDragging ? "border-[var(--primitive-colors-brand-primary-100)] bg-blue-50" : "border-[var(--sublight)]"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-8 w-8 text-[var(--primitive-colors-brand-primary-500-base)] mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>

                <p className="text-[var(--primary-text)] font-medium">Choose a file or drag & drop it here</p>
                <p className="text-[var(--sub-text)] text-sm mt-1">
                    You can upload up to 5 files (JPG, PNG, PDF) max 5 MB each.
                </p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <input
                id="fileInput"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUpload;
