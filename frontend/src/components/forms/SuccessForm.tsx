import Button from '@components/Button'

interface Props {
    iconPath: string;
    title: string;
    message: string;
    onCancel: () => void;
}

const SuccessForm = ({ iconPath, title, message, onCancel }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6">
            <img
                src={iconPath}
                alt="Success"
                className="w-32 h-32 mb-6"
            />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
            </h4>
            <p className="text-gray-500 mb-8">
                {message}
            </p>
            <div className="flex justify-between gap-2 absolute bottom-0 right-0 left-0 p-[30px] bg-[var(--primitive-colors-brand-primary-75)] rounded-bl-[50px]">
                <Button buttonColor="regularButton" onClick={onCancel} width="100%" textColor="white">
                    <p>Done</p>
                </Button>
            </div>
        </div>
    )
}

export default SuccessForm