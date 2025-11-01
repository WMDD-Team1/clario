import Button from "@components/Button";

// components/form/FormFooter.tsx
interface FormFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    disableSubmit?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    isViewMode?: boolean;
    onEdit?: () => void;
    editLabel?: string;
}

export default function FormFooter({
    onCancel,
    onSubmit,
    disableSubmit,
    submitLabel = "Save",
    cancelLabel = "Close",
}: FormFooterProps) {
    return (
        <div className="flex justify-between gap-2 absolute bottom-0 right-0 left-0 p-[30px] bg-[var(--primitive-colors-brand-primary-75)]">
            <Button buttonColor="white" onClick={onCancel} width="45%" textColor="white">
                <p className="text-[#98A2B3]">{cancelLabel}</p>
            </Button>
            <Button buttonColor="regularButton"
                onClick={onSubmit} width="45%"
                textColor="white"
                disabled={disableSubmit}
                type="submit">
                {submitLabel}
            </Button>
        </div>
    );
}
