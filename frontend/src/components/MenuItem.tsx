import { Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
    route: string;
    onClick: (route: string) => void;
    tooltip?: string;
}

const MenuItem = ({ route, children, onClick, tooltip }: Props) => {

    return (
        <Tooltip title={tooltip} arrow placement="right" slotProps={{
            tooltip: {
                sx: {
                    backgroundColor: "var(--primitive-colors-brand-primary-925)",
                    fontSize: "14px",
                    color: "white"
                }
            }
        }}>
            <li className="relative group cursor-pointer rounded-lg transition"
                key={route}
                onClick={() => onClick(route)}>
                {children}
            </li>
        </Tooltip>
    )
}

export default MenuItem