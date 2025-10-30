import Button from "@components/Button";

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
        <div className="flex justify-between mt-6 pt-4 gap-2">
            <Button buttonColor="regularButton" onClick={onCancel} width="45%" textColor="white">
                Close
            </Button>
            <Button buttonColor="lightButton"
                    onClick={onSubmit} width="45%"
                    textColor="white"
                    disabled={disableSubmit}
                    type="submit">
                Next
            </Button>
        </div>
    );
}
