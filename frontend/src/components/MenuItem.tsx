import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode
    route: string;
}

const MenuItem = ({ route, children }: Props) => {
    const navigate = useNavigate();

    return (
        <li className='cursor-pointer hover:bg-amber-200 block'
            key={route}
            onClick={() => navigate(route)}>
            {children}
        </li>
    )
}

export default MenuItem