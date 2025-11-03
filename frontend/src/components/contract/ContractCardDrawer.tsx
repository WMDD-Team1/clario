import { ProjectApiResponse } from "@api/index"
import InactiveContractCard from "./InactiveContractCard";
import ActiveContractCard from "./ActiveContractCard";

interface Props {
    project: ProjectApiResponse;
}
const ContractCardDrawer = ({ project }: Props) => {
    return (
        <>
            {!project.isActive ? <InactiveContractCard project={project} /> : <ActiveContractCard project={project}/>}
        </>
    )
}

export default ContractCardDrawer