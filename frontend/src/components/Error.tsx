import { ReactNode } from "react";

interface Props {
    message?: string;
}
const Error = ({message }: Props) => {
    return (
        <>
            <p>{message}</p>
        </>
    )
}

export default Error