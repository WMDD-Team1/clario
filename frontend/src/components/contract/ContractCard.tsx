import { ReactNode, useMemo } from "react";

interface ContractAction {
    label: string;
    variant: "primary" | "secondary" | "darkGreen" | "lightGreen";
    onClick: () => void;
}

interface ContractCardProps {
    status: "inactive" | "active" | "clear" | "risks";
    risksDetected?: number;
    tooltip?: ReactNode;

    // event handlers
    onGenerateDraft?: () => void;
    onUpload?: () => void;
    onDownload?: () => void;
    onView?: () => void;
    onViewRisk?: () => void;
    onUploadNew?: () => void;
}

export default function ContractCard({
    status,
    risksDetected = 0,
    tooltip,
    onGenerateDraft = () => { },
    onUpload = () => { },
    onDownload = () => { },
    onView = () => { },
    onUploadNew = () => { },
}: ContractCardProps) {
    const card = useMemo(() => {
        let actions: ContractAction[] = [];

        switch (status) {
            case "inactive":
                actions = [
                    { label: "Generate Draft", variant: "primary", onClick: onGenerateDraft },
                    { label: "Upload", variant: "secondary", onClick: onUpload },
                ];
                return {
                    title: "Start Your Contract",
                    description:
                        "This project is currently inactive. Generate or upload a contract to activate it.",
                    border: "border-[var(--primitive-colors-brand-primary-51)]",
                    text: "text-[var(--primitive-colors-gray-dark-mode-700)]",
                    actions,
                };

            case "active":
                actions = [
                    { label: "Download", variant: "secondary", onClick: onDownload },
                    { label: "Upload", variant: "primary", onClick: onUpload },
                ];
                return {
                    title: "Project Active",
                    description: "Your contract is ready. Download and review it anytime.",
                    border: "border-[var(--primitive-colors-brand-primary-51)]",
                    text: "text-[var(--primitive-colors-gray-dark-mode-700)]",
                    actions,
                };

            case "clear":
                actions = [
                    { label: "Download", variant: "darkGreen", onClick: onDownload },
                    { label: "Upload New", variant: "lightGreen", onClick: onUpload },
                ];
                return {
                    title: "Contract All Clear",
                    description: "Your contract looks good. No risks found in the analysis.",
                    border: "border-[var(--primitive-colors-success-100)]",
                    text: "text-[var(--primitive-colors-gray-dark-mode-700)]",
                    actions,
                };

            case "risks":
                actions = [
                    { label: "View Risk", variant: "primary", onClick: onView },
                    { label: "Upload New", variant: "secondary", onClick: onUpload },
                ];
                return {
                    title: "Contract Risks Found",
                    description: "Analysis done. Check risks or upload a new contract.",
                    border: "border-[var(--primitive-colors-brand-primary-51)]",
                    text: "text-[var(--primitive-colors-brand-primary-700-base)]",
                    actions,
                };

            default:
                return null;
        }
    }, [
        status,
        onGenerateDraft,
        onUpload,
        onDownload,
        onView,
        onUploadNew,
    ]);

    if (!card) return null;

    return (
        <div
            className={`rounded-[20px] border-[2px] transition-all duration-300 bg-white ${card.text} ${card.border}`}
        >
            <div className="flex flex-col gap-2 mt-7 mx-5 mb-4">
                <h3 className="font-semibold">{card.title}</h3>
                <p>{card.description}</p>
                {status === "risks" && (
                    <p className="text-[var(--error-accent1)] font-bold">
                        {risksDetected} Risks Detected
                    </p>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="flex w-full h-[48px]">
                {card.actions.map((action, idx) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        disabled={tooltip && idx === 0 ? true : false}
                        className={`
                            flex-1 flex items-center justify-center transition p-5 hover:opacity-80
                            ${tooltip && idx === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}
                            ${action.variant === "primary"
                                ? "bg-[var(--primitive-colors-brand-primary-500-base)] text-[var(--text-alpha)]"
                                : action.variant === "secondary"
                                    ? "bg-[var(--background-alternate)] text-[var(--brand-subtext)]"
                                    : action.variant === "darkGreen"
                                        ? "bg-[var(--success-contrast1)] text-[var(--text-alpha)]"
                                        : "bg-[var(--success-background1)] text-[var(--success-contrast1)]"
                            }
                            ${idx === 0 ? "rounded-bl-2xl" : "rounded-br-2xl"}
                            `}>
                        {action.label}
                        {tooltip && idx === 0 ? tooltip : null}
                    </button>
                ))}
            </div>
        </div>
    );
}
