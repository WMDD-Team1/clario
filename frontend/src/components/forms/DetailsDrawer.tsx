import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}
const DetailsDrawer = ({ children }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="pt-2 text-sm space-y-5">
                {children}
            </div>
        </div>
    )
}

export default DetailsDrawer