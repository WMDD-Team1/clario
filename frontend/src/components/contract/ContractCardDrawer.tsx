import { ProjectApiResponse } from "@api/index"
import InactiveContractCard from "./InactiveContractCard";

interface Props {
    project: ProjectApiResponse;
}
const ContractCardDrawer = ({ project }: Props) => {
    return (
        <>
            {!project.isActive ? <InactiveContractCard project={project} /> : null}
        </>
    )
}

export default ContractCardDrawer