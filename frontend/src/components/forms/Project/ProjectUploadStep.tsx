import { useState } from "react";
import { CloudUpload } from "lucide-react";
import Button from "@components/Button";
import { extractContract } from "@/api"; // backend service that parses the file

interface ProjectUploadStepProps {
    onProjectDataReady: (data: any) => void;
    onCancel: () => void;
}

export default function ProjectUploadStep({ onProjectDataReady, onCancel }: ProjectUploadStepProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileUpload = async (file: File) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("File must be smaller than 5MB.");
            return;
        }

        setIsUploading(true);
        try {

            const response = await extractContract(file); // returns project data
            onProjectDataReady(response); // pass to ProjectForm
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to analyze contract. Try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file);
    };

    return (
        <div className="flex flex-col justify-between h-full pb-150">
            <div className="flex flex-col items-center mt-8 text-center">
                <p className="mb-6">Choose how you want to start.</p>

                {/* Upload Box */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`relative w-full max-w-sm h-[180px] border-1 ${dragActive
                        ? "border-[var(--primitive-colors-brand-primary-500-base)] bg-[var(--primitive-colors-brand-primary-50)]"
                        : "border-dashed border-[var(--primitive-colors-gray-light-mode-800)] bg-[var(--background-alternate)]"
                        } rounded-[20px] flex flex-col items-center justify-center transition-colors`}
                >
                    <CloudUpload className="w-[60px] h-[60px] text-[var(--brand-alpha)] mb-2" strokeWidth={1} />
                    <p className="text-[15px] font-medium text-[var(--tertiary-text)]">
                        Choose a file or drag & drop it here
                    </p>
                    <p className="text-[13px] text-[var(--sub-text)]">
                        JPG, PNG or PDF formats up to 5MB
                    </p>

                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                </div>

                {/* Or create manually */}
                <button
                    onClick={() => onProjectDataReady(null)}
                    disabled={isUploading}
                    className={`h-[160px] mt-6 w-full max-w-sm border-2 border-dashed border-[var(--primitive-colors-brand-primary-95)] 
                    rounded-2xl py-3 bg-[var(--background-alternate)] hover:opacity-80
                    transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {isUploading ? "Processing..." : "Create From Scratch"}
                </button>
            </div>

            {/* Cancel */}
            <div className="flex justify-between gap-2 absolute bottom-0 right-0 left-0 p-[30px] bg-[var(--primitive-colors-brand-primary-75)] rounded-bl-[50px]">
                <Button
                    buttonColor="regularButton"
                    textColor="white"
                    onClick={onCancel}
                    width="100%"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
