import React, { useState } from "react";
import { CloudUpload, FileText, Trash2 } from "lucide-react";

interface FileUploadProps {
    label?: string;
    onFilesSelected?: (files: FileList) => void;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;

const FileUpload: React.FC<FileUploadProps> = ({
    label = "Upload Files",
    onFilesSelected,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const validateFiles = (files: FileList) => {
        const validFiles: File[] = [];
        setError(null);

        const totalFiles = uploadedFiles.length + files.length;
        if (totalFiles > MAX_FILES) {
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

    const handleFileSelection = (files: FileList) => {
        const validFiles = validateFiles(files);
        if (!validFiles.length) return;

        const newFiles = [...uploadedFiles, ...validFiles];
        setUploadedFiles(newFiles);

        if (onFilesSelected) {
            const dt = new DataTransfer();
            newFiles.forEach((f) => dt.items.add(f));
            onFilesSelected(dt.files);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFileSelection(e.target.files);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) handleFileSelection(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);

        if (onFilesSelected) {
            const dt = new DataTransfer();
            newFiles.forEach((f) => dt.items.add(f));
            onFilesSelected(dt.files);
        }
    };

    return (
        <div className="relative flex flex-col gap-3">
            <label className="bg-[var(--background)] absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem]">
                {label}
            </label>

            {/* Drop zone */}
            <div
                className={`border-2 rounded-[20px] text-center p-6 transition-all cursor-pointer
          ${isDragging
                        ? "border-[var(--primitive-colors-brand-primary-200)] bg-[var(--primitive-colors-brand-primary-50)]"
                        : "border-[var(--sublight-2)]"}
        `}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <CloudUpload
                    className="mx-auto h-10 w-10 text-[var(--primitive-colors-brand-primary-500-base)] mb-2"
                    strokeWidth={1.5}
                />
                <p className="text-[var(--primary-text)] font-medium">
                    Choose file(s) or drag & drop here
                </p>
                <p className="text-[var(--sub-text)] text-sm mt-1">
                    JPG, PNG, or PDF formats up to {MAX_FILE_SIZE_MB} MB each, max {MAX_FILES} files.
                </p>
            </div>

            {/* Uploaded list */}
            {uploadedFiles.length > 0 && (
                <ul className="flex flex-col gap-2 mt-2">
                    {uploadedFiles.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between bg-[var(--primitive-colors-brand-primary-75)] rounded-xl px-4 py-2"
                        >
                            <div className="flex items-center gap-2 truncate">
                                <FileText
                                    className="text-[var(--primitive-colors-brand-primary-500-base)] w-5 h-5"
                                    strokeWidth={1.5}
                                />
                                <span className="truncate text-[var(--primary-text)] text-sm font-medium">
                                    {file.name}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                className="text-[var(--sub-text)] hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Error */}
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
