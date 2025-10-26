interface Props {
    message: string;
}
const Spinner = ({ message }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            {message && <p className="mt-3 text-sm">{message}</p>}
        </div>
    )
}

export default Spinner