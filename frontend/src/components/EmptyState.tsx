import Button from "./Button";

interface Props {
    title?: string;
    description?: string;
    buttonText?: string;
    onAction?: () => void;
}

const EmptyState = ({
    title = "It’s a little quiet here 👀",
    description = "Add your first client and let’s get things moving!",
    buttonText = "Add Project",
    onAction,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-blue-200 rounded-2xl bg-blue-50/30">
            <p className="text-gray-700 text-base mb-2">{title}</p>
            <p className="text-gray-500 text-sm mb-6">{description}</p>
            <Button
                buttonColor="regularButton"
                onClick={onAction}
                textColor="white"
                width="200px"
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default EmptyState;