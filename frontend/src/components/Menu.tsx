import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Tooltip } from "@mui/material";

interface Props {
    items: {
        route: string,
        activeIcon: React.ElementType,
        inactiveIcon: React.ElementType,
        tooltip?: string
    }[],
}

const Menu = ({ items }: Props) => {

    return (
        <div className='flex flex-col items-center justify-between p-5 bg-[#F5F9FF] shadow-md rounded-[30px]'>
            <nav className='flex flex-col gap-5'>
                {items.map(({ tooltip, route, activeIcon: ActiveIcon, inactiveIcon: InactiveIcon }) => (
                    <Tooltip title={tooltip} arrow placement="right" slotProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: "var(--primitive-colors-brand-primary-925)",
                                fontSize: "14px",
                                color: "white"
                            }
                        }
                    }}>
                        <NavLink
                            key={route}
                            to={route}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center text-xs font-medium transition ${isActive
                                    ? 'text-[var(--primitive-colors-brand-primary-925)]'
                                    : 'text-[var(--primitive-colors-brand-primary-500-base)] hover:text-blue-500'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`
                    flex items-center justify-center
                     rounded-2xl
                    ${isActive ? 'bg-blue-50' : ''}
                  `}
                                    >
                                        {isActive ? <ActiveIcon /> : <InactiveIcon />}
                                    </div>
                                </>
                            )}
                        </NavLink>
                    </Tooltip>
                ))}
            </nav>
        </div>
    )
}

export default Menu