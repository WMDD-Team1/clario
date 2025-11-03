import Loader from "./Loader";

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Loader type="bar" />
        </div>
    )
}

export default Loading;