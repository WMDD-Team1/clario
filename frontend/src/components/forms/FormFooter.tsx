// components/form/FormFooter.tsx
interface FormFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    disableSubmit?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
}

export default function FormFooter({
    onCancel,
    onSubmit,
    disableSubmit,
    submitLabel = "Save",
    cancelLabel = "Close",
}: FormFooterProps) {
    return (
        <div className="flex justify-between mt-6 border-t pt-4">
            <button
                type="button"
                onClick={onCancel}
                className="bg-blue-100 text-blue-600 font-medium px-5 py-2 rounded-xl hover:bg-blue-200 transition"
            >
                {cancelLabel}
            </button>
            <button
                type="submit"
                onClick={onSubmit}
                disabled={disableSubmit}
                className={`font-medium px-5 py-2 rounded-xl transition ${disableSubmit
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
            >
                {submitLabel}
            </button>
        </div>
    );
}
